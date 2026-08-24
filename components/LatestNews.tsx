'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useHomepageContent } from '@/components/HomepageContentProvider';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  date: string;
  featured_image: string | null;
}

export default function LatestNews() {
  const { news } = useHomepageContent();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) throw new Error('فشل جلب الأخبار من الخادم');
        const data: Post[] = await res.json();
        setPosts(data);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'حدث خطأ غير متوقع';
        console.error('Error fetching news:', err);
        setError(message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return (
      <section className="bg-[#f7faf9] px-5 py-16 text-center font-[Alexandria] text-[#003358] md:py-20">
        جاري تحميل أحدث الأخبار...
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-[#f7faf9] px-5 py-16 text-center font-[Alexandria] text-red-600 md:py-20">
        حدث خطأ أثناء تحميل الأخبار: {error}
      </section>
    );
  }

  if (posts.length === 0) return null;

  return (
    <section className="bg-[#f7faf9] py-16 font-[Alexandria] md:py-20 lg:py-24">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-2 block text-sm font-semibold text-[#51c698]">{news.eyebrow}</span>
          <h2 className="text-3xl font-extrabold text-[#003358] md:text-4xl">{news.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            {news.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {posts.map((post) => {
            const featuredImage = post.featured_image || '/hero-bg.jpg';

            return (
              <article
                key={post.id}
                className="group flex min-h-full flex-col overflow-hidden rounded-2xl border border-[#e9f1ee] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-gray-100 sm:h-56">
                  <img
                    src={featuredImage}
                    alt={post.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 rounded-lg bg-[#51c698] px-3 py-1 text-xs font-bold text-white shadow-sm">
                    جديد
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <time className="mb-2 text-xs text-gray-400" dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>

                  <h3 className="mb-3 line-clamp-2 text-lg font-bold leading-8 text-[#003358] transition-colors group-hover:text-[#45b287]">
                    {post.title}
                  </h3>

                  <p className="mb-5 line-clamp-3 flex-1 text-sm leading-7 text-gray-600">
                    {post.excerpt}
                  </p>

                  <Link
                    href={`/media/${post.slug}`}
                    className="inline-flex w-fit items-center gap-2 text-sm font-bold text-[#45b287] transition hover:text-[#00406d]"
                  >
                    اقرأ التفاصيل
                    <span aria-hidden="true">←</span>
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
