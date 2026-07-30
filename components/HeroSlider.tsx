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
  }
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 8000);

    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleDotClick = (index: number) => {
    if (index === current) return;
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const slideVariants: Variants = {
    hidden: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
    }),
    visible: {
      x: '0%',
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 25 },
        opacity: { duration: 0.5 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 220, damping: 25 },
        opacity: { duration: 0.5 },
      },
    }),
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
    },
  },
};

  return (
    <section className="relative w-full bg-[#003358] font-[Alexandria]">
      <div 
        className="
          relative 
          mx-auto 
          w-full 
          max-w-[1920px] 
          overflow-hidden 
          flex 
          flex-col 
          items-center 
          justify-center 
          text-center 
          h-[430px] 
          sm:h-[480px] 
          md:h-[520px] 
          lg:h-[560px] 
          xl:h-[620px]
        "
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 w-full h-full flex flex-col items-center justify-center text-center px-6 md:px-16 overflow-hidden"
          >
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: 1.08 }}
              transition={{ duration: 8, ease: "easeOut" }}
              className="absolute inset-0 w-full h-full z-0"
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
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(135deg, rgba(81, 198, 152, 0.75) 0%, rgba(0, 64, 109, 0.75) 52%)'
              }}
            />

            <div className="absolute left-6 md:left-12 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`transition-all ${
                    current === index 
                      ? 'w-2.5 h-2.5 bg-[#51c698] ring-2 ring-white/50 shadow-md' 
                      : 'w-2 h-2 bg-white/60 hover:bg-white'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="z-20 max-w-3xl flex flex-col items-center"
            >
              <motion.div variants={itemVariants} className="mb-2">
                <span className="inline-block bg-white/20 backdrop-blur-md text-white text-xs md:text-sm font-semibold px-4 py-1 rounded-lg border border-white/30">
                  {slides[current].badge}
                </span>
              </motion.div>

              <motion.h1 variants={itemVariants} className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 leading-tight">
                {slides[current].title}
              </motion.h1>

              <motion.p variants={itemVariants} className="text-white/95 text-xs md:text-sm leading-relaxed mb-4 max-w-2xl">
                {slides[current].description}
              </motion.p>

              <motion.div variants= {itemVariants}>
                <Link
                  href="/donate"
                  className="inline-flex items-center justify-center bg-[#51c698] hover:bg-[#45b287] text-white font-bold text-sm px-6 py-2.5 rounded-xl transition-all shadow-md hover:scale-105"
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
