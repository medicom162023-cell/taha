'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DonationBanner() {
  return (
    <section className="bg-white px-5 py-8 font-[Alexandria] md:px-8 md:py-12">
      <div className="mx-auto max-w-[1180px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.5 }}
          className="relative isolate overflow-hidden rounded-[28px] px-6 py-12 shadow-lg md:px-12 md:py-14 lg:px-16"
          style={{
            backgroundImage: "url('/DonationBanner.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-l from-[#003358]/95 via-[#00406d]/88 to-[#51c698]/70" />

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div className="max-w-2xl text-right">
              <span className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold text-white/90">
                عطاؤك يصل إلى من يحتاجه
              </span>
              <h2 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
                تبرعك يصنع فرقاً حقيقياً
              </h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 md:text-base">
                بدعمك نستطيع الاستجابة للاحتياجات الإنسانية وتقديم المساعدة للأسر الأكثر احتياجاً في قطاع غزة.
              </p>
            </div>

            <Link
              href="/donate"
              className="inline-flex min-w-36 items-center justify-center rounded-xl bg-[#51c698] px-8 py-4 text-sm font-extrabold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-[#45b287]"
            >
              تبرع الآن
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
