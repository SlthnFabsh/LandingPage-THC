'use client';

import { motion, type MotionProps } from 'framer-motion';
import { ShieldCheck, Eye, Target } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import { translations } from '@/lib/i18n';

function reveal(delay = 0): MotionProps {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
  };
}

export default function CompanyProfile() {
  const { lang, t } = useLanguage();
  const about = translations[lang].about;

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
            {about.intro}
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
            {about.lisensi}
          </motion.h2>

          <motion.ul
            {...reveal(0.1)}
            className="mt-8 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft"
          >
            {about.licenses.map((license, index) => (
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
            <h3 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-blue-900 sm:text-[28px]">{about.visiTitle}</h3>
            <p className="mt-4 text-[15px] leading-[1.9] text-slate-600 sm:text-base">{about.visi}</p>
          </motion.article>

          <motion.article
            {...reveal(0.1)}
            className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-soft sm:p-10"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-glow-blue">
              <Target className="h-6 w-6" />
            </span>
            <h3 className="mt-6 text-2xl font-bold tracking-[-0.02em] text-blue-900 sm:text-[28px]">{about.misiTitle}</h3>
            <ul className="mt-5 space-y-5">
              {about.misi.map((misi, index) => (
                <li key={misi} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-sm font-bold text-brand-700">
                    {index + 1}
                  </span>
                  <p className="text-[15px] leading-[1.75] text-slate-600">{misi}</p>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
