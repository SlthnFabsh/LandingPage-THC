'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, ArrowUpRight, Building2, GitFork, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Building2,
  GitFork,
  Sparkles,
};


const tentangSubPages = [
  {
    titleKey: 'nav.informasi',
    descKey: 'about.desc',
    href: '/tentang/informasi-perusahaan',
    icon: 'Building2',
  },
  {
    titleKey: 'nav.strukturGrup',
    descKey: 'about.strukturGrupDesc',
    href: '/tentang/struktur-grup',
    icon: 'GitFork',
  },
  {
    titleKey: 'nav.nilaiInti',
    descKey: 'about.nilaiIntiDesc',
    href: '/tentang/nilai-inti',
    icon: 'Sparkles',
  },
];

export default function Navbar() {
  const { lang, t } = useLanguage();
  const pathname = usePathname();
  const isHome = pathname === '/';
  const inTentangPage = pathname.startsWith('/tentang');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [tentangOpen, setTentangOpen] = useState(false);
  const [mobileTentangOpen, setMobileTentangOpen] = useState(false);

  useEffect(() => {
    const updateNavbar = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
    return () => window.removeEventListener('scroll', updateNavbar);
  }, []);

  useEffect(() => {
    if (!tentangOpen) return;

    const closeOpenMenus = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const insideTentang = Boolean(target.closest('[data-tentang-dropdown]'));
      if (!insideTentang) setTentangOpen(false);
    };

    document.addEventListener('click', closeOpenMenus);
    return () => document.removeEventListener('click', closeOpenMenus);
  }, [tentangOpen]);

  useEffect(() => {
    if (!isHome) return;

    const sectionIds = ['beranda', 'tentang', 'layanan', 'jaringan', 'berita', 'faq'];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  const openMenu = useCallback(() => {
    setMenuOpen(true);
    setMenuVisible(true);
  }, []);

  const closeMenu = useCallback(() => {
    setMenuVisible(false);
    window.setTimeout(() => setMenuOpen(false), 300);
  }, []);

  const sectionHref = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  const tentangActive = activeSection === 'tentang' || inTentangPage;

  const shadowClass = scrolled ? 'shadow-lg shadow-slate-900/10' : 'shadow-sm';

  return (
    <>
      <div className="sticky inset-x-5 top-2.5 z-50 -mb-[76px] sm:inset-x-10 sm:top-3 lg:inset-x-16">
        <header
          id="navbar"
          className={`mx-auto flex w-full max-w-[1320px] items-center justify-between rounded-[16px] border border-slate-200/80 bg-white/90 backdrop-blur-xl px-6 py-2 transition-all duration-300 sm:px-9 sm:py-2.5 ${shadowClass}`}
        >
          {/* Brand Logo */}
          <a href={isHome ? '#beranda' : '/'} className="flex items-center group shrink-0 pr-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/logo1.webp"
              alt="Trans Hybrid - Your Trusted Partner"
              className="h-10 w-auto object-contain transition-transform group-hover:scale-105 sm:h-12 md:h-14"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 xl:gap-12 font-medium text-slate-700 text-[15px] xl:text-base">
            <a href={sectionHref('beranda')} className={`transition-colors hover:text-blue-600 ${activeSection === 'beranda' ? 'font-semibold text-blue-600 underline decoration-2 underline-offset-[7px] decoration-blue-600/80' : 'text-slate-700'}`}>
              {t('nav.beranda')}
            </a>
            <div className="relative" data-tentang-dropdown onMouseEnter={() => setTentangOpen(true)} onMouseLeave={() => setTentangOpen(false)}>
              <button
                id="tentang-dropdown-btn"
                type="button"
                onClick={() => setTentangOpen((open) => !open)}
                aria-expanded={tentangOpen}
                aria-haspopup="true"
                className={`flex items-center gap-1.5 transition-colors hover:text-blue-600 ${tentangActive ? 'font-semibold text-blue-600 underline decoration-2 underline-offset-[7px] decoration-blue-600/80' : ''}`}
              >
                <span>{t('nav.tentang')}</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${tentangOpen ? 'rotate-180' : ''}`} />
              </button>
              {tentangOpen && (
                <div className="absolute left-0 top-full z-50 w-[360px] pt-4">
                  <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white/95 p-2 shadow-xl shadow-slate-900/10 backdrop-blur-xl" role="menu" aria-label={`${t('nav.tentang')} menu`}>
                  {tentangSubPages.map(({ titleKey, descKey, href, icon }) => {
                    const Icon = iconMap[icon] ?? Building2;
                    return (
                    <Link
                      key={href}
                      href={href}
                      role="menuitem"
                      onClick={() => setTentangOpen(false)}
                      className="group flex items-start gap-3 rounded-xl px-4 py-3.5 transition-colors hover:bg-brand-50"
                    >
                      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-600/10 text-brand-600">
                        <Icon className="h-[18px] w-[18px]" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-[15px] font-semibold text-slate-900 transition-colors group-hover:text-brand-700">{t(titleKey)}</span>
                        <span className="mt-0.5 block text-[13px] leading-snug text-slate-500">{t(descKey)}</span>
                      </span>
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-brand-600 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  )})}

                  </div>
                </div>
              )}
            </div>
            <a href={sectionHref('layanan')} className={`transition-colors hover:text-blue-600 ${activeSection === 'layanan' ? 'font-semibold text-blue-600 underline decoration-2 underline-offset-[7px] decoration-blue-600/80' : ''}`}>
              {t('nav.layanan')}
            </a>
            <a href={sectionHref('jaringan')} className={`transition-colors hover:text-blue-600 ${activeSection === 'jaringan' ? 'font-semibold text-blue-600 underline decoration-2 underline-offset-[7px] decoration-blue-600/80' : ''}`}>
              {t('nav.jaringan')}
            </a>
            <a href={sectionHref('berita')} className={`transition-colors hover:text-blue-600 ${activeSection === 'berita' ? 'font-semibold text-blue-600 underline decoration-2 underline-offset-[7px] decoration-blue-600/80' : ''}`}>
              {t('nav.berita')}
            </a>
          </nav>

          {/* Right Action Button & Language Toggle */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
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
              <a href={isHome ? '#beranda' : '/'} className="flex items-center" onClick={closeMenu}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/images/logo1.webp" alt="Trans Hybrid Logo" className="h-10 w-auto" />
              </a>
              <button onClick={closeMenu} className="p-2 text-slate-500 hover:text-slate-800" aria-label="Tutup Menu">
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="flex flex-col gap-4 font-medium text-slate-700 text-base">
              <a href={sectionHref('beranda')} onClick={closeMenu} className={`border-b border-slate-100 py-2 hover:text-blue-600 ${activeSection === 'beranda' && isHome ? 'text-blue-600 underline decoration-2 underline-offset-4 decoration-blue-600' : ''}`}>
                {t('nav.beranda')}
              </a>
              <div className="border-b border-slate-100 py-2">
                <button
                  type="button"
                  onClick={() => setMobileTentangOpen((open) => !open)}
                  aria-expanded={mobileTentangOpen}
                  className={`flex w-full items-center justify-between py-1 text-left transition-colors hover:text-blue-600 ${tentangActive ? 'text-blue-600' : ''}`}
                >
                  <span>{t('nav.tentang')}</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${mobileTentangOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileTentangOpen && (
                  <div className="mt-2 flex flex-col gap-2 border-l-2 border-brand-100 pl-4">
                    {tentangSubPages.map(({ titleKey, href }) => (
                      <Link key={href} href={href} onClick={closeMenu} className="flex items-center justify-between py-1 text-[15px] text-slate-600 transition-colors hover:text-blue-600">
                        <span>{t(titleKey)}</span>
                        <ArrowUpRight className="h-4 w-4 text-slate-400" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <a href={sectionHref('layanan')} onClick={closeMenu} className={`border-b border-slate-100 py-2 hover:text-blue-600 ${activeSection === 'layanan' ? 'text-blue-600 underline decoration-2 underline-offset-4 decoration-blue-600' : ''}`}>
                {t('nav.layanan')}
              </a>
              <a href={sectionHref('jaringan')} onClick={closeMenu} className={`border-b border-slate-100 py-2 hover:text-blue-600 ${activeSection === 'jaringan' ? 'text-blue-600 underline decoration-2 underline-offset-4 decoration-blue-600' : ''}`}>
                {t('nav.jaringan')}
              </a>
              <a href={sectionHref('berita')} onClick={closeMenu} className={`border-b border-slate-100 py-2 hover:text-blue-600 ${activeSection === 'berita' ? 'text-blue-600 underline decoration-2 underline-offset-4 decoration-blue-600' : ''}`}>
                {t('nav.berita')}
              </a>
              <a href={sectionHref('faq')} onClick={closeMenu} className={`py-2 hover:text-blue-600 ${activeSection === 'faq' ? 'text-blue-600 underline decoration-2 underline-offset-4 decoration-blue-600' : ''}`}>
                {t('nav.faq')}
              </a>
            </div>

            
          </div>
        </div>
      </div>
    </>
  );
}
