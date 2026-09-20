import { getCloudflareContext } from '@opennextjs/cloudflare';

const TTL_SECONDS = 300;
type Entry = { body: string; headers: Record<string, string>; expiresAt: number };
type PublicCache = {
  get<T>(key: string, type: 'json'): Promise<T | null>;
  put(key: string, value: string, options: { expirationTtl: number }): Promise<void>;
};

// Only anonymous, public WordPress GETs use this cache. Never pass user headers.
export async function publicWordPressFetch(url: string): Promise<Response> {
  const endpoint = new URL(url);
  if (endpoint.origin !== 'https://aard.ps' || !endpoint.pathname.startsWith('/wp-json/')) {
    throw new Error('Expected a public WordPress API URL');
  }

  let context: { env: unknown; ctx: { waitUntil(task: Promise<unknown>): void } } | undefined;
  let kv: PublicCache | undefined;
  try {
    context = getCloudflareContext();
    kv = (context.env as unknown as { NEWS_CACHE?: PublicCache }).NEWS_CACHE;
  } catch {
    // Next.js builds and local development have no Worker bindings.
  }

  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(url));
  const key = `public-wp:v1:${Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('')}`;
  if (kv) {
    try {
      const entry = await kv.get<Entry>(key, 'json');
      if (entry && entry.expiresAt > Date.now()) {
        return new Response(entry.body, { headers: entry.headers });
      }
    } catch {
      // A cache outage must not prevent reading the origin.
    }
  }

  const response = await fetch(url, {
    next: { revalidate: TTL_SECONDS },
    headers: { Accept: 'application/json' },
  });
  if (kv && response.status === 200 && response.headers.get('content-type')?.includes('application/json')) {
    const cache = kv;
    const copy = response.clone();
    const write = (async () => {
      const body = await copy.text();
      JSON.parse(body); // Never cache malformed JSON or error pages.
      const headers: Record<string, string> = {};
      for (const name of ['content-type', 'x-wp-total', 'x-wp-totalpages']) {
        const value = response.headers.get(name);
        if (value !== null) headers[name] = value;
      }
      await cache.put(key, JSON.stringify({ body, headers, expiresAt: Date.now() + TTL_SECONDS * 1000 }), {
        expirationTtl: TTL_SECONDS,
      });
    })().catch(() => undefined);
    if (context) context.ctx.waitUntil(write);
    else await write;
  }
  return response;
}
