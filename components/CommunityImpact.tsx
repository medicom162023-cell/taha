'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CommunityImpact() {
  const points = [
    "الاستجابة للاحتياجات الإنسانية الطارئة",
    "تعزيز الوعي الصحي والمجتمعي",
    "دعم المبادرات التنموية المحلية"
  ];

  return (
    <section className="py-20 bg-white font-[Alexandria]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row-reverse items-center justify-between gap-12">
          
          {/* الصورة في الجهة اليمنى */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative h-[350px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/project.png')` }}
              />
            </div>
          </motion.div>

          {/* النصوص والعناصر في الجهة اليسرى */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 text-right"
          >
            <span className="text-[#51c698] font-bold text-sm tracking-wide block mb-2">
              الإغاثة والتنمية من أجل المجتمع
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-[#00406d] mb-4">
              نعمل لدعم المجتمعات وتعزيز قدرتها على الصمود
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              تلتزم جمعية التحالف للإغاثة والتنمية بتقديم استجابات إنسانية فعالة تسهم في التخفيف من آثار الأزمات الإنسانية وتعزيز قدرة المجتمعات على التعافي. ومن خلال برامج الإغاثة والتنمية، تعمل الجمعية على دعم الفئات الأكثر احتياجاً عبر تنفيذ مبادرات صحية وتوعوية وإنسانية تستهدف تحسين الظروف المعيشية وتعزيز الوعي المجتمعي.
            </p>

            {/* قائمة النقاط بمحاذاة متطابقة مع التصميم */}
            <div className="space-y-3 mb-8 inline-flex flex-col items-start">
              {points.map((point, index) => (
                <div key={index} className="flex items-center gap-3 flex-row-reverse w-full">
                  <span className="text-gray-700 text-sm md:text-base font-medium text-right">{point}</span>
                  <div className="w-2 h-2 rounded-sm bg-[#00406d] flex-shrink-0" />
                </div>
              ))}
            </div>

            <div>
              <Link
                href="/projects"
                className="inline-flex items-center bg-[#51c698] hover:bg-[#45b287] text-white text-sm font-semibold px-8 py-3.5 rounded-xl transition-all shadow-md hover:scale-105"
              >
                <span>شاهد مشاركينا</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
