import Link from 'next/link';

export const metadata = {
  title: 'تبرع الآن | جمعية التحالف للإغاثة والتنمية',
  description: 'دعم برامج جمعية التحالف للإغاثة والتنمية.',
};

export default function DonatePage() {
  return (
    <main className="bg-white font-[Alexandria]">
      <section className="bg-[#00406d] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[900px] px-5 text-center md:px-8">
          <span className="mb-3 block text-sm font-semibold text-[#51c698]">ساهم في صناعة الأثر</span>
          <h1 className="text-3xl font-extrabold md:text-5xl">تبرع الآن</h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-8 text-white/80 md:text-base">
            صفحة التبرع الجديدة قيد التجهيز. يمكنك في الوقت الحالي الانتقال إلى صفحة التبرع المنشورة على موقع الجمعية.
          </p>
          <Link
            href="https://aard.ps/%D8%AA%D9%80%D8%A8%D9%80%D8%B1%D8%B9/"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-xl bg-[#51c698] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#45b287]"
          >
            الانتقال إلى صفحة التبرع الحالية
          </Link>
        </div>
      </section>
    </main>
  );
}
