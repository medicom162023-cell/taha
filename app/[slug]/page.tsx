import type { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import { buildRankMathMetadata } from '@/lib/seo';
import { getPostBySlug, WORDPRESS_BASE_URL } from '@/lib/wordpress';
import { encodeNormalizedSlug } from '@/lib/slug';

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) return {};

  const canonical = `${WORDPRESS_BASE_URL}/${encodeNormalizedSlug(post.slug)}`;

  return buildRankMathMetadata(post.link, {
    title: `${post.title} | جمعية التحالف للإغاثة والتنمية`,
    description: post.excerpt || undefined,
    canonical,
    image: post.featured_image,
    type: 'article',
  });
}

export default async function LegacyWordPressPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  permanentRedirect(`/media/${encodeNormalizedSlug(post.slug)}`);
}
