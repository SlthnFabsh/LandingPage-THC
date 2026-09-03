'use client';

import { useLanguage } from '@/components/LanguageProvider';

export interface MarqueeLogo {
  file: string;
  alt: string;
}

interface MarqueeProps {
  titleKey: string;
  descKey: string;
  direction: 'left' | 'right';
  logos: MarqueeLogo[];
  inverseCards?: boolean;
}

export default function Marquee({ titleKey, descKey, direction, logos, inverseCards = false }: MarqueeProps) {
  const { t } = useLanguage();
  const loop = [...logos, ...logos];

  const cardCls = `w-48 h-20 px-5 py-3 rounded-2xl border border-slate-200/80 ${
    inverseCards ? 'bg-white hover:shadow-md hover:border-brand-300' : 'bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-brand-300'
  } transition-all flex items-center justify-center shrink-0`;

  return (
    <section
      className={`${
        inverseCards ? 'bg-slate-50 border-b border-slate-200/60' : 'bg-white border-y border-slate-100'
      } py-20 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center fade-up">
        <h2 className="text-5xl sm:text-6xl md:text-7xl font-black uppercase tracking-[-0.06em] text-blue-900 leading-none mb-3">
          {t(titleKey)}
        </h2>
        <p className="text-sm sm:text-base text-black font-normal">{t(descKey)}</p>
      </div>

      <div className="marquee-container marquee-mask relative overflow-hidden py-4">
        <div
          className={
            direction === 'left'
              ? 'animate-marquee-left flex items-center gap-8 sm:gap-12'
              : 'animate-marquee-right flex items-center gap-8 sm:gap-12'
          }
        >
          {loop.map((logo, i) => (
            <div key={i} className={cardCls}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logo.file} alt={logo.alt} className="max-h-12 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}