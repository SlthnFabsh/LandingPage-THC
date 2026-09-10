'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, GitFork, Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const navItems = [
  {
    href: '/tentang/informasi-perusahaan',
    icon: Building2,
    labelKey: 'nav.informasi',
    labelFallback: 'Company Information',
  },
  {
    href: '/tentang/struktur-grup',
    icon: GitFork,
    labelKey: 'nav.strukturGrup',
    labelFallback: 'Group Structure',
  },
  {
    href: '/tentang/nilai-inti',
    icon: Sparkles,
    labelKey: 'nav.nilaiInti',
    labelFallback: 'Core Values',
  },
];

export default function AboutSidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="w-full lg:w-64 xl:w-72 shrink-0">
      <div className="sticky top-28 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
        {/* Header */}
        <div className="border-b border-slate-100 bg-gradient-to-r from-brand-600 to-blue-500 px-5 py-4">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-100/80">
            {t('nav.tentang')}
          </p>
        </div>

        {/* Nav items */}
        <nav className="p-2" aria-label="About sub-navigation">
          {navItems.map(({ href, icon: Icon, labelKey, labelFallback }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-brand-600 text-white shadow-glow-blue'
                    : 'text-slate-600 hover:bg-brand-50 hover:text-brand-700'
                }`}
              >
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-brand-50 text-brand-600 group-hover:bg-brand-100'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="leading-snug">
                  {t(labelKey) !== labelKey ? t(labelKey) : labelFallback}
                </span>
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 shrink-0 rounded-full bg-white/80" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
