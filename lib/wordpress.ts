export const WORDPRESS_BASE_URL = 'https://aard.ps';
export const AARD_API_URL = `${WORDPRESS_BASE_URL}/wp-json/aard/v1`;

export interface AardCategory {
  id: number;
  name: string;
  slug: string;
}

export interface AardContentItem {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  modified: string;
  link: string;
  featured_image: string | null;
  categories: AardCategory[];
}

export interface AardCollection {
  items: AardContentItem[];
  count: number;
  source_post_type?: string;
}

export interface AardHome {
  site: {
    name: string;
    description: string;
    url: string;
    language: string;
  };
  about: AardContentItem | null;
  contact: AardContentItem | null;
  news: AardContentItem[];
  projects: AardContentItem[];
  generated_at: string;
}

async function aardFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${AARD_API_URL}${path}`, {
    next: { revalidate: 300 },
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`AARD API request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

function normalizeSlug(value: string) {
  let decoded = value;

  try {
    decoded = decodeURIComponent(value);
  } catch {
    // Keep the original value when it is not URI-encoded.
  }

  return decoded.normalize('NFC').replace(/^\/+|\/+$/g, '');
}

export async function getHomeData() {
  return aardFetch<AardHome>('/home');
}

export async function getPageBySlug(slug: string) {
  try {
    return await aardFetch<AardContentItem>(`/pages/${encodeURIComponent(normalizeSlug(slug))}`);
  } catch {
    return null;
  }
}

export async function getLatestPosts(perPage = 9) {
  const data = await aardFetch<AardCollection>(`/news?per_page=${perPage}`);
  return data.items;
}

export async function getProjects(perPage = 12) {
  const data = await aardFetch<AardCollection>(`/projects?per_page=${perPage}`);
  return data.items;
}

export async function getNewsBySlug(slug: string) {
  const normalizedSlug = normalizeSlug(slug);

  try {
    return await aardFetch<AardContentItem>(`/news/${encodeURIComponent(normalizedSlug)}`);
  } catch {
    try {
      const data = await aardFetch<AardCollection>('/news?per_page=100');
      return data.items.find((item) => normalizeSlug(item.slug) === normalizedSlug) ?? null;
    } catch {
      return null;
    }
  }
}

export async function getProjectBySlug(slug: string) {
  const normalizedSlug = normalizeSlug(slug);

  try {
    return await aardFetch<AardContentItem>(`/projects/${encodeURIComponent(normalizedSlug)}`);
  } catch {
    // Some WordPress/custom REST setups do not reliably match Arabic slugs
    // through a path parameter. Fall back to the collection endpoint that
    // already powers the projects listing, then match the normalized slug.
    try {
      const data = await aardFetch<AardCollection>('/projects?per_page=100');
      return data.items.find((item) => normalizeSlug(item.slug) === normalizedSlug) ?? null;
    } catch {
      return null;
    }
  }
}
