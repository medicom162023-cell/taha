'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useHomepageContent } from '@/components/HomepageContentProvider';

export default function ProjectsSection() {
  const { projects } = useHomepageContent();
  return (
    <section id="projects" className="bg-[#f5f5f5] py-14 font-[Alexandria] sm:py-20 lg:py-[139px]">
      <div className="mx-auto max-w-[1200px] px-5 xl:px-0">
        <div className="mb-9 text-center sm:mb-[50px]">
          <span className="mb-[10px] block text-[20px] font-bold leading-[29px] text-[#51c698]">{projects.eyebrow}</span>
          <h2 className="text-[20px] font-bold leading-[30px] text-[#00406d]">{projects.title}</h2>
          <p className="mx-auto mt-[12px] max-w-[620px] text-[12px] leading-[24px] text-[#707070]">
              {projects.description}
            </p>
        </div>

        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {projects.items.map((project, index) => (
            <motion.article
              key={project.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              className="group min-h-[400px] overflow-hidden rounded-[8px] border border-[#dedede] bg-white transition hover:-translate-y-1 hover:shadow-[0_10px_24px_rgba(0,64,109,0.08)]"
            >
              <div className="relative h-[190px] overflow-hidden">
                <Image src={project.image} alt={project.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 288px" className="object-cover transition duration-500 group-hover:scale-105" />
              </div>

              <div className="px-[18px] py-[20px] text-right">
                <span className="mb-[8px] block text-[10px] font-normal text-[#51c698]">{project.category}</span>
                <h3 className="min-h-[52px] text-[15px] font-bold leading-[24px] text-[#00406d]">
                  {project.title}
                </h3>
                <p className="mt-[8px] line-clamp-3 min-h-[60px] text-[12px] leading-[20px] text-[#707070]">{project.description}</p>
                <Link href="/projects" className="mt-[14px] inline-flex items-center gap-[6px] text-[11px] font-normal text-[#51c698]">
                  اقرأ المزيد <span aria-hidden>←</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-[48px] flex justify-center">
          <Link href={projects.buttonHref} className="inline-flex h-[48px] w-[168px] items-center justify-center rounded-[8px] bg-[#51c698] text-[14px] font-bold text-white shadow-sm transition hover:bg-[#45b287]">
            {projects.buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
