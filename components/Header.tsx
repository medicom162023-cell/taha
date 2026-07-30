'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'الرئيسية', href: '/' },
    { name: 'من نحن', href: '/about' },
    { name: 'المشاريع', href: '/projects' },
    { name: 'المركز الإعلامي', href: '/media' },
    { name: 'تواصل معنا', href: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm font-[Alexandria] w-full">
      <div className="container mx-auto px-4 md:px-12 py-3 flex items-center justify-between">
        
        {/* 1. الجانب الأيمن: الشعار الكامل المتكامل */}
        <Link href="/" className="flex items-center">
          <div className="w-[200px] md:w-[240px] h-12 relative">
            <Image
              src="/full-logo.svg"
              alt="جمعية التحالف للإغاثة والتنمية"
              fill
              className="object-contain object-right"
              priority
            />
          </div>
        </Link>

        {/* 2. الجانب الأوسط: روابط التنقل للشاشات الكبيرة */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-gray-700">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-[#51c698] transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* 3. الجانب الأيسر: زر تبرع الآن وزر القائمة للموبايل */}
        <div className="flex items-center gap-3">
          <Link
            href="/donate"
            className="hidden sm:inline-flex bg-[#51c698] hover:bg-[#45b287] text-white text-xs md:text-sm font-semibold px-5 py-2.5 rounded-lg transition-all shadow-sm"
          >
            تبرع الآن
          </Link>

          {/* زر قائمة الجوال */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden text-[#00406d] focus:outline-none p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* قائمة الجوال المنسدلة */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="flex flex-col px-6 py-5 space-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-[#51c698] font-medium text-base py-2 border-b border-gray-50 last:border-none text-right"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2 sm:hidden">
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="block w-full text-center bg-[#51c698] text-white font-semibold py-3 rounded-lg shadow-sm"
                >
                  تبرع الآن
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
