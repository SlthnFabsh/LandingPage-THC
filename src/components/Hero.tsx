'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import TextSplit from '@/components/TextSplit';
import NoiseOverlay from '@/components/NoiseOverlay';
import Parallax from '@/components/Parallax';
import Magnetic from '@/components/Magnetic';
import { useLanguage } from '@/components/LanguageProvider';
import type { HeroSlideData } from '@/lib/content';

interface HeroProps {
  slides: HeroSlideData[];
}

function pick(slide: HeroSlideData, lang: 'id' | 'en') {
  return {
    title: lang === 'id' ? slide.titleId : slide.titleEn,
    subtitle: lang === 'id' ? slide.subtitleId : slide.subtitleEn,
    ctaLabel: lang === 'id' ? slide.ctaLabelId : slide.ctaLabelEn,
    ctaHref: slide.ctaHref,
  };
}

function SlideHero({ slides }: { slides: HeroSlideData[] }) {
  const { lang } = useLanguage();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [slides.length, paused]);

  const current = slides[index] || slides[0];
  if (!current) return null;
  const c = pick(current, lang);
  const go = (dir: 1 | -1) => {
    setIndex((prev) => (prev + dir + slides.length) % slides.length);
  };

  return (
    <section
      id="beranda"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-950"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={current.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={current.image} alt="" className="h-full w-full object-cover opacity-85" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/80 via-brand-950/50 to-brand-950/70" />
        </motion.div>
      </AnimatePresence>

      <NoiseOverlay />

      <AnimatePresence mode="wait">
        <motion.div
          key={`${current.id}-${lang}`}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 w-full max-w-7xl px-4 text-center text-white sm:px-6 lg:px-8"
        >
          <TextSplit
            as="h1"
            text={c.title}
            className="text-[clamp(2.1rem,8vw,6.75rem)] font-bold leading-[1.02] tracking-[-0.025em]"
            stagger={0.035}
            delay={0.1}
          />

          {c.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
              className="mx-auto mt-7 max-w-3xl text-[clamp(1.125rem,2.6vw,1.5rem)] font-normal leading-[1.5] text-white/90 sm:mt-8"
            >
              {c.subtitle}
            </motion.p>
          )}

          {c.ctaLabel && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mt-8 sm:mt-9"
            >
              <Magnetic>
                <motion.a
                  href={c.ctaHref || '#layanan'}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 rounded-full bg-[#1263a0] px-7 py-3 text-[15px] font-semibold text-white shadow-xl shadow-black/20"
                >
                  {c.ctaLabel} <ArrowUpRight className="h-4 w-4" />
                </motion.a>
              </Magnetic>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {slides.length > 1 && (
        <>
          <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2">
            {slides.map((slide, i) => (
              <button
                key={slide.id}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === index ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>
          <div className="absolute bottom-8 right-6 z-20 flex items-center gap-2 sm:right-10">
            <button
              onClick={() => go(-1)}
              aria-label="Slide sebelumnya"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => go(1)}
              aria-label="Slide berikutnya"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm transition hover:bg-white/25"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </>
      )}
    </section>
  );
}

function StaticHero() {
  return (
    <section id="beranda" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-950">
      {/* Hero Video Background */}
      <div className="hero-video-wrapper">
        <video autoPlay loop muted playsInline className="hero-video opacity-85">
          <source src="/assets/video/hero2.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="hero-video-overlay"></div>
      </div>

      {/* Noise texture */}
      <NoiseOverlay />

      {/* Decorative parallax blob */}
      <Parallax amount={50} delay={0.1} className="pointer-events-none absolute -left-20 top-1/4 z-0 h-80 w-80 rounded-full bg-[#0256eb]/25 blur-[100px]" />
      <Parallax amount={40} delay={0.2} className="pointer-events-none absolute -right-24 bottom-1/4 z-0 h-96 w-96 rounded-full bg-[#63a9ff]/15 blur-[120px]" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <TextSplit
          as="h1"
          text="#To The Next Level !"
          className="text-[clamp(2.1rem,8vw,6.75rem)] font-bold leading-[1.02] tracking-[-0.025em]"
          stagger={0.035}
          delay={0.1}
        />

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }} className="mt-7 text-[clamp(1.125rem,2.6vw,1.5rem)] font-normal leading-[1.5] text-white/90 sm:mt-8">
          Your Connection, Our Commitment.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }} className="mt-8 sm:mt-9">
          <Magnetic>
            <motion.a href="#layanan" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-3 rounded-full bg-[#1263a0] px-7 py-3 text-[15px] font-semibold text-white shadow-xl shadow-black/20">
              Mulai Terhubung <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}

export default function Hero({ slides }: HeroProps) {
  if (slides.length > 0) return <SlideHero slides={slides} />;
  return <StaticHero />;
}