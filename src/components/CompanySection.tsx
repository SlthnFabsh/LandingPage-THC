'use client';

import { useLanguage } from '@/components/LanguageProvider';
import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import TextSplit from '@/components/TextSplit';
import type { CompanyContentData, CompanyStatData } from '@/lib/content';

function Stat({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const element = useRef<HTMLDivElement>(null);
  const inView = useInView(element, { once: true, amount: 0.2 });
  const [count, setCount] = useState(0);
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1600;
    let frame = 0;
    const tick = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 4))));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setBounce(true);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value]);

  return (
    <motion.div ref={element} initial={{ opacity: 0, scale: 0.55 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 1.1, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }} className="max-w-[280px]">
      <motion.div
        animate={bounce ? { scale: [1, 1.14, 1] } : undefined}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="text-[1.75rem] font-bold tabular-nums leading-none tracking-[-0.02em] text-white md:text-[2.1rem] xl:text-[2.75rem]"
      >
        {count}
        {suffix}
      </motion.div>
      <div className="mt-1.5 text-xs font-normal leading-snug text-white/80 md:text-sm xl:text-[15px]">{label}</div>
    </motion.div>
  );
}

interface CompanySectionProps {
  company: CompanyContentData;
  stats: CompanyStatData[];
}

export default function CompanySection({ company, stats }: CompanySectionProps) {
  const { lang } = useLanguage();

  const title = lang === 'id' ? company.titleId : company.titleEn;
  const p1 = lang === 'id' ? company.p1Id : company.p1En;
  const p2 = lang === 'id' ? company.p2Id : company.p2En;
  const image = company.homeImage || '/assets/images/borneo.webp';

  return (
    <section id="tentang" className="overflow-hidden bg-[#f5f5f3]">
      <div className="mx-auto max-w-[1600px] px-0 lg:px-4">
        <div className="grid min-h-[100vh] min-w-0 items-center lg:grid-cols-[1.25fr_0.75fr]">
          <div className="min-w-0 px-6 py-12 sm:px-8 md:px-10 lg:pl-16 lg:pr-8 xl:pl-20 xl:pr-10">

            <div className="min-w-0 max-w-[620px]">
              <TextSplit
                key={title}
                as="h2"
                text={title}
                className="text-[clamp(2.5rem,6.5vw,5.25rem)] font-bold leading-[1.04] tracking-[-0.02em] text-blue-900"
                stagger={0.03}
              />

              <div className="mt-7 max-w-[600px] space-y-5 text-base leading-[1.75] text-slate-600 sm:text-lg md:text-[1.125rem]">
                <p className="company-fade-up delay-200">{p1}</p>

                <p className="company-fade-up delay-300">{p2}</p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-full border border-slate-700 bg-white px-6 py-2.5 text-[15px] font-medium text-slate-600 transition hover:bg-blue-900 hover:text-white">
                  {lang === 'id' ? '– Tentang Kami' : '– About Us'}
                </button>
                <button className="rounded-full border border-slate-700 bg-white px-6 py-2.5 text-[15px] font-medium text-slate-600 transition hover:bg-blue-900 hover:text-white">
                  {lang === 'id' ? '– Perjalanan Kami' : '– Our Journey'}
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[72vh] min-h-[420px] w-[94%] overflow-hidden justify-self-end lg:h-[78vh] lg:min-h-[620px] lg:w-[96%] lg:translate-x-[-1.5rem]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: 'right center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" aria-hidden="true" />

            <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-center gap-5 py-8 pl-6 pr-5 md:gap-6 md:py-12 md:pl-10 md:pr-8 lg:pl-12 lg:pr-8 xl:pl-14">
              {stats.map((stat, index) => (
                <Stat
                  key={stat.id}
                  value={stat.value}
                  suffix={stat.suffix}
                  label={lang === 'id' ? stat.labelId : stat.labelEn}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}