'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useHomepageContent } from '@/components/HomepageContentProvider';

export default function HeroSlider() {
  const { hero } = useHomepageContent();
  const slides = hero.slides;
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % Math.max(slides.length, 1));
  }, [slides.length]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (!document.hidden) nextSlide();
    }, 8000);
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
      transition: { x: { duration: 0.45, ease: 'easeOut' }, opacity: { duration: 0.35 } },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: { x: { duration: 0.45, ease: 'easeIn' }, opacity: { duration: 0.35 } },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (!slides.length) return null;
  const slide = slides[current] || slides[0];

  return (
    <section className="relative w-full bg-[#003358] font-[Alexandria]">
      <div className="relative mx-auto flex h-[440px] w-full max-w-[1366px] items-center justify-center overflow-hidden text-center min-[390px]:h-[470px] sm:h-[540px] md:h-[590px] lg:h-[612px]">
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 flex h-full w-full items-center justify-center overflow-hidden px-5 text-center sm:px-8 md:px-16"
          >
            <div className="absolute inset-0 z-0 h-full w-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={current === 0}
                sizes="100vw"
                className="object-cover object-center"
              />
            </div>

            <div
              className="pointer-events-none absolute inset-0 z-10"
              style={{
                background:
                  'linear-gradient(110deg, rgba(48,174,137,0.70) 0%, rgba(4,95,119,0.72) 43%, rgba(0,52,91,0.82) 100%)',
              }}
            />

            <div className="absolute bottom-5 left-1/2 z-30 flex -translate-x-1/2 flex-row items-center gap-[7px] sm:bottom-auto sm:left-[7%] sm:top-1/2 sm:-translate-x-0 sm:-translate-y-1/2 sm:flex-col">
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
              className="relative z-20 flex w-full max-w-[760px] flex-col items-center pb-7 sm:pb-0"
            >
              <motion.div variants={itemVariants} className="mb-4">
                <span className="inline-block rounded-[6px] border border-white/40 bg-white/15 px-4 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm md:text-xs">
                  {slide.badge}
                </span>
              </motion.div>

              <motion.h1
                variants={itemVariants}
                className="mb-3 text-[24px] font-bold leading-[1.45] text-white min-[390px]:text-[27px] md:mb-4 md:text-[34px] lg:text-[38px]"
              >
                {slide.title}
              </motion.h1>

              <motion.p
                variants={itemVariants}
                className="mb-5 max-w-[690px] text-[12px] leading-6 text-white/95 sm:leading-7 md:mb-6 md:text-[13px] lg:text-[14px]"
              >
                {slide.description}
              </motion.p>

              <motion.div variants={itemVariants}>
                <Link
                  href={hero.buttonHref}
                  className="inline-flex min-w-[142px] items-center justify-center rounded-[7px] bg-[#45bd91] px-6 py-3 text-[13px] font-semibold text-white shadow-md transition-all hover:-translate-y-0.5 hover:bg-[#37aa80]"
                >
                  {hero.buttonLabel}
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
