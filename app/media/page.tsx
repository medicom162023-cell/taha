import Link from 'next/link';
import { getLatestPosts } from '@/lib/wordpress';

export const metadata = {
  title: 'المركز الإعلامي | جمعية التحالف للإغاثة والتنمية',
  description: 'أحدث أخبار وأنشطة جمعية التحالف للإغاثة والتنمية من WordPress.',
};

export default async function MediaPage() {
  const posts = await getLatestPosts(12);

  return (
    <main className="bg-[#f7faf9] font-[Alexandria]">
      <section className="bg-[#00406d] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <span className="mb-3 block text-sm font-semibold text-[#51c698]">آخر المستجدات</span>
          <h1 className="text-3xl font-extrabold md:text-5xl">المركز الإعلامي</h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-7 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {posts.map((post) => {
            const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
            return (
              <article key={post.id} className="overflow-hidden rounded-2xl border border-[#e9f1ee] bg-white shadow-sm">
                {image ? <img src={image} alt="" className="h-52 w-full object-cover" loading="lazy" /> : null}
                <div className="p-6">
                  <div className="mb-2 text-xs text-slate-400">
                    {new Date(post.date).toLocaleDateString('ar', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h2 className="mb-3 line-clamp-2 text-lg font-bold leading-8 text-[#00406d]" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  <div className="mb-5 line-clamp-3 text-sm leading-7 text-slate-600" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                  <Link href={post.link} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#45bd91] hover:text-[#00406d]">
                    اقرأ الخبر ←
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
