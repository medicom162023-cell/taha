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
    <section className="bg-white py-20 font-[Alexandria] lg:py-[139px]">
      <div className="mx-auto max-w-[1088px] px-5 lg:px-0">
        <div className="grid items-center gap-10 lg:grid-cols-[540px_440px] lg:gap-[108px]">
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="relative order-1 h-[360px] overflow-hidden rounded-[8px] sm:h-[420px] lg:col-start-1 lg:row-start-1 lg:h-[484px] lg:w-[540px]"
          >
            <Image
              src="/project.png"
              alt="أثر برامج جمعية التحالف للإغاثة والتنمية"
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
            className="order-2 text-right lg:col-start-2 lg:row-start-1"
          >
            <span className="mb-[27px] inline-flex flex-col items-start gap-[10px] text-[20px] font-bold leading-[29px] text-[#51c698]">
              الإغاثة والتنمية من أجل المجتمع
              <span className="h-[2px] w-[31px] bg-[#00406d]" />
            </span>
            <h2 className="text-[16px] font-normal leading-[24px] text-[#707070]">
              نعمل لدعم المجتمعات وتعزيز قدرتها على الصمود
            </h2>
            <p className="mt-[18px] text-[12px] leading-[30px] text-[#707070]">
              تلتزم جمعية التحالف للإغاثة والتنمية بتقديم استجابات إنسانية فعالة تسهم في التخفيف من آثار الأزمات وتعزيز قدرة المجتمعات على التعافي، عبر برامج صحية وتوعوية وإنسانية تستهدف تحسين الظروف المعيشية والوصول إلى الفئات الأكثر احتياجاً.
            </p>

            <div className="mt-[14px] space-y-[8px]">
              {points.map((point) => (
                <div key={point} className="flex items-center justify-start gap-[10px]">
                  <span className="h-[7px] w-[7px] flex-none rounded-full bg-[#51c698]" />
                  <span className="text-[11px] font-normal leading-[18px] text-[#00406d]">{point}</span>
                </div>
              ))}
            </div>

            <Link
              href="/projects"
              className="mt-[29px] inline-flex h-[48px] w-[168px] items-center justify-center rounded-[8px] bg-[#51c698] text-[10px] font-normal text-white transition hover:bg-[#45b287]"
            >
              شاهد مشاريعنا
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
