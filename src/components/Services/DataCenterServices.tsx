'use client';

import { motion, type MotionProps } from 'framer-motion';
import { Database, ArrowRight, ShieldCheck, Server, Cloud, Lock, Cpu } from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const dataCenterCards = [
  {
    title: 'Colocation Server',
    badge: 'Tier-3 Data Center Space',
    icon: Server,
    description:
      'Secure colocation server rack space within international-standard Tier-3 facilities, delivering cost efficiency, 24/7 biometric physical security, N+1 precision power and cooling, redundant carrier links, and flexible storage scaling to protect your enterprise mission-critical servers.',
    features: [
      'Tier-3 Redundant Power & Precision Cooling (2N)',
      '24/7/365 On-site Biometrics & CCTV Surveillance',
      'Direct Cross-Connect to THC Low-Latency Backbone',
    ],
  },
  {
    title: 'THC Cloud',
    badge: 'Private & Enterprise Hybrid Cloud',
    icon: Cloud,
    description:
      'Enterprise hybrid and private cloud infrastructure offering the elasticity and agility of public cloud paired with the dedicated security, sovereign data compliance, and exclusive bare-metal performance of a private corporate infrastructure.',
    features: [
      'High-Performance NVMe Distributed Storage',
      'Automated Disaster Recovery & Instant Snapshots',
      'Dedicated VPC with Granular Access Controls',
    ],
  },
];

export default function DataCenterServices() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Database className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Data Center Services
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Tier-3 High-Security Enterprise Colocation & Cloud
              </span>
            </div>
          </div>

          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.85] text-slate-600">
            Tier-3 carrier-neutral international data centers equipped with multi-layered physical
            and cyber security, engineered for mission-critical enterprise workloads and high-density
            storage requirements.
          </p>
        </motion.div>

        {/* 2 Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {dataCenterCards.map((card, index) => {
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
                    <span>Reserve Rack Space / Cloud</span>
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
