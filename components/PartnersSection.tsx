const partners = [
  'شريك تنموي',
  'شريك إنساني',
  'شريك صحي',
  'شريك مجتمعي',
  'شريك إغاثي',
  'شريك مؤسسي',
];

export default function PartnersSection() {
  return (
    <section className="bg-gray-50 py-20 font-[Alexandria]">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="mb-12 text-center">
          <span className="mb-2 block text-sm font-semibold text-[#51c698]">شركاء النجاح</span>
          <h2 className="text-3xl font-bold text-[#00406d] md:text-4xl">شركاؤنا في العطاء</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            نعتز بشراكاتنا التي تسهم في توسيع أثر برامجنا الإنسانية والتنموية والوصول إلى الفئات الأكثر احتياجاً.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner, index) => (
            <div
              key={`${partner}-${index}`}
              className="flex min-h-28 items-center justify-center rounded-xl border border-gray-100 bg-white px-4 text-center text-sm font-semibold text-gray-400 shadow-sm transition hover:-translate-y-1 hover:border-[#51c698]/30 hover:text-[#00406d] hover:shadow-md"
            >
              {partner}
            </div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-lg bg-[#51c698] px-7 py-3 text-sm font-bold text-white transition hover:bg-[#45b287]"
          >
            كن شريكاً معنا
          </a>
        </div>
      </div>
    </section>
  );
}
