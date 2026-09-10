'use client';

import { motion, type MotionProps } from 'framer-motion';
import {
  ServerCog,
  ArrowRight,
  ShieldCheck,
  Router as RouterIcon,
  Wifi,
  Activity,
  BellRing,
  FileSpreadsheet,
  Search,
  Layers,
  Flame,
  Globe,
  Monitor,
} from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const serviceCards = [
  {
    title: 'Managed CPE (Customer Premises Equipment)',
    badge: 'Hardware & Lifecycle Management',
    icon: RouterIcon,
    description:
      "End-to-end network hardware lifecycle management, provisioning enterprise-grade CPE routers, firewalls, and access points tailored specifically to your organization's architectural and bandwidth requirements.",
    features: [
      'Zero-Touch Provisioning & Deployment',
      'Continuous Firmware & Security Patching',
      'Hardware Replacement & SLA Guarantees',
    ],
  },
  {
    title: 'Managed Wi-Fi & IT Operations',
    badge: '24/7 Wireless & Infrastructure NOC',
    icon: Wifi,
    description:
      'Comprehensive cloud-managed enterprise Wi-Fi and proactive IT support, optimizing wireless density, security policies, and continuous network troubleshooting to maintain peak corporate productivity.',
    features: [
      'Seamless Multi-SSID Enterprise Roaming',
      'Captive Portal & RADIUS Guest Auth',
      'Real-Time RF Channel Optimization',
    ],
  },
];

export default function ManagedServices() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <ServerCog className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Managed Services
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                24/7 Proactive Monitoring & Enterprise IT Operations
              </span>
            </div>
          </div>

          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.85] text-slate-600">
            Through our enterprise Managed Services, your organization receives 24/7 proactive network
            monitoring and expert IT management. Supported by certified network engineers and robust
            infrastructure, we ensure maximum uptime and operational peace of mind.
          </p>
        </motion.div>

        {/* 2 Service Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {serviceCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                {...reveal(index * 0.1)}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-xs transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.85] text-slate-600">
                    {card.description}
                  </p>

                  {/* Key Highlights */}
                  <ul className="mt-6 space-y-2.5 border-t border-slate-100 pt-5">
                    {card.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <ShieldCheck className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="mt-8 border-t border-slate-100 pt-4">
                  <Link
                    href="/#faq"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 transition-colors group-hover:text-brand-700"
                  >
                    <span>Consult with NOC Engineer</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Network Architecture Flow Diagram Section (from Image 4) */}
        <motion.div {...reveal(0.25)} className="mt-14 border-t border-slate-100 pt-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-brand-600">
              <Activity className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Network Flow & Telemetry Architecture
              </h3>
              <p className="text-xs text-slate-500">
                End-to-end flow telemetry export, centralized poller collection, and real-time AI alerting
              </p>
            </div>
          </div>

          {/* Interactive Topology Container */}
          <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200/80 bg-slate-900 p-6 text-white shadow-inner sm:p-8">
            <div className="min-w-[760px] flex flex-col gap-8">
              {/* Row 1: Core Flow Exporters & Network Nodes */}
              <div className="flex items-center justify-between gap-4">
                {/* 1. Internet Cloud */}
                <div className="flex flex-col items-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-blue-400/30 bg-blue-950/60 p-3 shadow-glow-blue">
                    <Globe className="h-10 w-10 text-sky-400 animate-pulse" />
                  </div>
                  <span className="mt-2 text-xs font-bold uppercase tracking-wider text-slate-300">
                    Internet
                  </span>
                </div>

                {/* Bi-directional arrow */}
                <div className="flex flex-col items-center text-sky-400">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Flows</span>
                  <div className="h-0.5 w-14 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400" />
                </div>

                {/* 2. Firewall */}
                <div className="flex flex-col items-center">
                  <div className="flex h-20 w-28 flex-col items-center justify-center rounded-2xl border border-rose-500/30 bg-rose-950/40 p-2 text-center shadow-sm">
                    <Flame className="h-6 w-6 text-rose-400" />
                    <span className="mt-1 text-xs font-bold text-white">Firewall</span>
                    <span className="text-[9px] text-rose-300">(Flow Exporter)</span>
                  </div>
                </div>

                {/* Bi-directional arrow */}
                <div className="flex flex-col items-center text-sky-400">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Flows</span>
                  <div className="h-0.5 w-14 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400" />
                </div>

                {/* 3. Central Router with Subnets */}
                <div className="flex flex-col items-center">
                  {/* Top Subnets */}
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-md border border-blue-500/30 bg-blue-900/40 px-2 py-0.5 text-[10px] font-medium text-blue-200">
                      Subnet 1
                    </span>
                    <span className="rounded-md border border-blue-500/30 bg-blue-900/40 px-2 py-0.5 text-[10px] font-medium text-blue-200">
                      Subnet 2
                    </span>
                  </div>

                  {/* Router Node */}
                  <div className="flex h-20 w-32 flex-col items-center justify-center rounded-2xl border border-brand-500/50 bg-[#12285e] p-2 text-center shadow-glow-blue">
                    <RouterIcon className="h-6 w-6 text-sky-400" />
                    <span className="mt-1 text-xs font-bold text-white">Router</span>
                    <span className="text-[9px] text-sky-300">(Flow Exporter)</span>
                  </div>

                  {/* Wireless Controller below */}
                  <div className="mt-2 flex flex-col items-center">
                    <div className="h-3 w-0.5 bg-sky-400" />
                    <div className="flex items-center gap-1.5 rounded-lg border border-purple-500/30 bg-purple-950/40 px-2.5 py-1 text-[10px] font-bold text-purple-200">
                      <Wifi className="h-3 w-3" />
                      <span>Wireless Controller (Flow Exporter)</span>
                    </div>
                  </div>
                </div>

                {/* Forward Arrow */}
                <div className="flex flex-col items-center text-sky-400">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Flows</span>
                  <div className="h-0.5 w-14 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-400" />
                </div>

                {/* 4. On-Premise Poller */}
                <div className="flex flex-col items-center">
                  <div className="flex h-24 w-36 flex-col items-center justify-center rounded-2xl border border-emerald-500/40 bg-emerald-950/40 p-2 text-center shadow-sm">
                    <ServerCog className="h-6 w-6 text-emerald-400" />
                    <span className="mt-1 text-xs font-bold text-white">Site24x7</span>
                    <span className="text-[10px] text-emerald-300">On-Premise Poller</span>
                    <span className="text-[9px] text-slate-400">(Flow Collector)</span>
                  </div>
                </div>
              </div>

              {/* Row 2: Analytics & Actionable Outputs */}
              <div className="flex items-center justify-end gap-6 border-t border-white/10 pt-6">
                {/* Central Analytics Platform */}
                <div className="flex items-center gap-3 rounded-2xl border border-sky-400/30 bg-sky-950/50 px-5 py-3 shadow-md">
                  <Monitor className="h-7 w-7 text-sky-400" />
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wide text-white">
                      Site24x7 Central Engine
                    </span>
                    <span className="text-[11px] text-slate-300">
                      Flow Analyzing, Bandwidth Profiling & Telemetry Reporting
                    </span>
                  </div>
                </div>

                <div className="h-0.5 w-8 bg-sky-400" />

                {/* Action Output Badges */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 rounded-xl border border-amber-500/30 bg-amber-950/40 px-3 py-2 text-xs font-semibold text-amber-300">
                    <BellRing className="h-4 w-4" />
                    <span>Real-time Alerting</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-950/40 px-3 py-2 text-xs font-semibold text-sky-300">
                    <FileSpreadsheet className="h-4 w-4" />
                    <span>Automated Reporting</span>
                  </div>
                  <div className="flex items-center gap-1.5 rounded-xl border border-violet-500/30 bg-violet-950/40 px-3 py-2 text-xs font-semibold text-violet-300">
                    <Search className="h-4 w-4" />
                    <span>Deep Forensics Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
