'use client';

import { useState } from 'react';
import { motion, AnimatePresence, type MotionProps } from 'framer-motion';
import { Network, ArrowRight, ShieldCheck, Cable, GitBranch, Share2, ChevronDown } from 'lucide-react';
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
    href: '/layanan/konektivitas/iplc',
    description:
      'THC IPLC is a dedicated point-to-point private data transmission service utilizing DWDM technology, backed by submarine cable backbone redundancy across the Jakabare Fiber Optic Network and Indigo Cable System to securely interconnect geographically dispersed global enterprises.',
    features: ['Jakabare & Indigo Cable System', 'Dedicated Point-to-Point Bandwidth', 'Submarine Cable Redundancy'],
  },
  {
    title: 'International Ethernet Private Line (IEPL)',
    shortTitle: 'IEPL',
    badge: 'Layer-2 Carrier Ethernet',
    icon: Network,
    href: '/layanan/konektivitas/iepl',
    description:
      'THC IEPL provides private, high-bandwidth point-to-point data communication powered by carrier-grade Layer 2 Ethernet technology (Metro Ethernet, MPLS), offering flexible scalability with transparent network management.',
    features: ['Layer-2 Protocol Transparency', 'MPLS & Metro Ethernet Backed', 'Seamless LAN Extension'],
  },
  {
    title: 'Local-Loop Metro Ethernet (INNER & INTER CITY)',
    shortTitle: 'Metro Ethernet',
    badge: 'Inner & Inter City Loop',
    icon: GitBranch,
    href: '/layanan/konektivitas/metro-ethernet',
    description:
      'High-performance fiber optic network interconnecting major metropolitan areas across Indonesia, engineered to seamlessly link corporate headquarters with branch offices and data centers through high-speed, low-jitter local loop connections.',
    features: ['Cross-City Fiber Grid', 'Sub-millisecond Local Latency', 'Multi-Branch Aggregation'],
  },
{
    title: 'Inter Data Center Backbone (IDCB)',
    shortTitle: 'IDCB',
    badge: 'Data Center Interconnect',
    icon: Share2,
    href: '/layanan/konektivitas/idcb',
    description:
      'A mission-critical, ultra-high-speed backbone interconnecting primary data centers for real-time resource sharing, geo-redundant data replication, and dynamic load balancing. Powered by DWDM technology, IDCB delivers secure, scalable, and ultra-low latency inter-site connectivity.',
    features: ['Real-time Data Replication', 'Geo-Redundant Protection', 'Dynamic Load Balancing'],
  },
];

export default function ConnectivityServices() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

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

        {/* Accordion Cards */}
        <div className="mt-10 space-y-4">
          {connectivityCards.map((card, index) => {
            const Icon = card.icon;
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={card.title}
                {...reveal(index * 0.08)}
                className={`group overflow-hidden rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? 'border-brand-200 shadow-lg'
                    : 'border-slate-200/80 shadow-sm hover:border-brand-200 hover:shadow-md'
                }`}
              >
                {/* Accordion Header */}
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center gap-4 p-5 text-left sm:p-6"
                >
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-xs transition-colors ${
                      isOpen
                        ? 'bg-brand-600 text-white'
                        : 'bg-slate-100 text-slate-700 group-hover:bg-brand-600 group-hover:text-white'
                    }`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>

                  <div className="min-w-0 flex-1">
                    <h3
                      className={`text-lg font-bold transition-colors sm:text-xl ${
                        isOpen ? 'text-brand-600' : 'text-slate-900 group-hover:text-brand-600'
                      }`}
                    >
                      {card.title}
                    </h3>
                    <span className="mt-0.5 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {card.badge}
                    </span>
                  </div>

                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="shrink-0 text-slate-400"
                  >
                    <ChevronDown className="h-5 w-5" />
                  </motion.span>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                        <p className="text-[14px] leading-[1.8] text-slate-600">
                          {card.description}
                        </p>

                        <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                          {card.features.map((feat) => (
                            <li key={feat} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                              <ShieldCheck className="h-3.5 w-3.5 text-brand-600 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="mt-4 border-t border-slate-100 pt-4">
                          <Link
                            href={card.href}
                            prefetch={true}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 transition-colors hover:text-brand-700"
                          >
                            <span>Inquire Solution</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform hover:translate-x-1" />
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
