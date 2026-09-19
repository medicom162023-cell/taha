import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import MediaGrid from '@/components/MediaGrid';
import { getAllMediaPosts, WORDPRESS_BASE_URL } from '@/lib/wordpress';

const PAGE_SIZE = 12;
type PageProps = { searchParams: Promise<{ page?: string | string[] }> };
const pageHref = (page: number) => page === 1 ? '/media' : `/media?page=${page}`;

async function getPageData(searchParams: PageProps['searchParams']) {
  const { page: raw } = await searchParams;
  if (raw !== undefined && (typeof raw !== 'string' || !/^[1-9]\d*$/.test(raw))) notFound();
  const page = raw === undefined ? 1 : Number(raw);
  if (!Number.isSafeInteger(page)) notFound();
  if (raw === '1') permanentRedirect('/media');
  const allPosts = await getAllMediaPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / PAGE_SIZE));
  if (page > totalPages) notFound();
  return { page, totalPages, posts: allPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE) };
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { page } = await getPageData(searchParams);
  return {
    title: page === 1 ? 'المركز الإعلامي | جمعية التحالف للإغاثة والتنمية' : `المركز الإعلامي — الصفحة ${page} | جمعية التحالف للإغاثة والتنمية`,
    description: 'أحدث أخبار وأنشطة جمعية التحالف للإغاثة والتنمية من WordPress.',
    alternates: { canonical: `${WORDPRESS_BASE_URL}${pageHref(page)}` },
    robots: { index: true, follow: true },
  };
}

export default async function MediaPage({ searchParams }: PageProps) {
  const { page, totalPages, posts } = await getPageData(searchParams);
  return (
    <main className="bg-[#f7faf9] font-[Alexandria]">
      <section className="bg-[#00406d] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <span className="mb-3 block text-sm font-semibold text-[#51c698]">الأخبار وأنشطة الجمعية</span>
          <h1 className="text-3xl font-extrabold md:text-5xl">المركز الإعلامي</h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          {posts.length > 0 ? (
            <MediaGrid posts={posts} />
          ) : (
            <div className="rounded-2xl bg-white p-8 text-center text-slate-600">
              لا توجد أخبار أو أنشطة منشورة حاليًا.
            </div>
          )}

          {totalPages > 1 && (
            <nav aria-label="صفحات الأخبار" className="mt-12 flex flex-wrap items-center justify-center gap-3">
              {page > 1 && <Link href={pageHref(page - 1)} className="rounded-lg bg-[#51c698] px-5 py-3 text-sm font-bold text-white hover:bg-[#45b287]">السابق</Link>}
              {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
                <Link key={number} href={pageHref(number)} aria-current={number === page ? 'page' : undefined}
                  className={`rounded-lg px-4 py-3 text-sm font-bold ${number === page ? 'bg-[#00406d] text-white' : 'bg-white text-[#00406d] hover:bg-[#e9f1ee]'}`}>
                  {number}
                </Link>
              ))}
              {page < totalPages && <Link href={pageHref(page + 1)} className="rounded-lg bg-[#51c698] px-5 py-3 text-sm font-bold text-white hover:bg-[#45b287]">التالي</Link>}
            </nav>
          )}
        </div>
      </section>
    </main>
  );
}
