'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const projects = [
  {
    title: 'مشروع توزيع السلال الغذائية الطارئة',
    category: 'الأمن الغذائي',
    description: 'توفير الدعم الغذائي العاجل للعائلات الأكثر احتياجاً في مناطق النزوح والتخفيف من معاناتهم اليومية.',
    image: '/hero-bg.jpg',
  },
  {
    title: 'دعم وتأهيل القطاع الصحي والمستشفيات',
    category: 'القطاع الصحي',
    description: 'توريد الأدوية والمستهلكات الطبية الضرورية لضمان استمرار تقديم الرعاية الصحية للمرضى والجرحى.',
    image: '/hero-bg2.jpg',
  },
  {
    title: 'توفير المياه النظيفة ودعم المجتمعات',
    category: 'المياه والإصحاح',
    description: 'تدخلات ميدانية لتحسين الوصول إلى المياه الآمنة ودعم التجمعات السكانية الأكثر تضرراً.',
    image: '/project.png',
  },
  {
    title: 'تعزيز قدرات المؤسسات والمجتمعات المحلية',
    category: 'التنمية المجتمعية',
    description: 'برامج تنموية تعزز قدرات المؤسسات المحلية وتدعم المبادرات المجتمعية الأكثر احتياجاً.',
    image: '/alliance-ghadaq-capacity.jpg',
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#f5f5f5] py-20 font-[Alexandria] lg:py-[139px]">
      <div className="mx-auto max-w-[1088px] px-5 lg:px-0">
        <div className="mb-[50px] text-center">
          <span className="mb-[10px] block text-[20px] font-bold leading-[29px] text-[#51c698]">نشاطاتنا الميدانية</span>
          <h2 className="text-[20px] font-bold leading-[30px] text-[#00406d]">مشاريع إنسانية تصنع الأثر</h2>
          <p className="mx-auto mt-[12px] max-w-[620px] text-[12px] leading-[24px] text-[#707070]">
              نطوّر تدخلات تستجيب للاحتياجات الأكثر إلحاحاً وتربط الاستجابة الطارئة بفرص التعافي والتنمية المستدامة.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group h-[360px] overflow-hidden rounded-[8px] border border-[#dedede] bg-white transition hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,64,109,0.08)]"
            >
              <div className="relative h-[170px] overflow-hidden">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 260px" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>

              <div className="px-[18px] py-[20px] text-right">
                <span className="mb-[8px] block text-[10px] font-normal text-[#51c698]">{project.category}</span>
                <h3 className="min-h-[48px] text-[14px] font-bold leading-[22px] text-[#00406d]">
                  {project.title}
                </h3>
                <p className="mt-[8px] line-clamp-3 min-h-[54px] text-[11px] leading-[18px] text-[#707070]">{project.description}</p>
                <Link href="/projects" className="mt-[12px] inline-flex items-center gap-[6px] text-[10px] font-normal text-[#51c698]">
                  اقرأ المزيد <span aria-hidden>←</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-[48px] flex justify-center">
          <Link href="/projects" className="inline-flex h-[48px] w-[168px] items-center justify-center rounded-[8px] bg-[#51c698] text-[10px] font-normal text-white transition hover:bg-[#45b287]">
            عرض كافة المشاريع
          </Link>
        </div>
      </div>
    </section>
  );
}
