export const WORDPRESS_BASE_URL = 'https://aard.ps';
export const AARD_API_URL = `${WORDPRESS_BASE_URL}/wp-json/aard/v1`;
const WORDPRESS_API_URL = `${WORDPRESS_BASE_URL}/wp-json/wp/v2`;
const PROJECT_CATEGORY_IDS = [41, 40];
const ACTIVITY_CATEGORY_IDS = [37];

export interface AardCategory { id: number; name: string; slug: string; }
export interface AardContentItem {
  id: number; slug: string; title: string; excerpt: string; content: string;
  date: string; modified: string; link: string; featured_image: string | null;
  categories: AardCategory[];
}
export interface AardCollection { items: AardContentItem[]; count: number; source_post_type?: string; }
export interface AardHome {
  site: { name: string; description: string; url: string; language: string };
  about: AardContentItem | null; contact: AardContentItem | null;
  news: AardContentItem[]; projects: AardContentItem[]; generated_at: string;
}
interface WordPressPost {
  id: number; slug: string; date: string; modified: string; link: string;
  title: { rendered: string }; excerpt: { rendered: string }; content?: { rendered: string };
  _embedded?: {
    'wp:featuredmedia'?: Array<{ source_url?: string }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
  };
}

async function aardFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${AARD_API_URL}${path}`, {
    next: { revalidate: 300 }, headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`AARD API request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

function normalizeSlug(value: string) {
  let decoded = value;
  try { decoded = decodeURIComponent(value); } catch { /* Keep original value. */ }
  return decoded.normalize('NFC').replace(/^\/+|\/+$/g, '');
}

function plainText(html: string) {
  return html.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&#8211;|&#8212;/g, '—').replace(/&#8230;/g, '…').replace(/\s+/g, ' ').trim();
}

function mapWordPressPost(post: WordPressPost): AardContentItem {
  const terms = post._embedded?.['wp:term']?.flat() ?? [];
  return {
    id: post.id, slug: post.slug, title: plainText(post.title.rendered),
    excerpt: plainText(post.excerpt.rendered), content: post.content?.rendered ?? '',
    date: post.date, modified: post.modified, link: post.link,
    featured_image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null,
    categories: terms.map((term) => ({ id: term.id, name: term.name, slug: term.slug })),
  };
}

async function fetchCategoryPage(page: number, categoryIds: number[]) {
  const params = new URLSearchParams({
    categories: categoryIds.join(','), per_page: '100', page: String(page),
    orderby: 'date', order: 'desc', _embed: '1',
    _fields: 'id,slug,date,modified,link,title,excerpt,content,_embedded',
  });
  const response = await fetch(`${WORDPRESS_API_URL}/posts?${params}`, {
    next: { revalidate: 300 }, headers: { Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`WordPress category request failed: ${response.status}`);
  const posts = (await response.json()) as WordPressPost[];
  return { posts, totalPages: Number(response.headers.get('X-WP-TotalPages') || '1') };
}

export async function getHomeData() { return aardFetch<AardHome>('/home'); }
export async function getPageBySlug(slug: string) {
  try { return await aardFetch<AardContentItem>(`/pages/${encodeURIComponent(normalizeSlug(slug))}`); }
  catch { return null; }
}
export async function getLatestPosts(perPage = 9) {
  const data = await aardFetch<AardCollection>(`/news?per_page=${perPage}`);
  return data.items;
}
export async function getProjects(limit = 200) {
  try {
    const first = await fetchCategoryPage(1, PROJECT_CATEGORY_IDS);
    const remaining = await Promise.all(
      Array.from({ length: Math.max(0, first.totalPages - 1) }, (_, index) => fetchCategoryPage(index + 2, PROJECT_CATEGORY_IDS)),
    );
    return [first, ...remaining].flatMap((result) => result.posts).slice(0, limit).map(mapWordPressPost);
  } catch {
    const data = await aardFetch<AardCollection>(`/projects?per_page=${Math.min(limit, 100)}`);
    return data.items;
  }
}
export async function getActivities(limit = 200) {
  const first = await fetchCategoryPage(1, ACTIVITY_CATEGORY_IDS);
  const remaining = await Promise.all(
    Array.from({ length: Math.max(0, first.totalPages - 1) }, (_, index) => fetchCategoryPage(index + 2, ACTIVITY_CATEGORY_IDS)),
  );
  return [first, ...remaining].flatMap((result) => result.posts).slice(0, limit).map(mapWordPressPost);
}
export async function getNewsBySlug(slug: string) {
  const normalizedSlug = normalizeSlug(slug);
  try { return await aardFetch<AardContentItem>(`/news/${encodeURIComponent(normalizedSlug)}`); }
  catch {
    try {
      const data = await aardFetch<AardCollection>('/news?per_page=100');
      return data.items.find((item) => normalizeSlug(item.slug) === normalizedSlug) ?? null;
    } catch {
      try {
        const activities = await getActivities();
        return activities.find((item) => normalizeSlug(item.slug) === normalizedSlug) ?? null;
      } catch { return null; }
    }
  }
}
export async function getProjectBySlug(slug: string) {
  const normalizedSlug = normalizeSlug(slug);
  try { return await aardFetch<AardContentItem>(`/projects/${encodeURIComponent(normalizedSlug)}`); }
  catch {
    try {
      const projects = await getProjects();
      return projects.find((item) => normalizeSlug(item.slug) === normalizedSlug) ?? null;
    } catch { return null; }
  }
}
