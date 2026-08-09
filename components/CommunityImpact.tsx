'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const points = [
  'الاستجابة للاحتياجات الإنسانية الطارئة',
  'تعزيز الوعي الصحي والمجتمعي',
  'دعم المبادرات التنموية المحلية',
];

export default function CommunityImpact() {
  return (
    <section className="bg-white py-16 font-[Alexandria] md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="relative order-1 min-h-[360px] overflow-hidden rounded-[28px] lg:min-h-[470px]"
          >
            <Image
              src="/project.png"
              alt="أثر برامج جمعية التحالف للإغاثة والتنمية"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#003358]/45 via-transparent to-transparent" />
            <div className="absolute bottom-5 right-5 rounded-2xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur md:bottom-7 md:right-7">
              <span className="block text-xs font-semibold text-[#51c698]">أثر مستدام</span>
              <strong className="mt-1 block text-base text-[#00406d] md:text-lg">معاً نعزز صمود المجتمع</strong>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="order-2 text-right"
          >
            <span className="mb-3 inline-flex rounded-full bg-[#51c698]/10 px-4 py-1.5 text-xs font-bold text-[#45b287] md:text-sm">
              الإغاثة والتنمية من أجل المجتمع
            </span>
            <h2 className="max-w-xl text-3xl font-extrabold leading-[1.45] text-[#00406d] md:text-4xl">
              نعمل لدعم المجتمعات وتعزيز قدرتها على الصمود
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-gray-600 md:text-base">
              تلتزم جمعية التحالف للإغاثة والتنمية بتقديم استجابات إنسانية فعالة تسهم في التخفيف من آثار الأزمات وتعزيز قدرة المجتمعات على التعافي، عبر برامج صحية وتوعوية وإنسانية تستهدف تحسين الظروف المعيشية والوصول إلى الفئات الأكثر احتياجاً.
            </p>

            <div className="mt-7 space-y-3">
              {points.map((point) => (
                <div key={point} className="flex items-center gap-3 rounded-xl bg-[#f7fbfa] px-4 py-3.5">
                  <span className="flex h-7 w-7 flex-none items-center justify-center rounded-full bg-[#51c698] text-white">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m5 12 4 4L19 6" />
                    </svg>
                  </span>
                  <span className="text-sm font-semibold text-[#28465d] md:text-base">{point}</span>
                </div>
              ))}
            </div>

            <Link
              href="/projects"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#51c698] px-7 py-3.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#45b287]"
            >
              شاهد مشاريعنا
              <span aria-hidden="true">←</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
