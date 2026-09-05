import Link from 'next/link';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'تواصل معنا | جمعية التحالف للإغاثة والتنمية',
  description: 'تواصل مع جمعية التحالف للإغاثة والتنمية للاستفسارات والتعاون والشراكة.',
};

function ContactIcon({ type }: { type: 'email' | 'phone' | 'whatsapp' | 'location' }) {
  const paths = {
    email: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    phone: <path d="M7 3h3l1.3 5-2.1 1.4a14 14 0 0 0 5.4 5.4L16 12.7l5 1.3v3c0 2.2-1.8 4-4 4A14 14 0 0 1 3 7c0-2.2 1.8-4 4-4Z"/>,
    whatsapp: <><path d="M20.5 11.7a8.5 8.5 0 0 1-12.6 7.5L3 20.5l1.3-4.7A8.5 8.5 0 1 1 20.5 11.7Z"/><path d="M8.5 7.5c.5 4 3 6.5 7 7"/></>,
    location: <><path d="M12 22s7-6.1 7-13A7 7 0 0 0 5 9c0 6.9 7 13 7 13Z"/><circle cx="12" cy="9" r="2.5"/></>,
  };
  return <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 shrink-0 fill-none stroke-current stroke-[1.7] text-[#51c698]">{paths[type]}</svg>;
}

function SocialIcon({ label, href, children }: { label: string; href: string; children: React.ReactNode }) {
  return <a href={href} aria-label={label} className="grid h-8 w-8 place-items-center text-[#51c698] transition hover:-translate-y-0.5 hover:text-[#00406d]" target="_blank" rel="noreferrer">{children}</a>;
}

export default function ContactPage() {
  return (
    <main className="bg-[#f2f2f2] font-[Alexandria] text-[#7b7b7b]">
      <section className="relative flex min-h-[278px] items-center justify-center overflow-hidden bg-[linear-gradient(110deg,#197f89_0%,#00406d_72%)] px-5 text-center text-white">
        <div className="absolute inset-x-0 top-4 mx-auto w-full max-w-[1180px] px-5 text-right text-[10px] text-white/55 md:px-8">
          <Link href="/" className="transition hover:text-white">الرئيسية</Link><span>/ تواصل معنا</span>
        </div>
        <div className="pt-2">
          <h1 className="text-[32px] font-semibold leading-tight md:text-[40px]">تواصل معنا</h1>
          <p className="mt-5 text-xs leading-6 md:text-sm">نرحب بتواصلكم مع جمعية التحالف للإغاثة والتنمية</p>
        </div>
      </section>

      <section className="px-5 pb-24 pt-20 md:px-8 md:pb-[142px] md:pt-[78px]">
        <div className="mx-auto max-w-[1088px]">
          <div className="mb-7 text-center">
            <p className="text-xs font-medium text-[#00406d]">التواصل</p>
            <h2 className="mt-8 text-[22px] font-bold text-[#51c698] md:text-[26px]">نعمل معاً من أجل أثر أكبر</h2>
            <p className="mx-auto mt-3 max-w-[850px] text-[13px] leading-7 text-[#7b7b7b] md:text-[15px]">
              سواء كان تواصلكم للاستفسار عن برامج الجمعية ومشاريعها، أو بهدف التعاون والشراكة، أو لتقديم مقترحات وملاحظات<br className="hidden md:block" /> يمكنكم التواصل معنا عبر قنوات الاتصال التالية
            </p>
          </div>

          <div className="grid items-start gap-8 lg:grid-cols-[442px_1fr] lg:gap-[66px]">
            <aside className="order-2 space-y-3 lg:order-1">
              <a href="mailto:Info@aard.ps" className="flex min-h-[54px] items-center gap-4 bg-white px-5 text-[13px] font-medium text-[#082b4b] transition hover:shadow-md"><ContactIcon type="email" /><span dir="ltr">info@aard.ps</span></a>
              <a href="tel:+97282856668" className="flex min-h-[54px] items-center gap-4 bg-white px-5 text-[13px] font-medium text-[#082b4b] transition hover:shadow-md"><ContactIcon type="phone" /><span dir="ltr">0097282856668</span></a>
              <a href="https://wa.me/966123456987" className="flex min-h-[54px] items-center gap-4 bg-white px-5 text-[13px] font-medium text-[#082b4b] transition hover:shadow-md" target="_blank" rel="noreferrer"><ContactIcon type="whatsapp" /><span dir="ltr">00966123456987</span></a>
              <div className="flex min-h-[54px] items-center gap-4 bg-white px-5 text-[12px] font-medium leading-6 text-[#082b4b]"><ContactIcon type="location" /><span>فلسطين - مدينة غزة - P850 شارع عايدية - خلف برج الشفاء</span></div>
              <div className="flex min-h-[54px] items-center justify-center gap-2 bg-white px-5">
                <SocialIcon label="يوتيوب" href="https://www.youtube.com/"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5a3 3 0 0 0-2.1 2.1A31 31 0 0 0 2 12a31 31 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 22 12a31 31 0 0 0-.4-4.8ZM10 15.3V8.7l5.7 3.3-5.7 3.3Z"/></svg></SocialIcon>
                <SocialIcon label="إنستغرام" href="https://www.instagram.com/aard.ps"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" className="fill-current stroke-0"/></svg></SocialIcon>
                <SocialIcon label="فيسبوك" href="https://www.facebook.com/profile.php?id=100067786261535"><svg viewBox="0 0 24 24" className="h-5 w-5 fill-current"><path d="M14 8h3V4.2c-.5-.1-2.2-.2-4-.2-3.7 0-6.2 2.3-6.2 6.4V14H3v4.3h3.8V24h4.7v-5.7h3.9L16 14h-4.5v-3.2C11.5 9.5 11.9 8 14 8Z"/></svg></SocialIcon>
                <SocialIcon label="إكس" href="https://x.com/aardps"><svg viewBox="0 0 24 24" className="h-4 w-4 fill-current"><path d="M18.2 2H22l-8.3 9.5L23.5 22h-7.7l-6-7.9L2.9 22H-1l8.9-10.2L-1.5 2h7.9l5.4 7.1L18.2 2Zm-1.4 18h2.1L5.2 3.9H3L16.8 20Z"/></svg></SocialIcon>
              </div>
            </aside>

            <div className="order-1 lg:order-2"><ContactForm /></div>
          </div>

          <div className="mt-[86px] overflow-hidden bg-white shadow-sm">
            <iframe title="موقع جمعية التحالف للإغاثة والتنمية على الخريطة" src="https://www.google.com/maps?q=Al%20Shifa%20Hospital%2C%20Gaza&z=15&output=embed" className="h-[300px] w-full border-0 md:h-[327px]" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[linear-gradient(110deg,#fff_55%,#e5faf2)] px-5 py-14 text-center md:py-[52px]">
        <div className="pointer-events-none absolute -right-5 top-12 h-20 w-20 rounded-full border-[18px] border-[#51c698]/10" />
        <h2 className="text-2xl font-extrabold text-[#51c698]">تبرعك يصنع فرقاً حقيقياً</h2>
        <p className="mt-4 text-sm leading-7 text-[#7b7b7b]">بدعمك نستطيع الاستجابة للاحتياجات الإنسانية وتقديم المساعدة للأسر الأكثر احتياجاً في قطاع غزة</p>
        <Link href="/donate" className="mt-5 inline-flex min-h-[42px] min-w-[168px] items-center justify-center rounded-[7px] bg-[#51c698] px-6 text-xs font-semibold text-white transition duration-300 hover:bg-[#00406d] hover:shadow-lg">تبرع الآن</Link>
      </section>
    </main>
  );
}
