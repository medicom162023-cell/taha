const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

function load(file, dependencies, globals = {}) {
  const exports = {};
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
  }).outputText;
  vm.runInNewContext(code, { exports, require: name => dependencies[name], Response, URL,
    URLSearchParams, TextEncoder, crypto: require('node:crypto').webcrypto, ...globals });
  return exports;
}

(async () => {
  const entries = new Map();
  const tasks = [];
  let calls = 0;
  let broken = false;
  let status = 200;
  const { publicWordPressFetch } = load('lib/public-wordpress-fetch.ts', {
    '@opennextjs/cloudflare': { getCloudflareContext: () => ({
      env: { NEWS_CACHE: {
        get: async key => { if (broken) throw Error('KV unavailable'); return entries.get(key); },
        put: async (key, value, options) => { assert.equal(options.expirationTtl, 300); entries.set(key, JSON.parse(value)); },
      } },
      ctx: { waitUntil: task => tasks.push(task) },
    }) },
  }, { fetch: async () => { calls++; return new Response(JSON.stringify({ ok: true }), {
    status, headers: { 'content-type': 'application/json', 'x-wp-totalpages': '3' },
  }); } });
  const url = 'https://aard.ps/wp-json/wp/v2/posts?status=publish&page=1';
  await (await publicWordPressFetch(url)).json();
  await Promise.all(tasks);
  const cached = await publicWordPressFetch(url);
  assert.equal(calls, 1);
  assert.equal(cached.headers.get('x-wp-totalpages'), '3');
  assert.deepEqual(await cached.json(), { ok: true });
  await publicWordPressFetch(url + '&categories=6');
  assert.equal(calls, 2, 'query variants must not share cached data');
  await Promise.all(tasks);
  for (const entry of entries.values()) entry.expiresAt = 0;
  await publicWordPressFetch(url);
  assert.equal(calls, 3, 'expired entries must refresh');
  await Promise.all(tasks);
  entries.clear(); status = 500;
  await publicWordPressFetch(url); await Promise.all(tasks);
  assert.equal(entries.size, 0, 'upstream failures must not be cached');
  broken = true; status = 200;
  assert.equal((await publicWordPressFetch(url)).status, 200, 'KV failure must fall back to origin');
  await assert.rejects(publicWordPressFetch('https://example.com/wp-json/posts'));

  let active = 0, peak = 0;
  const seen = [];
  const archive = load('lib/wordpress.ts', {
    react: { cache: fn => fn },
    '@/lib/slug': { normalizeSlug: s => s },
    '@/lib/public-wordpress-fetch': { publicWordPressFetch: async raw => {
      const u = new URL(raw), page = Number(u.searchParams.get('page'));
      seen.push(page);
      assert.equal(u.searchParams.get('categories'), '6,37');
      assert.equal(u.searchParams.get('status'), 'publish');
      active++; peak = Math.max(peak, active);
      await new Promise(resolve => setTimeout(resolve, 5)); active--;
      return new Response(JSON.stringify([{ id: page, slug: String(page), date: '2026-09-19',
        title: { rendered: 'خبر' }, excerpt: { rendered: '' }, content: { rendered: '<img src="fallback.jpg">' } }]),
        { headers: { 'x-wp-totalpages': '6' } });
    } },
  });
  const posts = await archive.getAllMediaPosts();
  assert.deepEqual([...seen].sort(), [1, 2, 3, 4, 5, 6]);
  assert.deepEqual(Array.from(posts, p => p.id), [6, 5, 4, 3, 2, 1]);
  assert.equal(posts[0].featured_image, 'fallback.jpg');
  assert.equal(peak, 4, 'cold fetches should be parallel but bounded');
  console.log('PASS: cache hits, expiry, query isolation, pagination headers, error fallback, archive filtering/order/image fallback and bounded concurrency');
})().catch(error => { console.error(error); process.exitCode = 1; });
