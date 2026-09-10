'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MapPin, Server, Share2, ArrowRight, ShieldAlert, PhoneCall } from 'lucide-react';

const networkNavItems = [
  {
    href: '/jaringan/coverage',
    label: 'Network Coverage',
    description: 'Submarine & inland cable routes',
    icon: MapPin,
  },
  {
    href: '/jaringan/hub-pop',
    label: 'Hub & Point of Presence (PoP)',
    description: 'Domestic & cross-border backbones',
    icon: Server,
  },
  {
    href: '/jaringan/global-network',
    label: 'Global Network & Peering',
    description: 'AS Numbers, IXPs & Tier-1 upstreams',
    icon: Share2,
  },
];

export default function NetworkSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-72 xl:w-80 shrink-0">
      <div className="sticky top-28 space-y-5">
        {/* Main Navigation Card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
          {/* Header */}
          <div className="border-b border-slate-100 bg-slate-50/80 px-6 py-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
              NETWORK INFRASTRUCTURE
            </span>
          </div>

          {/* Nav Items */}
          <nav className="divide-y divide-slate-100/80 py-1" aria-label="Network sub-navigation">
            {networkNavItems.map(({ href, label, description, icon: Icon }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  prefetch={true}
                  className={`group flex items-start gap-3.5 px-5 py-4 text-[14px] font-medium transition-all duration-200 ${
                    isActive
                      ? 'border-l-4 border-brand-600 bg-brand-50/70 font-semibold text-brand-600 shadow-sm'
                      : 'border-l-4 border-transparent text-slate-600 hover:border-slate-300 hover:bg-slate-50/80 hover:text-brand-600'
                  }`}
                >
                  <span
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-glow-blue'
                        : 'bg-slate-100 text-slate-500 group-hover:bg-brand-50 group-hover:text-brand-600'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                  <div className="flex-1 min-w-0">
                    <span className="block leading-snug">{label}</span>
                    <span className="mt-0.5 block text-[12px] font-normal text-slate-400">
                      {description}
                    </span>
                  </div>
                  <ArrowRight
                    className={`mt-1 h-4 w-4 shrink-0 transition-transform ${
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

        {/* 24/7 NOC Support Card */}
        <div className="overflow-hidden rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50/80 via-white to-blue-50/50 p-5 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow-blue">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-600">
                24/7 NOC Hotline
              </p>
              <p className="text-sm font-bold text-slate-800">0811-1222-808</p>
            </div>
          </div>
          <p className="mt-3 text-[12px] leading-relaxed text-slate-500">
            Real-time proactive telemetry, continuous routing health checks, and rapid incident dispatch.
          </p>
          <div className="mt-3.5 flex items-center gap-2 text-xs font-semibold text-emerald-600">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Core Network Status: 100% Operational</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
