'use client';

import { motion, type MotionProps } from 'framer-motion';
import { Cloud, ArrowRight, ShieldCheck, Layers, Zap, BadgeDollarSign } from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const features = [
  {
    title: 'Fleksibilitas',
    desc: 'Elastic resources that scale on demand to match your enterprise workload.',
    icon: Layers,
  },
  {
    title: 'Keamanan data yang tinggi',
    desc: 'Dedicated security with sovereign data compliance and granular access controls.',
    icon: ShieldCheck,
  },
  {
    title: 'Ketepatan dalam pengaturan',
    desc: 'Precise resource provisioning and configuration for predictable performance.',
    icon: Zap,
  },
  {
    title: 'Penghematan biaya dengan mudah',
    desc: 'Cost-efficient cloud consumption with automated disaster recovery built in.',
    icon: BadgeDollarSign,
  },
];

export default function ThcCloudDetail() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Cloud className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                THC Cloud
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Private & Enterprise Hybrid Cloud
              </span>
            </div>
          </div>

          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.9] text-slate-600 font-normal">
            Enterprise hybrid and private cloud infrastructure offering the elasticity and agility of
            public cloud paired with the dedicated security, sovereign data compliance, and exclusive
            bare-metal performance of a private corporate infrastructure.
          </p>
        </motion.div>

        {/* THC Cloud Visual */}
        <motion.div {...reveal(0.1)} className="mt-10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/thcloud.webp"
            alt="THC Cloud Architecture"
            className="w-full rounded-2xl border border-slate-200/80 object-contain shadow-sm"
          />
        </motion.div>

        {/* THC Cloud Features Card */}
        <motion.div {...reveal(0.15)} className="mt-10">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-bold text-slate-900">
              THC Cloud
            </h3>
            <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
              Features
            </span>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="group flex items-start gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h4 className="text-[14px] font-bold leading-snug text-slate-800">
                      {feat.title}
                    </h4>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-slate-500">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-blue-50/50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Migrate to THC Cloud?
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Deploy flexible, secure, and cost-efficient enterprise cloud with our hybrid infrastructure.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/#faq"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-glow-blue transition-all hover:bg-brand-700"
              >
                <span>Inquire Solution</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}