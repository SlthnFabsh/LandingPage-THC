'use client';

import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import NoiseOverlay from '@/components/NoiseOverlay';
import Magnetic from '@/components/Magnetic';

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section className="cta-animated-gradient py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title */}
        <div className="text-center mb-10 fade-down">
          <div className="flex items-center justify-center mb-6">
            <div className="cta-logo-sweep-wrapper">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/logo1.png"
                alt="Trans Hybrid Communication"
                className="cta-logo-sweep h-24 sm:h-32 md:h-36 w-auto object-contain"
              />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 tracking-tight">{t('cta.title')}</h2>
        </div>

        {/* Main CTA Card */}
        <div className="zoom-in-bounce delay-200 relative rounded-3xl overflow-hidden shadow-2xl min-h-[280px] flex items-stretch">
          {/* Background */}
          <div className="absolute inset-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/images/sutet-network.jpg" alt="Jaringan Infrastruktur THC" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-900/95 via-brand-800/80 to-brand-700/40"></div>
            <NoiseOverlay />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full px-10 py-12 gap-8">
            <div className="flex-1 text-white fade-left delay-300">
              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3 leading-tight">{t('cta.subtitle')}</h3>
              <p className="text-base text-blue-100 leading-relaxed max-w-xl font-normal">{t('cta.desc')}</p>
            </div>

            <div className="shrink-0 fade-right delay-400">
              <Magnetic>
                <motion.a
                  href="#faq"
                  whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(99, 169, 255, 0.55)' }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-brand-700 font-extrabold text-base transition-all shadow-xl shadow-brand-900/30 group"
                >
                  <span>{t('nav.hubungi')}</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>
              </Magnetic>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}