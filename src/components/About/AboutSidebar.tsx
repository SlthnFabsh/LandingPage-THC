'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Building2, GitFork, Sparkles, PhoneCall, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const navItems = [
  {
    href: '/tentang/informasi-perusahaan',
    icon: Building2,
    labelKey: 'nav.informasi',
    labelFallback: 'Informasi Perusahaan',
  },
  {
    href: '/tentang/struktur-grup',
    icon: GitFork,
    labelKey: 'nav.strukturGrup',
    labelFallback: 'Struktur Grup Perusahaan',
  },
  {
    href: '/tentang/nilai-inti',
    icon: Sparkles,
    labelKey: 'nav.nilaiInti',
    labelFallback: 'Nilai Inti (T.C.A.R.E.)',
  },
];

export default function AboutSidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0">
      <div className="sticky top-28 space-y-5">
        {/* Main Navigation Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
          {/* Header */}
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              {t('company.title') || 'PERUSAHAAN'}
            </span>
          </div>

          {/* Navigation Items (Persada-inspired corporate sidebar) */}
          <nav className="divide-y divide-slate-100/80 py-1" aria-label="About sub-navigation">
            {navItems.map(({ href, icon: Icon, labelKey, labelFallback }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  prefetch={true}
                  className={`group flex items-center gap-3.5 px-5 py-4 text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'border-l-4 border-brand-600 bg-brand-50/70 font-semibold text-brand-600 shadow-sm'
                      : 'border-l-4 border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50/80 hover:text-brand-600'
                  }`}
                >
                  <span
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-glow-blue'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="flex-1 leading-snug">
                    {t(labelKey) !== labelKey ? t(labelKey) : labelFallback}
                  </span>
                  <ArrowRight
                    className={`h-4 w-4 shrink-0 transition-transform ${
                      isActive
                        ? 'text-brand-600 translate-x-0 opacity-100'
                        : 'text-slate-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Corporate Support / Contact Mini Card */}
        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 via-white to-blue-50/50 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow-blue">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                Layanan Pelanggan
              </p>
              <p className="text-sm font-bold text-slate-800">0811-1222-808</p>
            </div>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
            Hubungi Customer Care & NOC 24/7 kami untuk konsultasi kebutuhan konektivitas Anda.
          </p>
          <a
            href="/#faq"
            className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition-colors hover:text-brand-800"
          >
            <span>Pusat Bantuan & FAQ</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </aside>
  );
}
