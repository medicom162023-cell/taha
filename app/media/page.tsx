import MediaGrid from '@/components/MediaGrid';
import { getActivities, getLatestPosts } from '@/lib/wordpress';

export const metadata = {
  title: 'المركز الإعلامي | جمعية التحالف للإغاثة والتنمية',
  description: 'أحدث أخبار وأنشطة جمعية التحالف للإغاثة والتنمية من WordPress.',
};

export default async function MediaPage() {
  const [news, activities] = await Promise.all([getLatestPosts(12), getActivities()]);
  const posts = Array.from(
    new Map([...news, ...activities].map((post) => [post.id, post])).values(),
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

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
        </div>
      </section>
    </main>
  );
}

// Stable Cloudflare deployment trigger.
