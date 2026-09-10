'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Globe,
  Network,
  Cpu,
  Database,
  Building2,
  ServerCog,
  ChevronDown,
  ArrowRight,
  PhoneCall,
} from 'lucide-react';

interface SubServiceItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface ServiceNavItem {
  href?: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  subItems?: SubServiceItem[];
}

const serviceNavItems: ServiceNavItem[] = [
  {
    href: '/layanan/internet',
    label: 'Internet Services',
    icon: Globe,
  },
  {
    href: '/layanan/konektivitas',
    label: 'Connectivity Services',
    icon: Network,
  },
  {
    label: 'Solutions',
    icon: Cpu,
    subItems: [
      {
        href: '/layanan/solusi/solusi-terkelola',
        label: 'Managed Solutions',
        icon: Building2,
      },
      {
        href: '/layanan/solusi/layanan-terkelola',
        label: 'Managed Services',
        icon: ServerCog,
      },
    ],
  },
  {
    href: '/layanan/pusat-data',
    label: 'Data Center',
    icon: Database,
  },
];

export default function ServiceSidebar() {
  const pathname = usePathname();
  const isSolutionsActive = pathname.startsWith('/layanan/solusi');
  const [solutionsOpen, setSolutionsOpen] = useState(true);

  useEffect(() => {
    if (isSolutionsActive) {
      setSolutionsOpen(true);
    }
  }, [isSolutionsActive]);

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0">
      <div className="sticky top-28 space-y-5">
        {/* Main Navigation Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
          {/* Header */}
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              SERVICES
            </span>
          </div>

          {/* Navigation Items */}
          <nav className="divide-y divide-slate-100/80 py-1" aria-label="Services sub-navigation">
            {serviceNavItems.map((item) => {
              // Item with Sub-items (Solutions)
              if (item.subItems) {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="py-1">
                    <button
                      type="button"
                      onClick={() => setSolutionsOpen((prev) => !prev)}
                      className={`flex w-full items-center justify-between px-5 py-3.5 text-[14px] font-medium transition-colors ${
                        isSolutionsActive
                          ? 'font-semibold text-brand-600'
                          : 'text-slate-700 hover:text-brand-600'
                      }`}
                    >
                      <span className="flex items-center gap-3.5">
                        <span
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                            isSolutionsActive
                              ? 'bg-brand-600 text-white shadow-glow-blue'
                              : 'bg-slate-100 text-slate-500'
                          }`}
                        >
                          <Icon className="h-4 w-4" />
                        </span>
                        <span className="leading-snug">{item.label}</span>
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${
                          solutionsOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {/* Sub-items list */}
                    {solutionsOpen && (
                      <div className="ml-7 mr-3 my-1 space-y-1 border-l-2 border-slate-200 pl-3">
                        {item.subItems.map((sub) => {
                          const isSubActive = pathname === sub.href;
                          const SubIcon = sub.icon;
                          return (
                            <Link
                              key={sub.href}
                              href={sub.href}
                              prefetch={true}
                              className={`group flex items-center justify-between rounded-xl px-3 py-2.5 text-[13px] font-medium transition-all ${
                                isSubActive
                                  ? 'bg-brand-50 text-brand-600 font-semibold shadow-xs'
                                  : 'text-slate-600 hover:bg-slate-50 hover:text-brand-600'
                              }`}
                            >
                              <span className="flex items-center gap-2.5">
                                <SubIcon
                                  className={`h-3.5 w-3.5 ${
                                    isSubActive ? 'text-brand-600' : 'text-slate-400'
                                  }`}
                                />
                                <span>{sub.label}</span>
                              </span>
                              <ArrowRight
                                className={`h-3.5 w-3.5 transition-transform ${
                                  isSubActive
                                    ? 'text-brand-600 translate-x-0 opacity-100'
                                    : 'text-slate-300 -translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
                                }`}
                              />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              }

              // Standard Link Item
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href!}
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
                  <span className="flex-1 leading-snug">{item.label}</span>
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
                Enterprise Support
              </p>
              <p className="text-sm font-bold text-slate-800">0811-1222-808</p>
            </div>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
            24/7 Network Operations Center (NOC) and technical enterprise consultation.
          </p>
          <a
            href="/#faq"
            className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 transition-colors hover:text-brand-800"
          >
            <span>Help Center & FAQ</span>
            <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </aside>
  );
}
