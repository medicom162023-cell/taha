'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function DonationBanner() {
  return (
    <section className="py-6 bg-white font-[Alexandria] flex justify-center">
      <div className="w-full max-w-[1366px] px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden shadow-lg flex flex-col md:flex-row items-center justify-between px-8 md:px-16 lg:px-24 py-12"
          style={{ 
            backgroundImage: `url('/DonationBanner.png')`,
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            minHeight: '280px',
          }}
        >
          {/* العنصر الأول (يمين الصفحة في RTL): النصوص والعنوان */}
          <div className="text-right z-10 max-w-xl mb-6 md:mb-0">
            <h2 
              className="md:text-[36px] font-bold leading-[35px] mb-3"
              style={{ color: '#51C698' }} // تم تطبيق اللون المستخرج من فجما
            >
              تبرعك يصنع فرقاً حقيقياً
            </h2>
            <p className="text-white/90 text-sm md:text-base leading-relaxed">
              بدعمك نستطيع الاستجابة للاحتياجات الإنسانية وتقديم المساعدة للأسر الأكثر احتياجاً في قطاع غزة.
            </p>
          </div>

          {/* العنصر الثاني (يسار الصفحة في RTL): زر التبرع */}
          <div className="z-10 flex-shrink-0">
            <Link
              href="/donate"
              className="inline-flex items-center justify-center bg-[#51c698] hover:bg-[#45b287] text-white font-bold text-base px-10 py-3.5 rounded-xl transition-all shadow-md hover:scale-105"
            >
              تبرع الآن
            </Link>
          </div>

        </motion.div>
      </div>
    </section>
  );
}
