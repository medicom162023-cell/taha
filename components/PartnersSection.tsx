const partners = [
  'UNDP',
  'Kuwait Fund',
  'BADEA',
  'Arab Fund',
  'شركاء الإغاثة',
  'شركاء التنمية',
];

export default function PartnersSection() {
  return (
    <section className="bg-[#f7faf9] py-16 font-[Alexandria] md:py-20">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-2 block text-sm font-semibold text-[#51c698]">شركاء النجاح</span>
          <h2 className="text-3xl font-extrabold text-[#00406d] md:text-4xl">شركاؤنا في العطاء</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            نعتز بالشراكات التي توسّع أثر برامجنا الإنسانية والتنموية وتساعدنا على الوصول إلى الفئات الأكثر احتياجاً بكفاءة واستدامة.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex min-h-28 items-center justify-center rounded-2xl border border-[#e9f1ee] bg-white px-4 text-center text-sm font-bold text-[#5b7180] shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#51c698]/40 hover:text-[#00406d] hover:shadow-md"
            >
              {partner}
            </div>
          ))}
        </div>

        <div className="mt-9 flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl border border-[#51c698] px-7 py-3 text-sm font-bold text-[#45b287] transition hover:bg-[#51c698] hover:text-white"
          >
            كن شريكاً معنا
          </a>
        </div>
      </div>
    </section>
  );
}
