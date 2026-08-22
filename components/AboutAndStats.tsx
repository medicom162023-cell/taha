'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const stats = [
  { number: '+15000', label: 'مستفيد', icon: 'users' },
  { number: '50', label: 'مشروع منجز', icon: 'projects' },
  { number: '13', label: 'سنة من العطاء', icon: 'years' },
  { number: '20', label: 'جهة شريكة', icon: 'partners' },
];

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
    <section id="about" className="bg-[#f5f5f5] py-20 font-[Alexandria] lg:py-[139px]">
      <div className="mx-auto max-w-[1088px] px-5 lg:px-0">
        <div className="grid items-start gap-10 lg:grid-cols-[536px_444px] lg:gap-[108px]">
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.55 }}
            className="order-2 text-right lg:order-1 lg:pt-[37px]"
          >
            <span className="mb-[31px] inline-flex flex-col items-end gap-[10px] text-[20px] font-bold leading-[29px] text-[#51c698]">
              من نحن
              <span className="h-[2px] w-[31px] bg-[#00406d]" />
            </span>
            <h2 className="mb-[17px] text-[20px] font-bold leading-[30px] text-[#00406d]">
              إغاثة. تمكين. تنمية
            </h2>
            <p className="max-w-[536px] text-[12px] leading-[30px] text-[#707070]">
              جمعية التحالف للإغاثة والتنمية هي مؤسسة إنسانية مستقلة تعمل في قطاع غزة، وتسعى إلى تعزيز كرامة الإنسان عبر برامج إغاثية وتنموية قائمة على تقييم الاحتياجات الفعلية. نؤمن أن العمل الإنساني لا يقتصر على الاستجابة الطارئة، بل يمتد لبناء حلول مستدامة تسهم في تمكين الأفراد والمجتمعات، وتهيئ بيئة أكثر استقرارًا وأملًا للمستقبل.
            </p>
            <Link href="/about" className="mt-[17px] inline-flex h-[48px] w-[168px] items-center justify-center rounded-[8px] bg-[#51c698] text-[12px] font-normal text-white transition hover:bg-[#45b287]">
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
            <div className="relative h-[330px] overflow-hidden rounded-[8px] lg:h-[350px] lg:w-[444px]">
              <Image src="/about-img.jpg" alt="أنشطة جمعية التحالف للإغاثة والتنمية" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-4 lg:mt-[139px] lg:grid-cols-4 lg:gap-4">
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
              <div className="text-[32px] font-normal leading-[39px] text-[#00406d]" dir="ltr">{stat.number}</div>
              <div className="mt-[1px] text-[14px] font-normal leading-[20px] text-[#00406d]">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
