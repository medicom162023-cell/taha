'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useHomepageContent } from '@/components/HomepageContentProvider';

export default function CommunityImpact() {
  const { impact } = useHomepageContent();
  return (
    <section className="bg-white py-20 font-[Alexandria] lg:py-[139px]">
      <div className="mx-auto max-w-[1088px] px-5 lg:px-0">
        <div dir="ltr" className="grid items-start gap-10 lg:grid-cols-[540px_440px] lg:gap-[108px]">
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="relative order-1 h-[360px] overflow-hidden rounded-[8px] sm:h-[420px] lg:col-start-1 lg:row-start-1 lg:h-[480px] lg:w-[540px]"
          >
            <Image
              src={impact.image}
              alt={impact.title}
              fill
              sizes="(min-width: 1024px) 540px, 100vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            dir="rtl"
            className="order-2 text-right lg:col-start-2 lg:row-start-1 lg:pt-[20px]"
          >
            <span className="mb-[27px] inline-flex flex-col items-start gap-[10px] text-[24px] font-bold leading-[34px] text-[#51c698]">
              {impact.eyebrow}
              <span className="h-[2px] w-[31px] bg-[#00406d]" />
            </span>
            <h2 className="text-[16px] font-normal leading-[24px] text-[#707070]">
              {impact.title}
            </h2>
            <p className="mt-[18px] text-[12px] leading-[30px] text-[#707070]">
              {impact.description}
            </p>

            <div className="mt-[14px] space-y-[10px]">
              {impact.points.map((point) => (
                <div key={point} className="flex items-center justify-start gap-[10px]">
                  <span className="h-[7px] w-[7px] flex-none rounded-full bg-[#51c698]" />
                  <span className="text-[12px] font-normal leading-[18px] text-[#00406d]">{point}</span>
                </div>
              ))}
            </div>

            <Link
              href={impact.buttonHref}
              className="mt-[29px] inline-flex h-[48px] w-[168px] items-center justify-center rounded-[8px] bg-[#51c698] text-[12px] font-normal text-white transition hover:bg-[#45b287]"
            >
              {impact.buttonLabel}
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
