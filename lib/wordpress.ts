export const WORDPRESS_BASE_URL = 'https://aard.ps';
export const WORDPRESS_API_URL = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`;

export interface WordPressPage {
  id: number;
  slug: string;
  link: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  featured_media?: number;
}

export interface WordPressPost {
  id: number;
  slug: string;
  link: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text?: string;
    }>;
  };
}

async function wpFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${WORDPRESS_API_URL}${path}`, {
    next: { revalidate: 300 },
    headers: { Accept: 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`WordPress request failed: ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function getPageBySlug(slug: string) {
  const pages = await wpFetch<WordPressPage[]>(`/pages?slug=${encodeURIComponent(slug)}&_embed`);
  return pages[0] ?? null;
}

export async function getLatestPosts(perPage = 9) {
  return wpFetch<WordPressPost[]>(`/posts?per_page=${perPage}&_embed`);
}

export async function searchPosts(search: string, perPage = 12) {
  return wpFetch<WordPressPost[]>(
    `/posts?search=${encodeURIComponent(search)}&per_page=${perPage}&_embed`,
  );
}
