import type { MetadataRoute } from 'next';
import { WORDPRESS_BASE_URL } from '@/lib/wordpress';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${WORDPRESS_BASE_URL}/sitemap.xml`,
  };
}
