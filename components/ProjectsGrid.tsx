'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { AardContentItem } from '@/lib/wordpress';

const PROJECTS_PER_STEP = 6;

export default function ProjectsGrid({ projects }: { projects: AardContentItem[] }) {
  const [visibleCount, setVisibleCount] = useState(PROJECTS_PER_STEP);
  const visibleProjects = projects.slice(0, visibleCount);
  const hasMore = visibleCount < projects.length;

  return (
    <>
      <div className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3">
        {visibleProjects.map((project) => (
          <article
            key={project.id}
            className="overflow-hidden rounded-2xl border border-[#e9f1ee] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            {project.featured_image ? (
              <img
                src={project.featured_image}
                alt={project.title}
                className="h-52 w-full object-cover"
                loading="lazy"
              />
            ) : null}
            <div className="p-6">
              <h2 className="mb-3 line-clamp-2 text-lg font-bold leading-8 text-[#00406d]">
                {project.title}
              </h2>
              <p className="mb-5 line-clamp-3 text-sm leading-7 text-slate-600">{project.excerpt}</p>
              <Link
                href={`/projects/${project.slug}`}
                className="text-sm font-bold text-[#45bd91] transition hover:text-[#00406d]"
              >
                تفاصيل المشروع ←
              </Link>
            </div>
          </article>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => Math.min(count + PROJECTS_PER_STEP, projects.length))}
            className="inline-flex min-h-12 items-center justify-center rounded-lg bg-[#51c698] px-8 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#45b287] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00406d]"
          >
            تصفح باقي المشاريع
          </button>
        </div>
      ) : null}
    </>
  );
}
