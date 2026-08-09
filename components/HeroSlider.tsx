'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const slides = [
  {
    id: 1,
    image: '/hero-bg.jpg',
    badge: 'استجابة إنسانية فاعلة اليوم .. وكرامة مستدامة الغد',
    title: 'من أجل نصرة الإنسان وبناء المستقبل',
    description: 'نعمل على تمكين المجتمعات الأكثر احتياجاً عبر تدخلات إنسانية وتنمية مستدامة ترتكز على الكرامة، والعدالة، والاستجابة الفاعلة للاحتياجات الحقيقية.',
  },
  {
    id: 2,
    image: '/hero-bg2.jpg',
    badge: 'رعاية صحية وتكافل مجتمعي مستدام',
    title: 'شركاء في العطاء لصناعة الأمل',
    description: 'نبذل الجهود الحثيثة لتوفير الاحتياجات الأساسية ودعم الأسر المتعففة والفئات الهشة في مختلف المناطق.',
  },
  {
    id: 3,
    image: '/about-img.jpg',
    badge: 'تنمية مجتمعية وتمكين مستدام',
    title: 'نصنع الأثر ونبني جسور المحبة',
    description: 'نسعى جاهدين لإحداث تغيير إيجابي ومستدام في حياة الأفراد، عبر مشاريع تنموية وإغاثية شاملة ومتكاملة.',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleDotClick = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slideVariants: Variants = {
    hidden: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
    visible: {
      x: '0%',
      opacity: 1,
      transition: { x: { type: 'spring', stiffness: 220, damping: 25 }, opacity: { duration: 0.5 } },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { x: { type: 'spring', stiffness: 220, damping: 25 }, opacity: { duration: 0.5 } },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.16, delayChildren: 0.2 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
  };

  return (
    <section className="relative w-full bg-[#003358] font-[Alexandria]">
      <div className="relative mx-auto flex h-[500px] w-full max-w-[1366px] items-center justify-center overflow-hidden text-center sm:h-[540px] md:h-[590px] lg:h-[612px]">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden px-6 text-center md:px-16"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.06 }}
              transition={{ duration: 8, ease: 'easeOut' }}
              className="absolute inset-0 z-0 h-full w-full"
            >
              <Image
                src={slides[current].image}
                alt={slides[current].title}
                fill
                priority={current === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </motion.div>

            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  'linear-gradient(110deg, rgba(48,174,137,0.70) 0%, rgba(4,95,119,0.72) 43%, rgba(0,52,91,0.82) 100%)',
              }}
            />

            <div className="absolute left-[7%] top-1/2 z-30 flex -translate-y-1/2 flex-col items-center gap-[7px]">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`border border-white/70 transition-all ${
                    current === index ? 'h-[11px] w-[11px] bg-[#51c698]' : 'h-[8px] w-[8px] bg-white/45 hover:bg-white'
                  }`}
                  aria-label={`الانتقال إلى الشريحة ${index + 1}`}
                />
              ))}
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="relative z-20 flex max-w-[760px] flex-col items-center"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <span className="inline-block rounded-[6px] border border-white/40 bg-white/15 px-4 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm md:text-xs">
                  {slides[current].badge}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mb-4 text-[27px] font-bold leading-[1.35] text-white md:text-[34px] lg:text-[38px]"
              >
                {slides[current].title}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mb-6 max-w-[690px] text-[12px] leading-7 text-white/95 md:text-[13px] lg:text-[14px]"
              >
                {slides[current].description}
              </motion.p>

              <motion.div variants={itemVariants}>
                <Link
                  href="/donate"
                  className="inline-flex min-w-[142px] items-center justify-center rounded-[7px] bg-[#45bd91] px-6 py-3 text-[13px] font-semibold text-white shadow-md transition-all hover:bg-[#37aa80] hover:-translate-y-0.5"
                >
                  تبرع وساهم معنا
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
