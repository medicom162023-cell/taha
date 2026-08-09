import WpContent from '@/components/WpContent';
import { getPageBySlug } from '@/lib/wordpress';

export const metadata = {
  title: 'تواصل معنا | جمعية التحالف للإغاثة والتنمية',
  description: 'بيانات التواصل مع جمعية التحالف للإغاثة والتنمية ومحتوى صفحة الاتصال من aard.ps.',
};

export default async function ContactPage() {
  const page = await getPageBySlug('contact-us-form');

  return (
    <main className="bg-[#f7faf9] font-[Alexandria]">
      <section className="bg-[#00406d] py-16 text-white md:py-20">
        <div className="mx-auto max-w-[1180px] px-5 md:px-8">
          <span className="mb-3 block text-sm font-semibold text-[#51c698]">نحن هنا لخدمتكم</span>
          <h1 className="text-3xl font-extrabold md:text-5xl">تواصل معنا</h1>
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto grid max-w-[1180px] grid-cols-1 gap-8 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
          <aside className="rounded-2xl bg-[#00406d] p-7 text-white md:p-9">
            <h2 className="mb-5 text-2xl font-bold">بيانات التواصل</h2>
            <div className="space-y-4 text-sm leading-7 text-white/80 md:text-base">
              <p>فلسطين - مدينة غزة - P850 شارع عايدية - خلف برج الشفاء</p>
              <p><a className="hover:text-[#51c698]" href="tel:+97282856668">هاتف: 0097282856668</a></p>
              <p><a className="hover:text-[#51c698]" href="mailto:info@aard.ps">info@aard.ps</a></p>
            </div>
          </aside>

          <div className="rounded-2xl bg-white p-7 shadow-sm md:p-9">
            {page ? (
              <WpContent html={page.content.rendered} />
            ) : (
              <div className="text-center text-slate-600">تعذر تحميل صفحة التواصل من WordPress حالياً.</div>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
