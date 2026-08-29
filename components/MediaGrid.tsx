'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { AardContentItem } from '@/lib/wordpress';

const ITEMS_PER_STEP = 6;

export default function MediaGrid({ posts }: { posts: AardContentItem[] }) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_STEP);
  const visiblePosts = posts.slice(0, visibleCount);

  return (
    <>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post) => (
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
              <Link href={`/media/${post.slug}`} className="text-sm font-bold text-[#45bd91] transition hover:text-[#00406d]">اقرأ المزيد ←</Link>
            </div>
          </article>
        ))}
      </div>
      {visibleCount < posts.length ? (
        <div className="mt-12 flex justify-center">
          <button type="button" onClick={() => setVisibleCount((count) => Math.min(count + ITEMS_PER_STEP, posts.length))} className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#51c698] px-8 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#45b287]">
            تصفح باقي الأخبار والأنشطة
          </button>
        </div>
      ) : null}
    </>
  );
}
