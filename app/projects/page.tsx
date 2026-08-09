import Link from 'next/link';
import { searchPosts } from '@/lib/wordpress';

export const metadata = {
  title: 'المشاريع | جمعية التحالف للإغاثة والتنمية',
  description: 'مشاريع وأنشطة جمعية التحالف للإغاثة والتنمية المنشورة على aard.ps.',
};

export default async function ProjectsPage() {
  const posts = await searchPosts('مشروع', 12);

  return (
    <main className="bg-white font-[Alexandria]">
      <section className="bg-[#00406d] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <span className="mb-3 block text-sm font-semibold text-[#51c698]">برامجنا ومبادراتنا</span>
          <h1 className="text-3xl font-extrabold md:text-5xl">المشاريع</h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const image = post._embedded?.['wp:featuredmedia']?.[0]?.source_url;
                return (
                  <article key={post.id} className="overflow-hidden rounded-2xl border border-[#e9f1ee] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">
                    {image ? <img src={image} alt="" className="h-52 w-full object-cover" loading="lazy" /> : null}
                    <div className="p-6">
                      <h2 className="mb-3 line-clamp-2 text-lg font-bold leading-8 text-[#00406d]" dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      <div className="mb-5 line-clamp-3 text-sm leading-7 text-slate-600" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                      <Link href={post.link} target="_blank" rel="noreferrer" className="text-sm font-bold text-[#45bd91] hover:text-[#00406d]">
                        تفاصيل المشروع ←
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="rounded-2xl bg-[#f7faf9] p-8 text-center text-slate-600">
              لم يتم العثور على مشاريع منشورة في WordPress حالياً.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
