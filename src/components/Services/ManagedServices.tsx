'use client';

import { motion, type MotionProps } from 'framer-motion';
import {
  ServerCog,
  ArrowRight,
  ShieldCheck,
  Router as RouterIcon,
  Wifi,
  Activity,
} from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

interface ServiceCard {
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  href?: string;
  description: string;
  features: string[];
}

const serviceCards: ServiceCard[] = [
  {
    title: 'Managed CPE (Customer Premises Equipment)',
    badge: 'Hardware & Lifecycle Management',
    icon: RouterIcon,
    href: '/layanan/solusi/layanan-terkelola/managed-cpe',
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
    href: '/layanan/solusi/layanan-terkelola/managed-wifi',
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
                    href={card.href ?? '/#faq'}
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

          {/* Network Architecture Flow Diagram */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/topologi-manage-service.webp"
              alt="Network Flow & Telemetry Architecture topology"
              className="h-auto w-full object-contain"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
