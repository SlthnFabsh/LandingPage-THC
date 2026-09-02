'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const updateNavbar = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
    return () => window.removeEventListener('scroll', updateNavbar);
  }, []);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    setMenuVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuVisible(false);
    window.setTimeout(() => setMenuOpen(false), 300);
  }, []);

  const shadowClass = scrolled ? 'shadow-lg shadow-slate-900/10' : 'shadow-sm';

  return (
    <>
      <div className="fixed top-0 inset-x-0 z-50">
        <header
          id="navbar"
          className={`bg-white border-b border-slate-200 ${shadowClass} w-full px-5 sm:px-8 py-3 flex items-center justify-between transition-all duration-300`}
        >
          {/* Brand Logo */}
          <a href="#beranda" className="flex items-center group shrink-0 pr-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/logo1.png"
              alt="Trans Hybrid - Your Trusted Partner"
              className="h-12 sm:h-16 md:h-[70px] w-auto object-contain group-hover:scale-105 transition-transform"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-14 font-bold text-slate-700 text-sm sm:text-base tracking-wide">
            <a href="#beranda" className="text-slate-950 font-extrabold hover:text-brand-600 transition-colors">
              {t('nav.beranda')}
            </a>
            <a href="#tentang" className="hover:text-brand-600 transition-colors">
              {t('nav.tentang')}
            </a>
            <a href="#layanan" className="hover:text-brand-600 transition-colors">
              {t('nav.layanan')}
            </a>
            <a href="#jaringan" className="hover:text-brand-600 transition-colors">
              {t('nav.jaringan')}
            </a>
            <a href="#berita" className="hover:text-brand-600 transition-colors flex items-center gap-1.5">
              <span>{t('nav.berita')}</span>
              <ChevronDown className="w-4 h-4 text-slate-600" />
            </a>
          </nav>

          {/* Right Action Button & Language Toggle */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              id="lang-toggle-desktop"
              onClick={toggle}
              className="px-4 h-10 rounded-full bg-white hover:bg-slate-100 border border-slate-300/80 font-semibold text-sm text-slate-700 hover:text-slate-900 transition-all shadow-xs"
              title={lang === 'en' ? 'Switch to Bahasa Indonesia' : 'Switch to English'}
              aria-label="Ganti Bahasa"
            >
              {lang === 'id' ? 'Indonesia (ID)' : 'English (EN)'}
            </button>

            </div>

          {/* Mobile Hamburger Button */}
          <button
            id="mobile-menu-btn"
            onClick={openMenu}
            className="lg:hidden p-2.5 rounded-full bg-white/80 text-slate-800 hover:bg-white focus:outline-none shadow-sm mr-1"
            aria-label="Buka Menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </header>
      </div>

      {/* MOBILE MENU DRAWER */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 z-50 transition-all duration-300 ease-in-out ${
          menuOpen ? '' : 'hidden'
        } ${menuVisible ? '' : 'opacity-0 translate-x-full'}`}
      >
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={closeMenu}></div>
        <div className="fixed right-0 top-0 bottom-0 w-4/5 max-w-sm bg-white shadow-2xl p-6 flex flex-col justify-between z-10">
          <div>
            <div className="flex items-center justify-between mb-8">
              <a href="#beranda" className="flex items-center" onClick={closeMenu}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/logo1.png" alt="Trans Hybrid Logo" className="h-10 w-auto" />
              </a>
              <button onClick={closeMenu} className="p-2 text-slate-500 hover:text-slate-800" aria-label="Tutup Menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-4 font-medium text-slate-700 text-base">
              <a href="#beranda" onClick={closeMenu} className="py-2 border-b border-slate-100 text-brand-600">
                {t('nav.beranda')}
              </a>
              <a href="#tentang" onClick={closeMenu} className="py-2 border-b border-slate-100">
                {t('nav.tentang')}
              </a>
              <a href="#layanan" onClick={closeMenu} className="py-2 border-b border-slate-100">
                {t('nav.layanan')}
              </a>
              <a href="#jaringan" onClick={closeMenu} className="py-2 border-b border-slate-100">
                {t('nav.jaringan')}
              </a>
              <a href="#berita" onClick={closeMenu} className="py-2 border-b border-slate-100">
                {t('nav.berita')}
              </a>
              <a href="#faq" onClick={closeMenu} className="py-2">
                {t('nav.faq')}
              </a>
            </div>

            {/* Mobile Language Toggle */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-slate-500">{t('nav.bahasa')}</span>
                <button
                  id="lang-toggle-mobile"
                  onClick={toggle}
                  className="px-4 py-2 rounded-full bg-white hover:bg-slate-100 border border-slate-300/80 font-semibold text-sm text-slate-700 hover:text-slate-900 transition-colors"
                  aria-label="Ganti Bahasa"
                >
                  {lang === 'id' ? 'Indonesia (ID)' : 'English (EN)'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}