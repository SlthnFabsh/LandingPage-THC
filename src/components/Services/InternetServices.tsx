'use client';

import { motion, type MotionProps } from 'framer-motion';
import { Globe, ArrowRight, ShieldCheck, Zap, Radio } from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const internetCards = [
  {
    title: 'IP Transit',
    badge: 'Global & Domestic BGP',
    icon: Globe,
    description:
      'A comprehensive internet routing solution for global and domestic connectivity to reference points utilizing enterprise IP and ASN, featuring Border Gateway Protocol (BGP) technical configuration for optimal path redundancy and ultra-low latency.',
    features: ['Direct Tier-1 Upstreams', 'Full BGP Routing Table', 'Sub-millisecond Latency'],
  },
  {
    title: 'Dedicated Internet',
    badge: '1:1 Symmetrical Bandwidth',
    icon: Zap,
    description:
      'Dedicated Internet is a premium 1:1 symmetrical IP service directly peered with THC routers under ASN 24534, provisioned across all THC International gateways for guaranteed throughput and 99.9% uptime SLA.',
    features: ['100% Dedicated (No Sharing)', '99.9% SLA Guarantee', '24/7 Proactive Monitoring'],
  },
  {
    title: 'THC IX',
    badge: 'Internet Exchange Peering',
    icon: Radio,
    description:
      'A high-capacity internet exchange service that optimizes domestic traffic routing, reduces upstream transit latency, and ensures resilient, high-speed direct interconnection across national peering points.',
    features: ['Direct Local Peering', 'Reduced Bandwidth Costs', 'Low Hop-Count Routing'],
  },
];

export default function InternetServices() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Globe className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Internet Services
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                High-Speed Dedicated Fiber Infrastructure
              </span>
            </div>
          </div>

          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.85] text-slate-600">
            High-speed internet access service utilizing advanced Fiber Optic technology, where
            bandwidth is exclusively dedicated to your organization without sharing with other
            customers, delivering stable, high-performance, and flexible connectivity to support
            your enterprise growth.
          </p>
        </motion.div>

        {/* 3 Service Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {internetCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                {...reveal(index * 0.1)}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
              >
                <div>
                  {/* Icon & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 shadow-xs transition-colors group-hover:bg-brand-600 group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <h3 className="mt-5 text-xl font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                    {card.title}
                  </h3>
                  <p className="mt-3 text-[14px] leading-[1.8] text-slate-600">
                    {card.description}
                  </p>

                  {/* Key Highlights */}
                  <ul className="mt-5 space-y-2 border-t border-slate-100 pt-4">
                    {card.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                        <ShieldCheck className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Action */}
                <div className="mt-6 border-t border-slate-100 pt-4">
                  <Link
                    href="/#faq"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 transition-colors group-hover:text-brand-700"
                  >
                    <span>Learn More</span>
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
