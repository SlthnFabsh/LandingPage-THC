'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import NoiseOverlay from '@/components/NoiseOverlay';
import { useLanguage } from '@/components/LanguageProvider';

export default function InformasiHero() {
  const { t } = useLanguage();

  return (
    <section className="relative flex min-h-[62vh] items-center justify-center overflow-hidden rounded-b-[32px] bg-brand-950 sm:min-h-[68vh] lg:rounded-b-[44px]">
      {/* Background video (brand hero) + dark overlay */}
      <div className="hero-video-wrapper">
        <video autoPlay loop muted playsInline className="hero-video opacity-75">
          <source src="/assets/video/hero2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-950/70 via-brand-950/60 to-brand-950/85"></div>
      </div>

      <NoiseOverlay />

      {/* Decorative glows */}
      <div className="pointer-events-none absolute -left-24 top-1/3 z-0 h-72 w-72 rounded-full bg-[#0256eb]/25 blur-[110px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 bottom-1/4 z-0 h-80 w-80 rounded-full bg-[#63a9ff]/15 blur-[130px]" aria-hidden="true" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 py-28 text-center sm:px-6 sm:py-32 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center justify-center gap-2 text-[13px] font-medium text-blue-100/70 sm:text-sm"
        >
          <Link href="/" className="transition-colors hover:text-white">
            {t('about.breadcrumbHome')}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-blue-100/40" />
          <span>{t('nav.tentang')}</span>
          <ChevronRight className="h-3.5 w-3.5 text-blue-100/40" />
          <span className="text-white">{t('nav.informasi')}</span>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[clamp(2.25rem,6vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.02em] text-white">
            {t('nav.informasi')}
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mx-auto mt-7 h-px w-24 bg-gradient-to-r from-transparent via-[#63a9ff]/80 to-transparent"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
