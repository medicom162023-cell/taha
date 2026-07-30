'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Post {
  id: number;
  title: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
    }>;
  };
}

export default function LatestNews() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/news');
        if (!res.ok) {
          throw new Error('فشل جلب الأخبار من الخادم');
        }
        const data = await res.json();
        setPosts(data);
      } catch (err: any) {
        console.error('Error fetching news:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchNews();
  }, []);

  if (loading) {
    return <div className="text-center py-16 text-[#003358] font-[Alexandria]">جاري تحميل أحدث الأخبار...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500 font-[Alexandria]">حدث خطأ أثناء تحميل الأخبار: {error}</div>;
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <section className="py-24 bg-gray-50 font-[Alexandria]">
      <div className="max-w-7xl mx-auto px-6">
        {/* عنوان القسم مع مسافة مريحة للعين */}
        <div className="text-center mb-16">
          <span className="inline-block bg-[#51c698]/10 text-[#51c698] text-sm font-semibold px-4 py-1.5 rounded-full mb-3 border border-[#51c698]/20">
            آخر المستجدات
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#003358]">أخبار الجمعية</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => {
            const featuredImage = 
              post._embedded?.['wp:featuredmedia']?.[0]?.source_url || 
              '/hero-bg.jpg';

            return (
              <div 
                key={post.id} 
                className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between border border-gray-100 hover:shadow-xl transition-all duration-300 group"
              >
                <div className="relative w-full h-52 overflow-hidden bg-gray-200">
                  <img
                    src={featuredImage}
                    alt={post.title.rendered}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-[#51c698] text-white text-xs font-bold px-3 py-1 rounded-lg shadow">
                    جديد
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <span className="text-xs text-gray-400 mb-2">
                    {new Date(post.date).toLocaleDateString('ar-SA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                  
                  <h3 
                    className="text-lg font-bold text-[#003358] mb-3 line-clamp-2 group-hover:text-[#51c698] transition-colors"
                    dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                  />
                  
                  <div 
                    className="text-gray-600 text-xs md:text-sm line-clamp-3 mb-6 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                  />
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`https://aard.ps/${post.slug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[#51c698] font-semibold text-sm hover:text-[#45b287] transition-colors"
                  >
                    اقرأ التفاصيل &larr;
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
