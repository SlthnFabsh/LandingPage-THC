'use client';

import { motion, type MotionProps } from 'framer-motion';
import { ShieldCheck, Eye, Target, Building2 } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import type { AboutContentData } from '@/lib/content';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
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
  const lisensiTitle = lang === 'id' ? 'Lisensi & Legalitas Resmi' : 'Official Licenses & Legality';
  const tentangTitle = lang === 'id' ? 'Tentang Kami' : 'About Us';

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header - Persada Inspired */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Building2 className="h-5 w-5" />
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
              {tentangTitle}
            </h2>
          </div>

          <div className="mt-6 space-y-4 text-[15px] leading-[1.85] text-slate-600 sm:text-[16px] sm:leading-[1.85]">
            <p className="font-medium text-slate-800">{intro}</p>
          </div>
        </motion.div>

        {/* Lisensi Resmi */}
        <div className="mt-10 sm:mt-14">
          <motion.div {...reveal(0.1)} className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold tracking-tight text-blue-900 sm:text-2xl">
                {lisensiTitle}
              </h3>
              <p className="text-xs text-slate-500 sm:text-sm">
                Izin penyelenggaraan telekomunikasi nasional dari Kementerian Kominfo RI
              </p>
            </div>
          </motion.div>

          <motion.ul
            {...reveal(0.15)}
            className="mt-6 divide-y divide-slate-100 overflow-hidden rounded-2xl border border-slate-200/80 bg-slate-50/40 shadow-sm"
          >
            {licenses.map((license, index) => (
              <li
                key={license}
                className="flex items-center gap-4 px-5 py-4 transition-colors hover:bg-brand-50/60 sm:px-6"
              >
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-xs font-bold text-white shadow-sm">
                  {index + 1}
                </span>
                <span className="text-[14px] font-semibold text-slate-800 sm:text-[15px]">
                  {license}
                </span>
              </li>
            ))}
          </motion.ul>
        </div>

        {/* Visi & Misi */}
        <div className="mt-12 grid items-stretch gap-6 sm:mt-16 lg:grid-cols-2">
          {/* Visi */}
          <motion.article
            {...reveal(0.2)}
            className="flex flex-col rounded-2xl border border-slate-200/80 bg-gradient-to-b from-brand-50/60 to-white p-6 shadow-sm sm:p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow-blue">
              <Eye className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-xl font-bold tracking-tight text-blue-900 sm:text-2xl">
              {visiTitle}
            </h3>
            <p className="mt-3.5 flex-1 text-[14px] leading-[1.85] text-slate-600 sm:text-[15px]">
              {visi}
            </p>
          </motion.article>

          {/* Misi */}
          <motion.article
            {...reveal(0.25)}
            className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow-blue">
              <Target className="h-5 w-5" />
            </span>
            <h3 className="mt-5 text-xl font-bold tracking-tight text-blue-900 sm:text-2xl">
              {misiTitle}
            </h3>
            <ul className="mt-4 space-y-3.5">
              {misi.map((item, index) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-600/10 text-xs font-bold text-brand-700">
                    {index + 1}
                  </span>
                  <p className="text-[13.5px] leading-relaxed text-slate-600 sm:text-[14px]">
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </motion.article>
        </div>
      </div>
    </div>
  );
}