'use client';

import { motion, type MotionProps } from 'framer-motion';
import { Network, ArrowRight, ShieldCheck, Cable, GitBranch, Share2 } from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const connectivityCards = [
  {
    title: 'International Private Leased Circuit (IPLC)',
    shortTitle: 'IPLC',
    badge: 'Point-to-Point DWDM',
    icon: Cable,
    description:
      'THC IPLC is a dedicated point-to-point private data transmission service utilizing DWDM technology, backed by submarine cable backbone redundancy across the Jakabare Fiber Optic Network and Indigo Cable System to securely interconnect geographically dispersed global enterprises.',
    features: ['Jakabare & Indigo Cable System', 'Dedicated Point-to-Point Bandwidth', 'Submarine Cable Redundancy'],
  },
  {
    title: 'International Ethernet Private Line (IEPL)',
    shortTitle: 'IEPL',
    badge: 'Layer-2 Carrier Ethernet',
    icon: Network,
    description:
      'THC IEPL provides private, high-bandwidth point-to-point data communication powered by carrier-grade Layer 2 Ethernet technology (Metro Ethernet, MPLS), offering flexible scalability with transparent network management.',
    features: ['Layer-2 Protocol Transparency', 'MPLS & Metro Ethernet Backed', 'Seamless LAN Extension'],
  },
  {
    title: 'Local-Loop Metro Ethernet (INNER & INTER CITY)',
    shortTitle: 'Metro Ethernet',
    badge: 'Inner & Inter City Loop',
    icon: GitBranch,
    description:
      'High-performance fiber optic network interconnecting major metropolitan areas across Indonesia, engineered to seamlessly link corporate headquarters with branch offices and data centers through high-speed, low-jitter local loop connections.',
    features: ['Cross-City Fiber Grid', 'Sub-millisecond Local Latency', 'Multi-Branch Aggregation'],
  },
  {
    title: 'Inter Data Center Backbone (IDCB)',
    shortTitle: 'IDCB',
    badge: 'Data Center Interconnect',
    icon: Share2,
    description:
      'A mission-critical, ultra-high-speed backbone interconnecting primary data centers for real-time resource sharing, geo-redundant data replication, and dynamic load balancing. Powered by DWDM technology, IDCB delivers secure, scalable, and ultra-low latency inter-site connectivity.',
    features: ['Ultra-Low Latency DCI', 'High-Density DWDM Waves', 'Active-Active Replication Ready'],
  },
];

export default function ConnectivityServices() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Network className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Connectivity Services
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Carrier-Grade Global & Domestic Private Links
              </span>
            </div>
          </div>

          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.85] text-slate-600">
            Comprehensive enterprise connectivity solutions: International Private Leased Circuit
            (IPLC), International Ethernet Private Line (IEPL), Local Loop Metro Ethernet Inner
            City, and Metro Intercity Backbone networks tailored for high security and seamless
            multi-branch operations.
          </p>
        </motion.div>

        {/* 4 Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {connectivityCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                {...reveal(index * 0.08)}
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
                  <h3 className="mt-5 text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors sm:text-xl">
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
                    <span>Inquire Solution</span>
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
