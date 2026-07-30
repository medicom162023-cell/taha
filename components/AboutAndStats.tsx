'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function AboutAndStats() {
  const stats = [
    { id: 1, number: "+15000", label: "مستفيد", icon: "👥" },
    { id: 2, number: "50", label: "متطوع", icon: "🤝" },
    { id: 3, number: "+13", label: "عاماً من العطاء", icon: "⭐" },
    { id: 4, number: "20", label: "جهة شريكة", icon: "🏛️" },
  ];

  return (
    <section className="py-20 bg-white font-[Alexandria]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* قسم من نحن */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-20">
          
          {/* الصورة الصحيحة (نبتة الأمل) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative h-[350px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg">
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('/about-img.jpg')` }}
              />
            </div>
          </motion.div>

          {/* النصوص */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="w-full lg:w-1/2 text-right"
          >
            <span className="text-[#51c698] font-bold text-sm tracking-wide block mb-2">
              من نحن
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-[#00406d] mb-4">
              إغاثة . تمكين . تنمية
            </h3>
            <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
              جمعية التحالف للإغاثة والتنمية هي مؤسسة إنسانية مستقلة تعمل في قطاع غزة، وتسعى إلى تعزيز كرامة الإنسان عبر برامج إغاثية وتنموية قائمة على تقييم الاحتياجات الفعلية. تؤمن أن العمل الإنساني لا يقتصر على الاستجابة العاجلة، بل يمتد لبناء حلول مستدامة تسهم في تمكين المجتمعات وتهيئة بيئة أكثر استقراراً وأملاً للمستقبل.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center bg-[#51c698] hover:bg-[#45b287] text-white text-sm font-medium px-6 py-3 rounded-lg transition-all shadow-sm"
            >
              <span>تعرف علينا أكثر</span>
            </Link>
          </motion.div>

        </div>

        {/* بطاقات العدادات تحت قسم من نحن مباشرة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center"
            >
              <div className="text-3xl mb-3 text-[#51c698] bg-[#51c698]/10 w-14 h-14 rounded-full flex items-center justify-center">
                {stat.icon}
              </div>
              <span className="text-3xl md:text-4xl font-bold text-[#00406d] mb-2 tracking-tight">
                {stat.number}
              </span>
              <span className="text-gray-500 text-sm font-medium">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
