'use client';

import { Building2, MapPin, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-200 text-slate-700 border-t border-slate-300/70 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-300/80">
          {/* Col 1: Brand & Logo */}
          <div className="space-y-4 flip-up delay-100">
            <div className="flex items-center gap-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/logo1.png" alt="PT Trans Hybrid Communication Logo" className="h-12 w-auto object-contain" />
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{t('footer.desc')}</p>
          </div>

          {/* Col 2: Layanan */}
          <div className="flip-up delay-200">
            <h4 className="font-extrabold text-slate-900 text-base mb-4 tracking-wide">{t('footer.services')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#layanan" className="hover:text-brand-600 transition-colors">{t('services.internet')}</a></li>
              <li><a href="#layanan" className="hover:text-brand-600 transition-colors">{t('services.konektivitas')}</a></li>
              <li><a href="#layanan" className="hover:text-brand-600 transition-colors">{t('services.solusi')}</a></li>
              <li><a href="#layanan" className="hover:text-brand-600 transition-colors">{t('services.data')}</a></li>
            </ul>
          </div>

          {/* Col 3: Perusahaan */}
          <div className="flip-up delay-300">
            <h4 className="font-extrabold text-slate-900 text-base mb-4 tracking-wide">{t('footer.company')}</h4>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#layanan" className="hover:text-brand-600 transition-colors">{t('footer.about')}</a></li>
            </ul>
          </div>

          {/* Col 4: Kontak Kami */}
          <div className="flip-up delay-400">
            <h4 className="font-extrabold text-slate-900 text-base mb-4 tracking-wide">{t('footer.contact')}</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Building2 className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-slate-600">
                  <strong>Office:</strong> <span>{t('footer.office')}</span>
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
                <span className="text-slate-600">
                  <strong>Operational:</strong> <span>{t('footer.op')}</span>
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-600 shrink-0" />
                <a href="tel:08111222808" className="hover:text-brand-600 transition-colors">0811-1222-808</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-600 shrink-0" />
                <a href="mailto:info@transhybrid.net.id" className="hover:text-brand-600 transition-colors underline font-medium">
                  info@transhybrid.net.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright Bar */}
        <div className="pt-10 flex flex-col items-center justify-center text-center gap-5">
          <div className="flex flex-col items-center gap-3 zoom-in-bounce delay-200">
            <h5 className="font-extrabold text-slate-900 text-sm tracking-wide">Our Social Media</h5>
            <div className="flex items-center gap-4">
              {/* X (Twitter) */}
              <a href="#" className="w-11 h-11 rounded-full bg-white hover:bg-black text-slate-800 hover:text-white flex items-center justify-center shadow-xs border border-slate-300/80 transition-all hover:scale-110" title="X" aria-label="X">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Facebook */}
              <a href="#" className="w-11 h-11 rounded-full bg-white hover:bg-[#1877F2] text-slate-800 hover:text-white flex items-center justify-center shadow-xs border border-slate-300/80 transition-all hover:scale-110" title="Facebook" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" className="w-11 h-11 rounded-full bg-white hover:bg-[#FF0000] text-slate-800 hover:text-white flex items-center justify-center shadow-xs border border-slate-300/80 transition-all hover:scale-110" title="YouTube" aria-label="YouTube">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a href="#" className="w-11 h-11 rounded-full bg-white hover:bg-[#0A66C2] text-slate-800 hover:text-white flex items-center justify-center shadow-xs border border-slate-300/80 transition-all hover:scale-110" title="LinkedIn" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.62 1.62 0 1 0 0 3.24 1.62 1.62 0 0 0 0-3.24z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="space-y-1 fade-up delay-300">
            <p className="text-xs sm:text-sm font-semibold text-slate-700">{t('footer.copyright')}</p>
            <p className="text-xs text-slate-500">{t('footer.tagline')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}