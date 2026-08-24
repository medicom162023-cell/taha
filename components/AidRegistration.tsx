'use client';

import Link from 'next/link';
import { useHomepageContent } from '@/components/HomepageContentProvider';

export default function AidRegistration() {
  const { assistance } = useHomepageContent();
  return (
    <section
      className="min-h-[260px] font-[Alexandria] md:min-h-[183px]"
      style={{ background: 'linear-gradient(90deg, #ffffff 0%, #ffffff 40%, #e8faf4 100%)' }}
    >
      <div className="mx-auto flex min-h-[260px] max-w-[1020px] flex-col items-center justify-center gap-6 px-5 py-9 text-center md:min-h-[183px] md:flex-row md:justify-between md:gap-12 md:px-6 md:py-0 md:text-right">
        <div className="text-center md:text-right">
          <h2 className="mb-3 text-xl font-extrabold leading-snug text-[#51c698] sm:text-2xl">
            {assistance.title}
          </h2>
          <p className="text-[13px] leading-7 text-[#68747c]">
            {assistance.description}
          </p>
        </div>
        <Link
          href={assistance.buttonHref}
          className="inline-flex h-14 w-full max-w-[220px] shrink-0 items-center justify-center rounded-lg bg-[#51c698] text-base font-bold text-white transition hover:bg-[#45b287] sm:w-[168px] md:h-16"
        >
          {assistance.buttonLabel}
        </Link>
      </div>
    </section>
  );
}
