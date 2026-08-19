import Link from 'next/link';

export default function AidRegistration() {
  return (
    <section
      className="font-[Alexandria]"
      style={{
        height: 183,
        background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 40%, #e8faf4 100%)',
      }}
    >
      <div className="mx-auto flex h-full max-w-[1020px] items-center justify-between gap-12 px-6 max-md:min-h-[220px] max-md:flex-col max-md:justify-center max-md:gap-6 max-md:py-9 max-md:text-center">
        <div className="text-right max-md:text-center">
          <h2 className="mb-3 text-2xl font-extrabold leading-snug text-[#51c698]">
            التسجيل للمساعدات
          </h2>
          <p className="text-[13px] leading-7 text-[#68747c]">
            استمارة تسجيل أسرة للاستفادة من المساعدات المقدمة من جمعية التحالف للإغاثة والتنمية
          </p>
        </div>
        <Link
          href="/contact"
          className="inline-flex h-16 w-[168px] shrink-0 items-center justify-center rounded-lg bg-[#51c698] text-base font-bold text-white transition hover:bg-[#45b287]"
        >
          سجل الآن
        </Link>
      </div>
    </section>
  );
}
