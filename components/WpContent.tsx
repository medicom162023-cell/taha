import { rewriteGalleryLinks } from '@/lib/wordpress-gallery';

interface WpContentProps {
  html: string;
  postSlug: string;
}

export default function WpContent({ html, postSlug }: WpContentProps) {
  return (
    <div
      className="wp-content text-right text-[15px] leading-8 text-slate-600 md:text-base"
      dangerouslySetInnerHTML={{ __html: rewriteGalleryLinks(html, postSlug) }}
    />
  );
}
