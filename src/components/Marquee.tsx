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

const MOVE_STEP = 1.2; // px per frame selama auto-scroll
const SPEED = 1000 / 60; // target ~60fps interval ms

export default function Marquee({
  titleKey,
  descKey,
  direction,
  logos,
  inverseCards = false,
}: MarqueeProps) {
  const { t } = useLanguage();

  // Duplikasi konten 4x agar punya ruang geser manual luas sekaligus seamless saat auto-scroll.
  const loop = [...logos, ...logos, ...logos, ...logos];

  const [offset, setOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const halfWidthRef = useRef(0);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);

  // Ukur setengah lebar (lebar satu set penuh "logos" = loop/4) setelah muat & saat logo berubah.
  useEffect(() => {
    const el = trackRef.current;
    if (!el || logos.length === 0) return;
    const measure = () => {
      // setengah total = lebar 2x logos (dari total 4x logos)
      halfWidthRef.current = el.scrollWidth / 2;
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [logos.length]);

  // Auto-scroll: jalan hanya saat tidak drag; loop seamless modulo setengah lebar.
  useEffect(() => {
    if (isDragging || logos.length === 0 || halfWidthRef.current === 0) return;
    const id = setInterval(() => {
      setOffset((prev) => {
        const next = direction === 'left' ? prev - MOVE_STEP : prev + MOVE_STEP;
        const half = halfWidthRef.current;
        // Keep in [-half, 0] for left, or [0, half] range handling.
        const max = half;
        const min = -half;
        if (next > max) return next - (max - min);
        if (next < min) return next + (max - min);
        return next;
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
      setOffset(dragStartOffset.current + delta);
    },
    [isDragging]
  );

  const handlePointerUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const cardCls = `w-48 h-20 px-5 py-3 rounded-2xl border border-slate-200/80 ${
    inverseCards
      ? 'bg-white hover:shadow-md hover:border-brand-300'
      : 'bg-slate-50/50 hover:bg-white hover:shadow-md hover:border-brand-300'
  } transition-all flex items-center justify-center shrink-0`;

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
          className="flex items-center gap-8 sm:gap-12"
          style={{ width: 'max-content', transform: `translateX(${offset}px)` }}
        >
          {loop.map((logo, i) => (
            <motion.div key={i} whileHover={{ y: -4, scale: 1.03 }} className={cardCls}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logo.file}
                alt={logo.alt}
                draggable={false}
                className="max-h-12 w-auto object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
