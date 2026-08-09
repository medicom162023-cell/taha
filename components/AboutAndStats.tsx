'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { number: '+15000', label: 'مستفيد', icon: 'users' },
  { number: '50', label: 'متطوع', icon: 'heart' },
  { number: '+13', label: 'عاماً من العطاء', icon: 'star' },
  { number: '20', label: 'جهة شريكة', icon: 'partners' },
];

function StatIcon({ type }: { type: string }) {
  const paths: Record<string, React.ReactNode> = {
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    heart: <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>,
    star: <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
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
    <section id="about" className="bg-white py-20 font-[Alexandria] md:py-24">
      <div className="mx-auto max-w-[1180px] px-5 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="order-2 text-right lg:order-1"
          >
            <span className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-[#51c698]">
              <span className="h-px w-8 bg-[#51c698]" />
              من نحن
            </span>
            <h2 className="mb-5 text-3xl font-extrabold leading-[1.45] text-[#003f6b] md:text-[38px]">
              إغاثة وتمكين وتنمية<br />من أجل أثر مستدام
            </h2>
            <p className="max-w-xl text-sm leading-8 text-[#667085] md:text-[15px]">
              جمعية التحالف للإغاثة والتنمية مؤسسة أهلية غير ربحية تعمل في مجالات الإغاثة والتنمية وتطوير السلوك الصحي في المجتمع، وتسعى إلى تحويل التحديات إلى فرص حقيقية تعزز كرامة الإنسان وتدعم قدرته على بناء مستقبل أفضل.
            </p>
            <Link href="/about" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#51c698] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#45b287]">
              تعرف علينا أكثر
              <span aria-hidden>←</span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="order-1 lg:order-2"
          >
            <div className="relative h-[330px] overflow-hidden rounded-[22px] md:h-[430px]">
              <Image src="/about-img.jpg" alt="أنشطة جمعية التحالف للإغاثة والتنمية" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#003f6b]/20 to-transparent" />
              <div className="absolute bottom-5 right-5 rounded-xl bg-white/95 px-5 py-4 shadow-lg backdrop-blur">
                <p className="text-xs font-semibold text-[#51c698]">من قلب المجتمع</p>
                <p className="mt-1 text-sm font-bold text-[#003f6b]">نصنع الأمل بخطوات مستدامة</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-14 grid grid-cols-2 gap-3 md:mt-16 md:grid-cols-4 md:gap-5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group rounded-2xl border border-[#e8eef2] bg-white px-4 py-6 text-center transition hover:-translate-y-1 hover:border-[#51c698]/35 hover:shadow-lg md:px-5 md:py-7"
            >
              <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-[#51c698]/10 text-[#51c698] transition group-hover:bg-[#51c698] group-hover:text-white">
                <StatIcon type={stat.icon} />
              </div>
              <div className="text-2xl font-extrabold text-[#003f6b] md:text-3xl">{stat.number}</div>
              <div className="mt-1 text-xs font-medium text-[#7b8794] md:text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
