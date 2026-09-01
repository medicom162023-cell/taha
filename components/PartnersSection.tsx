'use client';

import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useHomepageContent } from '@/components/HomepageContentProvider';

const uploadedPartners = [
  { name: 'الإغاثة الإسلامية', logo: '/partners/islamic-relief.webp' },
  { name: 'الصندوق العربي للإنماء الاقتصادي والاجتماعي', logo: '/partners/arab-fund-new.webp' },
  { name: 'المصرف العربي للتنمية الاقتصادية في أفريقيا (BADEA)', logo: '/partners/badea-new.webp' },
  { name: 'الصندوق الكويتي للتنمية الاقتصادية العربية', logo: '/partners/kuwait-fund-new.webp' },
  { name: 'MedGlobal', logo: '/partners/medglobal.webp' },
  { name: 'جمعية بيتنا للتنمية والتطوير المجتمعي', logo: '/partners/bcd.webp' },
  { name: 'برنامج الأمم المتحدة الإنمائي (UNDP)', logo: '/partners/undp-new.webp' },
  { name: 'شبكة المنظمات الأهلية الفلسطينية (PNGO)', logo: '/partners/pngo-new.webp' },
];

function getVisibleCount() {
  if (typeof window === 'undefined') return 6;
  if (window.innerWidth < 640) return 2;
  if (window.innerWidth < 1024) return 3;
  return 6;
}

function ArrowIcon({ direction }: { direction: 'right' | 'left' }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5 fill-none stroke-current stroke-2">
      <path d={direction === 'right' ? 'm9 5 7 7-7 7' : 'm15 5-7 7 7 7'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PartnersSection() {
  const { partners } = useHomepageContent();
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const updateVisibleCount = () => setVisibleCount(getVisibleCount());
    updateVisibleCount();
    window.addEventListener('resize', updateVisibleCount);
    return () => window.removeEventListener('resize', updateVisibleCount);
  }, []);

  const visiblePartners = useMemo(
    () => Array.from(
      { length: Math.min(visibleCount, uploadedPartners.length) },
      (_, offset) => uploadedPartners[(startIndex + offset) % uploadedPartners.length],
    ),
    [startIndex, visibleCount],
  );

  const move = (step: number) => {
    setStartIndex((current) => (current + step + uploadedPartners.length) % uploadedPartners.length);
  };

  return (
    <section className="bg-[#f7faf9] py-16 font-[Alexandria] md:py-20">
      <div className="mx-auto max-w-[1240px] px-5 md:px-8">
        <div className="mb-10 text-center md:mb-12">
          <span className="mb-2 block text-sm font-semibold text-[#51c698]">{partners.eyebrow}</span>
          <h2 className="text-3xl font-extrabold text-[#00406d] md:text-4xl">{partners.title}</h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-gray-500 md:text-base">
            {partners.description}
          </p>
        </div>

        <div className="relative px-10 sm:px-12">
          <button
            type="button"
            onClick={() => move(-1)}
            aria-label="عرض الشركاء السابقين"
            className="absolute right-0 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#dbeae5] bg-white text-[#00406d] shadow-sm transition duration-300 hover:scale-110 hover:border-[#51c698] hover:bg-[#00406d] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#51c698] sm:h-10 sm:w-10"
          >
            <ArrowIcon direction="right" />
          </button>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6" aria-live="polite">
            {visiblePartners.map((partner, index) => (
              <div
                key={`${partner.name}-${startIndex}-${index}`}
                className="group flex min-h-28 min-w-0 items-center justify-center overflow-hidden rounded-2xl border border-[#e9f1ee] bg-white px-3 py-3 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#51c698]/50 hover:shadow-md sm:min-h-32"
              >
                <Image
                  src={partner.logo}
                  alt={partner.name}
                  title={partner.name}
                  width={180}
                  height={120}
                  className="h-[96px] w-full object-contain opacity-45 grayscale-[70%] saturate-[35%] transition duration-300 ease-out group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0 group-hover:saturate-100 sm:h-[108px]"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => move(1)}
            aria-label="عرض الشركاء التاليين"
            className="absolute left-0 top-1/2 z-10 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[#dbeae5] bg-white text-[#00406d] shadow-sm transition duration-300 hover:scale-110 hover:border-[#51c698] hover:bg-[#00406d] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#51c698] sm:h-10 sm:w-10"
          >
            <ArrowIcon direction="left" />
          </button>
        </div>

        <div className="mt-9 flex justify-center">
          <a
            href={partners.buttonHref}
            className="inline-flex items-center justify-center rounded-xl border border-[#51c698] px-7 py-3 text-sm font-bold text-[#45b287] transition hover:bg-[#51c698] hover:text-white"
          >
            {partners.buttonLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
