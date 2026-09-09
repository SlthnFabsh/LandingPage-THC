'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useLanguage } from '@/components/LanguageProvider';
import { motion } from 'framer-motion';

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

const COPIES = 8; // jumlah duplikasi set — semakin banyak, semakin luas area geser manual
const MOVE_STEP = 1.2; // px per frame selama auto-scroll
const SPEED = 1000 / 60; // target ~60fps interval ms

// Batasi offset ke rentang [-period, 0] dengan wrap (modulo) agar selalu seamless.
// period = lebar persis SATU set penuh (konten identik berulang).
function wrap(value: number, period: number): number {
  if (period <= 0) return 0;
  let v = value % period;
  if (v > 0) v -= period; // hasil selalu di [-period, 0]
  return v;
}

function LogoCard({
  logo,
  inverseCards,
  cardCls,
}: {
  logo: MarqueeLogo;
  inverseCards: boolean;
  cardCls: string;
}) {
  return (
    <motion.div whileHover={{ y: -4, scale: 1.03 }} className={cardCls}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logo.file}
        alt={logo.alt}
        draggable={false}
        className="max-h-12 w-auto object-contain"
      />
    </motion.div>
  );
}

export default function Marquee({
  titleKey,
  descKey,
  direction,
  logos,
  inverseCards = false,
}: MarqueeProps) {
  const { t } = useLanguage();

  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const periodRef = useRef(0);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  const cardCls = `w-48 h-20 px-5 py-3 rounded-2xl border border-slate-200/80 ${
    inverseCards
      ? 'bg-white hover:shadow-md hover:border-brand-300'
      : 'bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-brand-300'
  } transition-all flex items-center justify-center shrink-0`;

  // Ukur lebar persis satu set penuh: total scrollWidth / jumlah kopi.
  // Gap dibuat via margin kanan pada tiap kartu (bukan gap kontainer) agar pengukuran presisi.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || logos.length === 0) return;
    const measure = () => {
      periodRef.current = el.scrollWidth / COPIES;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [logos.length]);

  // Auto-scroll: jalan hanya saat tidak drag; loop seamless modulo satu set.
  useEffect(() => {
    if (isDragging || logos.length === 0 || periodRef.current === 0) return;
    const id = setInterval(() => {
      setOffset((prev) => {
        const next = direction === 'left' ? prev - MOVE_STEP : prev + MOVE_STEP;
        return wrap(next, periodRef.current);
      });
    }, SPEED);
    return () => clearInterval(id);
  }, [isDragging, direction, logos.length]);

  const handlePointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (logos.length === 0) return;
      setIsDragging(true);
      dragStartX.current = e.clientX;
      dragStartOffset.current = offset;
      (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    },
    [logos.length, offset]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging) return;
      const delta = e.clientX - dragStartX.current;
      setOffset(wrap(dragStartOffset.current + delta, periodRef.current));
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  return (
    <section
      className={`${
        inverseCards ? 'bg-slate-50 border-b border-slate-200/60' : 'bg-white border-y border-slate-100'
      } py-20 overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 text-center fade-up">
        <h2 className="mb-3 text-[clamp(2.25rem,5vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-blue-900">
          {t(titleKey)}
        </h2>
        <p className="text-sm sm:text-base font-normal text-slate-600">{t(descKey)}</p>
      </div>

      <div
        className={`marquee-mask relative overflow-hidden py-4 select-none ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{ width: 'max-content', transform: `translateX(${offset}px)` }}
        >
          {Array.from({ length: COPIES }).map((_, c) => (
            <div key={c} className="flex shrink-0">
              {logos.map((logo, i) => (
                <div key={i} className="shrink-0 pr-8 sm:pr-12">
                  <LogoCard logo={logo} inverseCards={inverseCards} cardCls={cardCls} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
