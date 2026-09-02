'use client';

import { useState, useEffect, useCallback } from 'react';
import { Menu, X, ArrowRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const updateNavbar = () => {
      setScrolled(window.scrollY > 30);
      const heroSection = document.getElementById('beranda');
      if (heroSection) {
        setPastHero(heroSection.getBoundingClientRect().bottom <= 0);
      }
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

  const paddingClass =
    scrolled ? 'py-1 sm:py-1.5 shadow-2xl shadow-slate-950/30'
      : 'py-1.5 sm:py-2';

  const navbarStyle = pastHero ? 'navbar-blur' : 'navbar-solid';

  return (
    <>
      <div className="fixed top-3 sm:top-5 left-0 right-0 z-50 px-4 sm:px-8 pointer-events-none">
        <header
          id="navbar"
          className={`${navbarStyle} ${paddingClass} pointer-events-auto max-w-[1340px] mx-auto rounded-2xl sm:rounded-3xl border border-white/60 shadow-2xl shadow-slate-950/25 px-5 sm:px-8 transition-all duration-300 flex items-center justify-between`}
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
              className="w-10 h-10 rounded-full bg-white/70 hover:bg-white border border-slate-300/80 flex items-center justify-center transition-all shadow-xs group overflow-hidden"
              title={lang === 'en' ? 'English' : 'Bahasa Indonesia'}
              aria-label="Ganti Bahasa"
            >
              {lang === 'id' ? (
                <span className="flag-id w-6 h-6 rounded-full overflow-hidden flex flex-col shadow-xs border border-slate-200 group-hover:scale-110 transition-transform">
                  <span className="h-1/2 bg-red-600"></span>
                  <span className="h-1/2 bg-white"></span>
                </span>
              ) : (
                <span className="flag-en w-8 h-[18px] rounded-[4px] overflow-hidden shadow-sm border border-slate-200 group-hover:scale-110 transition-transform">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/assets/images/amerika.svg" alt="amerika" className="w-full h-full object-cover" />
                </span>
              )}
            </button>

            <a
              href="#faq"
              className="px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm tracking-wide shadow-lg shadow-brand-600/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <span>{t('nav.hubungi')}</span>
              <ArrowRight className="w-4 h-4" />
            </a>
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
                  className="relative w-14 h-7 rounded-full bg-slate-200 hover:bg-slate-300 transition-colors border border-slate-300"
                  aria-label="Ganti Bahasa"
                >
                  <span
                    id="lang-toggle-dot"
                    className="absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-sm flex items-center justify-center transition-transform duration-300"
                    style={{ transform: lang === 'en' ? 'translateX(28px)' : 'translateX(0)' }}
                  >
                    {lang === 'id' ? (
                      <span className="flag-id w-4 h-4 rounded-full overflow-hidden flex flex-col">
                        <span className="h-1/2 bg-red-600"></span>
                        <span className="h-1/2 bg-white"></span>
                      </span>
                    ) : (
                      <span className="flag-en w-5 h-[12px] rounded-[3px] overflow-hidden shadow-xs border border-slate-200">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/assets/images/england.svg" alt="English" className="w-full h-full object-cover" />
                      </span>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-100">
            <a
              href="#faq"
              onClick={closeMenu}
              className="w-full py-3 rounded-xl bg-brand-600 text-white text-center font-semibold block shadow-md"
            >
              {t('nav.hubungi')}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}