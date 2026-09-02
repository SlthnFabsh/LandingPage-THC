'use client';

import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import Counter from '@/components/Counter';

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section id="beranda" className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-brand-950 pt-36 sm:pt-44 pb-24">
      {/* Hero Video Background */}
      <div className="hero-video-wrapper">
        <video autoPlay loop muted playsInline className="hero-video opacity-85">
          <source src="/assets/video/hero2.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="hero-video-overlay"></div>
      </div>

      {/* Grid Cyber Decor Pattern Overlay */}
      <div className="absolute inset-0 hero-grid-pattern opacity-20 pointer-events-none z-[1]"></div>

      {/* Glowing Animated Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/30 rounded-full filter blur-[120px] pointer-events-none animate-pulse-glow z-[1]"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-[140px] pointer-events-none animate-pulse-glow z-[1]" style={{ animationDelay: '3s' }}></div>

      {/* Hero Content Layer */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="gap-2 w-auto h-10"></div>

        {/* Headline & Tagline */}
        <h1 className="text-5xl sm:text-7xl md:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6 fade-up delay-100">
          <span className="block text-white">#To The Next</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-cyan-200 to-white drop-shadow-md">
            Level !
          </span>
        </h1>

        {/* Subtitle Description */}
        <p className="max-w-4xl mx-auto text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed mb-10 px-2 fade-up delay-200">
          <span>{t('hero.subtitle')}</span>{' '}
          <strong className="text-white font-medium">Trans Hybrid Communication</strong>{' '}
          <span>{t('hero.subtitle2')}</span>
        </p>

        {/* Primary CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 fade-up delay-300">
          <a
            href="#faq"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-600 to-blue-600 hover:from-brand-500 hover:to-blue-500 text-white font-bold text-sm sm:text-base tracking-wide shadow-glow-blue-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
          >
            <span>{t('hero.cta')}</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Floating Hero Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="p-4 sm:p-6 rounded-2xl glass-card border border-white/15 text-center hover:border-white/40 transition-all hover:-translate-y-1 zoom-in-bounce delay-100">
            <Counter target={50} suffix="rb+" className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 tracking-tight" />
            <div className="text-xs sm:text-sm text-slate-300 font-medium">{t('stats.pelanggan')}</div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl glass-card border border-white/15 text-center hover:border-white/40 transition-all hover:-translate-y-1 zoom-in-bounce delay-200">
            <Counter target={100} suffix="+" className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 tracking-tight" />
            <div className="text-xs sm:text-sm text-slate-300 font-medium">{t('stats.perusahaan')}</div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl glass-card border border-white/15 text-center hover:border-white/40 transition-all hover:-translate-y-1 zoom-in-bounce delay-300">
            <Counter target={19} suffix="thn+" className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 tracking-tight" />
            <div className="text-xs sm:text-sm text-slate-300 font-medium">{t('stats.pengalaman')}</div>
          </div>

          <div className="p-4 sm:p-6 rounded-2xl glass-card border border-white/15 text-center hover:border-white/40 transition-all hover:-translate-y-1 zoom-in-bounce delay-400">
            <Counter target={1000} animTarget={1000} display="1000+" suffix="+" className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-1 tracking-tight" />
            <div className="text-xs sm:text-sm text-slate-300 font-medium">Pop Nodes</div>
          </div>
        </div>
      </div>
    </section>
  );
}