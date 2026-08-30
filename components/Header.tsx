'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleWheel(event: WheelEvent) {
      if (event.deltaY < 0) {
        setIsVisible(true);
      } else if (event.deltaY > 0 && window.scrollY >= 80 && !isOpen) {
        setIsVisible(false);
      }
    }

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const difference = currentScrollY - lastScrollY.current;

      if (currentScrollY < 80 || isOpen) {
        setIsVisible(true);
      } else if (difference > 2) {
        setIsVisible(false);
      } else if (difference < -2) {
        setIsVisible(true);
      }

      lastScrollY.current = currentScrollY;
    }

    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/about' },
    { name: 'المشاريع', href: '/projects' },
    { name: 'المركز الإعلامي', href: '/media' },
    { name: 'التسجيل للمساعدات', href: '/assistance-registration' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <>
      <header
      className={`fixed inset-x-0 top-0 z-50 w-full border-b border-[#edf2f4] bg-white font-[Alexandria] shadow-sm transition-transform duration-300 ease-out ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="mx-auto flex h-[68px] w-full max-w-[1366px] items-center justify-between gap-3 px-4 sm:h-[78px] sm:px-5 md:px-10 lg:px-[84px]">
        <Link href="/" className="flex shrink-0 items-center" aria-label="الصفحة الرئيسية">
          <div className="relative h-[42px] w-[158px] sm:h-[48px] sm:w-[190px] md:w-[220px]">
            <Image
              src="/full-logo.svg"
              alt="جمعية التحالف للإغاثة والتنمية"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-[14px] font-medium text-[#25364a] lg:flex">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors hover:text-[#45bd91] ${index === 0 ? 'text-[#45bd91]' : ''}`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/donate"
            className="hidden min-w-[112px] items-center justify-center rounded-[7px] bg-[#45bd91] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm transition duration-300 hover:bg-[#00406d] hover:shadow-lg sm:inline-flex"
          >
            تبرع الآن
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="فتح القائمة"
            aria-expanded={isOpen}
            className="rounded-lg p-2 text-[#00406d] transition-colors hover:bg-gray-100 focus:outline-none lg:hidden"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-gray-100 bg-white shadow-xl lg:hidden"
          >
            <div className="flex flex-col px-6 py-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="border-b border-gray-50 py-3 text-right text-base font-medium text-gray-700 transition-colors last:border-none hover:text-[#45bd91]"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 sm:hidden">
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-lg bg-[#45bd91] py-3 text-center font-semibold text-white shadow-sm transition duration-300 hover:bg-[#00406d] hover:shadow-lg"
                >
                  تبرع الآن
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </header>
      <div aria-hidden="true" className="h-[68px] w-full shrink-0 sm:h-[78px]" />
    </>
  );
}

// Unified dark hover for primary calls to action.
