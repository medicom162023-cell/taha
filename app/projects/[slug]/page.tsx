import { notFound } from 'next/navigation';
import WpContent from '@/components/WpContent';
import { getProjectBySlug } from '@/lib/wordpress';

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="bg-white font-[Alexandria]">
      <section className="bg-[#00406d] py-14 text-white md:py-20">
        <div className="mx-auto max-w-[980px] px-5 md:px-8">
          <span className="mb-3 block text-sm font-semibold text-[#51c698]">مشاريع الجمعية</span>
          <h1 className="text-3xl font-extrabold leading-tight md:text-5xl">{project.title}</h1>
        </div>
      </section>

      <article className="py-12 md:py-16">
        <div className="mx-auto max-w-[900px] px-5 md:px-8">
          {project.featured_image ? (
            <img src={project.featured_image} alt="" className="mb-10 max-h-[520px] w-full rounded-2xl object-cover" />
          ) : null}
          <WpContent html={project.content} />
        </div>
      </article>
    </main>
  );
}
