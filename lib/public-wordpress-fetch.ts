const TTL_SECONDS = 60 * 60;
type EdgeCacheStorage = { default: Cache };

// Only anonymous, public WordPress GETs use this cache. Never pass user headers.
export async function publicWordPressFetch(url: string): Promise<Response> {
  const endpoint = new URL(url);
  if (endpoint.origin !== 'https://aard.ps' || !endpoint.pathname.startsWith('/wp-json/')) {
    throw new Error('Expected a public WordPress API URL');
  }

  // Cache API is temporary edge storage and has no KV write quota. It is the
  // primary cache for public WordPress data, while WordPress remains the source
  // of truth. Each Cloudflare location keeps its own cached copy.
  const cache = typeof caches === 'undefined' ? undefined : (caches as unknown as EdgeCacheStorage).default;
  const key = new Request(url, { headers: { Accept: 'application/json' } });
  if (cache) {
    try {
      const hit = await cache.match(key);
      if (hit) return hit;
    } catch {
      // A cache outage must not prevent reading the origin.
    }
  }

  const response = await fetch(url, {
    next: { revalidate: TTL_SECONDS },
    headers: { Accept: 'application/json' },
  });
  if (cache && response.status === 200 && response.headers.get('content-type')?.includes('application/json')) {
    try {
      const cachedResponse = new Response(response.clone().body, {
        headers: new Headers(response.headers),
        status: response.status,
        statusText: response.statusText,
      });
      cachedResponse.headers.set('Cache-Control', `public, max-age=${TTL_SECONDS}`);
      await cache.put(key, cachedResponse);
    } catch {
      // Cache failures must not prevent serving the origin response.
    }
  }
  return response;
}
