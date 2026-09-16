import Link from 'next/link';
import type { AardContentItem } from '@/lib/wordpress';
import { encodeNormalizedSlug } from '@/lib/slug';

export default function MediaGrid({ posts }: { posts: AardContentItem[] }) {
  return (
    <>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <article key={post.id} className="overflow-hidden rounded-2xl border border-[#e9f1ee] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
            {post.featured_image ? (
              <img src={post.featured_image} alt={post.title} className="h-52 w-full object-cover" loading="lazy" />
            ) : null}
            <div className="p-6">
              <div className="mb-2 text-xs text-slate-400">
                {new Date(post.date).toLocaleDateString('ar', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
              <h2 className="mb-3 line-clamp-2 text-lg font-bold leading-8 text-[#00406d]">{post.title}</h2>
              <p className="mb-5 line-clamp-3 text-sm leading-7 text-slate-600">{post.excerpt}</p>
              <Link href={`/media/${encodeNormalizedSlug(post.slug)}`} className="text-sm font-bold text-[#45bd91] transition hover:text-[#00406d]">اقرأ المزيد ←</Link>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
