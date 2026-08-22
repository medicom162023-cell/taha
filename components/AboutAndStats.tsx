'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const stats = [
  { number: 15000, prefix: '+', label: 'مستفيد', icon: 'users' },
  { number: 50, prefix: '', label: 'مشروع منجز', icon: 'projects' },
  { number: 13, prefix: '', label: 'سنة من العطاء', icon: 'years' },
  { number: 20, prefix: '', label: 'جهة شريكة', icon: 'partners' },
];

function AnimatedNumber({ value, prefix = '' }: { value: number; prefix?: string }) {
  const [count, setCount] = useState(0);
  const numberRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = numberRef.current;
    if (!element) return;

    let animationFrame = 0;
    let hasAnimated = false;
    const duration = value >= 1000 ? 1800 : 1200;

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || hasAnimated) return;
      hasAnimated = true;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setCount(value);
        observer.disconnect();
        return;
      }

      const startTime = performance.now();
      const animate = (currentTime: number) => {
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);
        setCount(Math.round(value * easedProgress));

        if (progress < 1) animationFrame = requestAnimationFrame(animate);
        else observer.disconnect();
      };

      animationFrame = requestAnimationFrame(animate);
    }, { threshold: 0.45 });

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <div ref={numberRef} className="text-[32px] font-normal leading-[39px] text-[#00406d]" dir="ltr">
      {prefix}{count}
    </div>
  );
}

function StatIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    projects: <><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h5M8 16h3"/></>,
    years: <><path d="M3 12l4-4 4 4 5-6 5 5"/><path d="M4 19h16"/></>,
    partners: <><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/><path d="M12 15v2"/></>,
  };

  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
      {paths[type]}
    </svg>
  );
}

export default function AboutAndStats() {
  return (
    <section id="about" className="bg-[#f5f5f5] py-16 font-[Alexandria] lg:py-24">
      <div className="mx-auto max-w-[1200px] px-5 xl:px-0">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_520px] lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="order-2 text-right lg:order-1"
          >
            <span className="mb-7 inline-flex flex-col items-end gap-[10px] text-[22px] font-bold leading-[32px] text-[#51c698] lg:text-[24px]">
              من نحن
              <span className="h-[2px] w-[31px] bg-[#00406d]" />
            </span>
            <h2 className="mb-5 text-[26px] font-bold leading-[1.5] text-[#00406d] lg:text-[30px]">
              إغاثة. تمكين. تنمية
            </h2>
            <p className="max-w-[616px] text-[16px] leading-[2.1] text-[#707070] lg:text-[17px]">
              جمعية التحالف للإغاثة والتنمية هي مؤسسة إنسانية مستقلة تعمل في قطاع غزة، وتسعى إلى تعزيز كرامة الإنسان عبر برامج إغاثية وتنموية قائمة على تقييم الاحتياجات الفعلية. نؤمن أن العمل الإنساني لا يقتصر على الاستجابة الطارئة، بل يمتد لبناء حلول مستدامة تسهم في تمكين الأفراد والمجتمعات، وتهيئ بيئة أكثر استقرارًا وأملًا للمستقبل.
            </p>
            <Link href="/about" className="mt-6 inline-flex h-[52px] w-[184px] items-center justify-center rounded-[8px] bg-[#51c698] text-[15px] font-medium text-white transition hover:bg-[#45b287]">
              تعرف علينا أكثر
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="order-1 lg:order-2"
          >
            <div className="relative h-[340px] w-full overflow-hidden rounded-[8px] sm:h-[400px] lg:h-[410px] lg:w-[520px]">
              <Image src="/about-img.jpg" alt="أنشطة جمعية التحالف للإغاثة والتنمية" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 lg:mt-24 lg:grid-cols-4 lg:gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="h-[220px] rounded-[4px] border border-[#dedede] bg-white px-4 pt-10 text-center lg:h-[260px] lg:pt-[49px]"
            >
              <div className="mx-auto mb-[11px] flex h-[64px] w-[64px] items-center justify-center rounded-[8px] bg-[#effaf6] text-[#51c698] lg:h-[76px] lg:w-[76px]">
                <StatIcon type={stat.icon} />
              </div>
              <AnimatedNumber value={stat.number} prefix={stat.prefix} />
              <div className="mt-[1px] text-[14px] font-normal leading-[20px] text-[#00406d]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
