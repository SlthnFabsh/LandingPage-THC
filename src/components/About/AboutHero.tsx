'use client';

import { motion } from 'framer-motion';
import { ChevronRight, Home, Shield, Radio, Sparkles } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/NoiseOverlay';
import { useLanguage } from '@/components/LanguageProvider';

interface AboutHeroProps {
  breadcrumb: string;
  title: string;
  subtitle?: string;
  category?: string;
}

export default function AboutHero({
  breadcrumb,
  title,
  subtitle,
  category,
}: AboutHeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden rounded-b-[24px] border-b border-blue-900/40 bg-[#070c1e] sm:rounded-b-[32px] lg:rounded-b-[40px]">
      {/* Dynamic Telecom Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070c1e] via-[#091538] to-[#04112e]" />

      {/* Abstract Fiber Optic & Circuit Curves */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-20"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="fiberGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0256eb" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#e83b42" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="fiberGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#0256eb" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M -100 180 C 300 40, 700 280, 1400 90 C 1800 -30, 2100 120, 2400 60"
          fill="none"
          stroke="url(#fiberGrad1)"
          strokeWidth="1.5"
        />
        <path
          d="M -100 240 C 400 120, 850 320, 1500 140 C 1900 20, 2200 180, 2500 100"
          fill="none"
          stroke="url(#fiberGrad2)"
          strokeWidth="1"
          strokeDasharray="4 6"
        />
      </svg>

      {/* Grid Pattern */}
      <div className="hero-grid-pattern absolute inset-0 opacity-25" aria-hidden="true" />

      {/* Ambient Glows */}
      <div
        className="pointer-events-none absolute -left-20 top-1/4 z-0 h-72 w-72 rounded-full bg-[#0256eb]/30 blur-[100px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-20 bottom-0 z-0 h-80 w-80 rounded-full bg-[#38bdf8]/15 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute left-1/2 top-0 z-0 h-40 w-96 -translate-x-1/2 rounded-full bg-[#e83b42]/10 blur-[90px]"
        aria-hidden="true"
      />

      <NoiseOverlay />

      {/* Main Content Area */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-32 pb-12 sm:px-6 sm:pt-36 sm:pb-14 lg:px-8 lg:pt-40 lg:pb-16">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          {/* Left Column: Breadcrumb + Title + Subtitle */}
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <motion.nav
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              aria-label="Breadcrumb"
              className="mb-4 flex flex-wrap items-center gap-2 text-xs font-medium tracking-wide text-slate-300 sm:text-[13px]"
            >
              <Link
                href="/"
                className="flex items-center gap-1.5 text-slate-300 transition-colors hover:text-white"
              >
                <Home className="h-3.5 w-3.5 text-blue-400" />
                <span>{t('about.breadcrumbHome')}</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-slate-300">{category || t('nav.tentang')}</span>
              <ChevronRight className="h-3.5 w-3.5 text-slate-500" />
              <span className="font-semibold text-sky-400">{breadcrumb}</span>
            </motion.nav>

            {/* Page Title */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl font-extrabold tracking-[-0.02em] text-white sm:text-4xl lg:text-[44px] lg:leading-[1.15]"
            >
              {title}
            </motion.h1>

            {/* Accent Line (THC Signature Color Pill) */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '4rem' }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-3.5 h-1 rounded-full bg-gradient-to-r from-[#0256eb] via-[#38bdf8] to-[#e83b42]"
              aria-hidden="true"
            />

            {/* Subtitle Description */}
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-300 sm:text-[15px]"
              >
                {subtitle}
              </motion.p>
            )}
          </div>

          {/* Right Column: Corporate Micro-Badge / Telecom Identity */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-3.5 backdrop-blur-md lg:flex"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600/20 text-sky-400 border border-sky-400/30 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
              <Radio className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  PT Trans Hybrid Communication
                </span>
                <span className="inline-flex items-center rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
                  Est. 2006
                </span>
              </div>
              <p className="text-[12px] text-slate-400">
                NAP • ISP • Closed & International Fiber Network
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
