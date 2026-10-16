import type { MetadataRoute } from 'next';
import { encodeNormalizedSlug } from '@/lib/slug';
import { getAllMediaPosts, getProjects, WORDPRESS_BASE_URL } from '@/lib/wordpress';

// WordPress is the source of truth. Generate this at request time so new
// articles are discoverable without rebuilding the frontend.
export const dynamic = 'force-dynamic';

const MEDIA_PAGE_SIZE = 12;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [media, projects] = await Promise.all([getAllMediaPosts(), getProjects()]);
  const pages = ['/', '/about', '/contact', '/media', '/projects'];
  const entries: MetadataRoute.Sitemap = pages.map((path) => ({
    url: `${WORDPRESS_BASE_URL}${path}`,
  }));

  for (let page = 2; page <= Math.ceil(media.length / MEDIA_PAGE_SIZE); page++) {
    entries.push({ url: `${WORDPRESS_BASE_URL}/media?page=${page}` });
  }

  for (const post of media) {
    entries.push({
      url: `${WORDPRESS_BASE_URL}/media/${encodeNormalizedSlug(post.slug)}`,
      lastModified: post.modified || post.date,
      ...(post.featured_image ? { images: [post.featured_image] } : {}),
    });
  }

  for (const project of projects) {
    entries.push({
      url: `${WORDPRESS_BASE_URL}/projects/${encodeNormalizedSlug(project.slug)}`,
      lastModified: project.modified || project.date,
      ...(project.featured_image ? { images: [project.featured_image] } : {}),
    });
  }

  return entries;
}
