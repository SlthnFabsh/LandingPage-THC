'use client';

import { Building2, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <motion.footer initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1 }} className="border-t-4 border-brand-600 bg-[#07152b] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col gap-6 border-b border-white/10 pb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[#63a9ff]">
              <span className="h-2 w-2 rounded-full bg-[#e83b42]" />
              Trans Hybrid Communication
            </div>
            <h2 className="max-w-xl text-3xl font-bold leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl">
              {t('cta.subtitle')}
            </h2>
          </div>
          <a href="#faq" className="group inline-flex w-fit items-center gap-3 rounded-full bg-[#1263a0] px-6 py-3 text-[15px] font-semibold text-white transition hover:bg-[#197dbd]">
            <span>{t('nav.hubungi')}</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 gap-12 border-b border-white/10 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_0.7fr_0.7fr_1.4fr] lg:gap-10">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-5 flip-up delay-100">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/logo1.png" alt="PT Trans Hybrid Communication Logo" className="h-14 w-auto object-contain brightness-0 invert" />
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-slate-400">{t('footer.desc')}</p>
          </div>

          {/* Col 2: Layanan */}
          <div className="flip-up delay-200">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white">{t('footer.services')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#layanan" className="transition-colors hover:text-[#63a9ff]">{t('services.internet')}</a></li>
              <li><a href="#layanan" className="transition-colors hover:text-[#63a9ff]">{t('services.konektivitas')}</a></li>
              <li><a href="#layanan" className="transition-colors hover:text-[#63a9ff]">{t('services.solusi')}</a></li>
              <li><a href="#layanan" className="transition-colors hover:text-[#63a9ff]">{t('services.data')}</a></li>
            </ul>
          </div>

          {/* Col 3: Perusahaan */}
          <div className="flip-up delay-300">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white">{t('footer.company')}</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><a href="#tentang" className="transition-colors hover:text-[#63a9ff]">{t('footer.about')}</a></li>
              <li><a href="#jaringan" className="transition-colors hover:text-[#63a9ff]">{t('nav.jaringan')}</a></li>
              <li><a href="#berita" className="transition-colors hover:text-[#63a9ff]">{t('nav.berita')}</a></li>
              <li><a href="#faq" className="transition-colors hover:text-[#63a9ff]">{t('nav.faq')}</a></li>
            </ul>
          </div>

          {/* Col 4: Kontak Kami */}
          <div className="flip-up delay-400">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.16em] text-white">{t('footer.contact')}</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-2.5">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#63a9ff]" />
                <span className="text-slate-400">
                  <strong>Office:</strong> <span>{t('footer.office')}</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#63a9ff]" />
                <span className="text-slate-400">
                  <strong>Operational:</strong> <span>{t('footer.op')}</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-[#63a9ff]" />
                <a href="tel:08111222808" className="text-slate-400 transition-colors hover:text-white">0811-1222-808</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-[#e83b42]" />
                <a href="mailto:info@transhybrid.net.id" className="font-medium text-slate-400 underline transition-colors hover:text-white">
                  info@transhybrid.net.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright Bar */}
        <div className="flex flex-col items-center justify-between gap-5 pt-8 text-center sm:flex-row sm:text-left">
          <div className="flex flex-col items-center gap-3 zoom-in-bounce delay-200">
            <h5 className="text-xs font-semibold uppercase tracking-[0.16em] text-white">Our Social Media</h5>
            <div className="flex items-center gap-4">
              {/* X (Twitter) */}
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-all hover:scale-110 hover:bg-[#0256eb] hover:text-white" title="X" aria-label="X">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-all hover:scale-110 hover:bg-[#0256eb] hover:text-white" title="Facebook" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-all hover:scale-110 hover:bg-[#0256eb] hover:text-white" title="YouTube" aria-label="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-all hover:scale-110 hover:bg-[#0256eb] hover:text-white" title="LinkedIn" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="space-y-1 fade-up delay-300">
            <p className="text-xs font-semibold text-slate-300 sm:text-sm">{t('footer.copyright')}</p>
            <p className="text-xs text-slate-500">{t('footer.tagline')}</p>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}