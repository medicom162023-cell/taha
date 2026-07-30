'use client';

import { useState, useEffect } from 'react';

export default function StatsSection() {
  const stats = [
    { id: 1, target: 15000, prefix: "+", label: "مستفيد من الخدمات الإنسانية" },
    { id: 2, target: 120, prefix: "+", label: "مشروع تنموي وإغاثي منفذ" },
    { id: 3, target: 45, prefix: "+", label: "شراكة مجتمعية ودولية" },
    { id: 4, target: 10, prefix: "+", label: "سنوات من العطاء المستدام" },
  ];

  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // مدة العد بالميلي ثانية (2 ثانية)
    const steps = 60;
    const intervalTime = duration / steps;

    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setCounts(
        stats.map((stat) => {
          const progress = currentStep / steps;
          const currentVal = Math.floor(stat.target * progress);
          return currentVal > stat.target ? stat.target : currentVal;
        })
      );

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative bg-[#00406d] text-white py-12 shadow-inner font-[Alexandria] z-30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x sm:divide-x-reverse divide-white/10">
          {stats.map((stat, index) => (
            <div key={stat.id} className="flex flex-col items-center justify-center pt-4 sm:pt-0">
              <span className="text-3xl md:text-4xl font-bold text-[#51c698] mb-2 tracking-wide">
                {stat.prefix}{counts[index].toLocaleString()}
              </span>
              <span className="text-sm md:text-base font-light text-gray-200">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
