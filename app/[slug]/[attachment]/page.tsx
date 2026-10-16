import { notFound, permanentRedirect } from 'next/navigation';
import { findGalleryAttachment } from '@/lib/wordpress-gallery';
import { getPostBySlug } from '@/lib/wordpress';

type PageProps = { params: Promise<{ slug: string; attachment: string }> };

export default async function LegacyAttachmentPage({ params }: PageProps) {
  const { slug, attachment } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const imageUrl = findGalleryAttachment(post.content, post.slug, attachment);
  if (!imageUrl) notFound();

  permanentRedirect(imageUrl);
}
