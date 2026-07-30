'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ProjectsSection() {
  const projects = [
    {
      id: 1,
      title: "مشروع توزيع السلال الغذائية الطارئة",
      category: "الأمن الغذائي",
      description: "توفير الدعم الغذائي العاجل للعائلات الأكثر احتياجاً في مناطق النزوح والتخفيف من معاناتهم اليومية.",
      image: "/hero-bg.jpg",
    },
    {
      id: 2,
      title: "دعم وتأهيل القطاع الصحي والمستشفيات",
      category: "القطاع الصحي",
      description: "توريد الأدوية والمستهلكات الطبية الضرورية لضمان استمرار تقديم الرعاية الصحية للمرضى والجرحى.",
      image: "/hero-bg.jpg",
    },
    {
      id: 3,
      title: "توفير المياه النظيفة وحفر الآبار",
      category: "مشاريع المياه",
      description: "إنشاء وتشغيل محطات تحلية وتوزيع المياه الصالحة للشرب على التجمعات السكانية المحرومة.",
      image: "/hero-bg.jpg",
    },
  ];

  return (
    <section className="py-20 bg-gray-50 font-[Alexandria]">
      <div className="container mx-auto px-6 md:px-12">
        
        {/* عنوان القسم */}
        <div className="text-center mb-16">
          <span className="text-[#51c698] font-semibold text-sm md:text-base block mb-2 tracking-wide">
            نشاطاتنا الميدانية
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#00406d]">
            مشاريع إنسانية تصنع الأثر
          </h2>
        </div>

        {/* شبكة المشاريع */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* صورة المشروع */}
              <div className="relative h-52 overflow-hidden">
                <div
                  className="absolute inset-0 bg-cover bg-center hover:scale-105 transition-transform duration-500"
                  style={{ backgroundImage: `url(${project.image})` }}
                />
                <span className="absolute top-4 right-4 bg-[#51c698] text-white text-xs font-medium px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>

              {/* محتوى البطاقة */}
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-[#00406d] mb-3">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                  {project.description}
                </p>
                <Link
                  href={`/projects`}
                  className="inline-flex items-center text-[#51c698] font-semibold hover:text-[#45b287] transition-colors"
                >
                  <span>اقرأ المزيد</span>
                  <span className="mr-2">←</span>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* زر عرض المزيد من المشاريع في الأسفل */}
        <div className="flex justify-center mt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/projects"
              className="inline-flex items-center justify-center bg-[#51c698] hover:bg-[#45b287] text-white text-base font-bold px-10 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              عرض المزيد من المشاريع
            </Link>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
