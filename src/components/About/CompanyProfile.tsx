'use client';

import { motion, type MotionProps } from 'framer-motion';
import { ShieldCheck, Eye, Target } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import type { AboutContentData } from '@/lib/content';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

interface CompanyProfileProps {
  about: AboutContentData;
}

export default function CompanyProfile({ about }: CompanyProfileProps) {
  const { lang } = useLanguage();
  const intro = lang === 'id' ? about.introId : about.introEn;
  const visi = lang === 'id' ? about.visiId : about.visiEn;
  const misi = lang === 'id' ? about.misiId : about.misiEn;
  const licenses = lang === 'id' ? about.licensesId : about.licensesEn;
  const visiTitle = lang === 'id' ? 'Visi' : 'Vision';
  const misiTitle = lang === 'id' ? 'Misi' : 'Mission';
  const lisensiTitle = lang === 'id' ? 'Lisensi' : 'Licenses';

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Intro */}
        <motion.div {...reveal()} className="mx-auto max-w-3xl">
          <div className="mb-5 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-600">
            <span className="h-2 w-2 rounded-full bg-[#e83b42]" />
            PT Trans Hybrid Communication
          </div>
          <p className="text-center text-[15px] leading-[1.95] text-slate-600 sm:text-lg sm:leading-[1.9]">
            {intro}
          </p>
        </motion.div>

        {/* Lisensi */}
        <div className="mt-16 md:mt-24">
          <motion.h2
            {...reveal()}
            className="flex items-center gap-4 text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold tracking-[-0.02em] text-blue-900"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow-blue">
              <ShieldCheck className="h-5 w-5" />
            </span>
            {lisensiTitle}
          </motion.h2>

          <motion.ul
            {...reveal(0.1)}
            className="mt-8 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft"
          >
            {licenses.map((license, index) => (
              <li key={license} className="flex items-center gap-4 px-5 py-5 transition-colors hover:bg-brand-50/50 sm:gap-6 sm:px-8">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-600 font-bold text-white">
                  {index + 1}
                </span>
                <span className="text-[15px] font-medium text-slate-800 sm:text-base">{license}</span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visi & Misi */}
        <div className="mt-16 grid items-stretch gap-6 md:mt-24 lg:grid-cols-2 lg:gap-8">
          <motion.article
            {...reveal()}
            className="rounded-3xl border border-slate-200/80 bg-gradient-to-b from-brand-50/80 to-white p-8 shadow-soft sm:p-10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow-blue">
              <Eye className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-blue-900 sm:text-[28px]">{visiTitle}</h3>
            <p className="mt-4 text-[15px] leading-[1.9] text-slate-600 sm:text-base">{visi}</p>
          </motion.article>

          <motion.article
            {...reveal(0.1)}
            className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-soft sm:p-10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow-blue">
              <Target className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-blue-900 sm:text-[28px]">{misiTitle}</h3>
            <ul className="mt-5 space-y-5">
              {misi.map((item, index) => (
                <li key={item} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-sm font-bold text-brand-700">
                    {index + 1}
                  </span>
                  <p className="text-[15px] leading-[1.75] text-slate-600">{item}</p>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}