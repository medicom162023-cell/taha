import ProjectsGrid from '@/components/ProjectsGrid';
import { getProjects } from '@/lib/wordpress';

export const metadata = {
  title: 'المشاريع | جمعية التحالف للإغاثة والتنمية',
  description: 'مشاريع وأنشطة جمعية التحالف للإغاثة والتنمية المنشورة على aard.ps.',
};

export default async function ProjectsPage() {
  const posts = await getProjects(100);

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
            <ProjectsGrid projects={posts} />
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
