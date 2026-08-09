import WpContent from '@/components/WpContent';
import { getPageBySlug } from '@/lib/wordpress';

export const metadata = {
  title: 'من نحن | جمعية التحالف للإغاثة والتنمية',
  description: 'تعرف على جمعية التحالف للإغاثة والتنمية ورسالتها وبرامجها الإنسانية والتنموية.',
};

export default async function AboutPage() {
  const page = await getPageBySlug('about');

  return (
    <main className="bg-white font-[Alexandria]">
      <section className="bg-[#00406d] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <span className="mb-3 block text-sm font-semibold text-[#51c698]">جمعية التحالف للإغاثة والتنمية</span>
          <h1 className="text-3xl font-extrabold md:text-5xl">من نحن</h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-[900px] px-5 md:px-8">
          {page ? (
            <WpContent html={page.content.rendered} />
          ) : (
            <div className="rounded-2xl bg-[#f7faf9] p-8 text-center text-slate-600">
              تعذر تحميل محتوى صفحة من نحن من WordPress حالياً.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
