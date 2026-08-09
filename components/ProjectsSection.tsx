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
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="bg-[#f7faf9] py-20 font-[Alexandria] md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="mb-11 flex flex-col items-start justify-between gap-5 md:flex-row md:items-end">
          <div className="text-right">
            <span className="mb-2 block text-sm font-bold text-[#51c698]">نشاطاتنا الميدانية</span>
            <h2 className="text-3xl font-extrabold leading-tight text-[#003f6b] md:text-[38px]">مشاريع إنسانية تصنع الأثر</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-[#74808d] md:text-[15px]">
              نطوّر تدخلات تستجيب للاحتياجات الأكثر إلحاحاً وتربط الاستجابة الطارئة بفرص التعافي والتنمية المستدامة.
            </p>
          </div>
          <Link href="/projects" className="hidden items-center gap-2 text-sm font-bold text-[#51c698] transition hover:text-[#3aa77d] md:inline-flex">
            عرض جميع المشاريع <span aria-hidden>←</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group overflow-hidden rounded-[18px] border border-[#e9efec] bg-white shadow-[0_8px_30px_rgba(15,55,70,0.06)] transition hover:-translate-y-1.5 hover:shadow-[0_14px_38px_rgba(15,55,70,0.12)]"
            >
              <div className="relative h-[220px] overflow-hidden">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#003f6b]/45 via-transparent to-transparent" />
                <span className="absolute right-4 top-4 rounded-full bg-[#51c698] px-3.5 py-1.5 text-[11px] font-bold text-white shadow-sm">
                  {project.category}
                </span>
              </div>

              <div className="p-6 text-right">
                <h3 className="min-h-[56px] text-lg font-extrabold leading-7 text-[#003f6b] transition group-hover:text-[#51c698]">
                  {project.title}
                </h3>
                <p className="mt-3 min-h-[72px] text-sm leading-7 text-[#74808d]">{project.description}</p>
                <Link href="/projects" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#51c698]">
                  اقرأ المزيد <span aria-hidden>←</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-9 flex justify-center md:hidden">
          <Link href="/projects" className="inline-flex items-center justify-center rounded-lg bg-[#51c698] px-7 py-3 text-sm font-bold text-white">
            عرض جميع المشاريع
          </Link>
        </div>
      </div>
    </section>
  );
}
