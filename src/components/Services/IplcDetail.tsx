'use client';

import { useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { Cable, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const features = [
  'Keamanan tingkat tinggi dengan jalur privat',
  'Redundance kabel Backbone DWDM (Jakabare & Indigo)',
  'Kapasitas 100G',
  'Kecepatan transfer real time',
  'Layanan sesuai kebutuhan perusahaan',
  'Ketersediaan jaringan yang tinggi',
];

export default function IplcDetail() {
  const [activeSection, setActiveSection] = useState<'features' | 'topology'>('features');

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Cable className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                International Private Leased Circuit (IPLC)
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Point-to-Point DWDM Private Link
              </span>
            </div>
          </div>

          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.9] text-slate-600 font-normal">
            THC IPLC is a dedicated point-to-point private data transmission service utilizing DWDM
            technology, backed by submarine cable backbone redundancy across the{' '}
            <strong className="font-semibold text-slate-900">Jakabare Fiber Optic Network</strong> and{' '}
            <strong className="font-semibold text-slate-900">Indigo Cable System</strong> to securely
            interconnect geographically dispersed global enterprises.
          </p>

          {/* Key Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">100G</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Kapasitas</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">Point-to-Point</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Dedicated</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">DWDM</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Technology</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">99.9%</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Uptime SLA</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mt-10 border-b border-slate-200">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {[
              { id: 'features', label: 'Features', icon: ShieldCheck },
              { id: 'topology', label: 'Topology', icon: Cable },
            ].map(({ id, label, icon: TabIcon }) => {
              const isActive = activeSection === id;
              return (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveSection(id as typeof activeSection)}
                  className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-bold transition-all ${
                    isActive
                      ? 'border-brand-600 text-brand-600'
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-800'
                  }`}
                >
                  <TabIcon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab 1: Features */}
        {activeSection === 'features' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Key Features
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Enterprise-grade private leased circuit with maximum security and performance
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8">
              <ul className="space-y-4">
                {features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
                    <span className="text-[15px] leading-relaxed text-slate-700 font-medium">{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Topology */}
        {activeSection === 'topology' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                IPLC Network Topology
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Visualizing the dedicated point-to-point DWDM backbone architecture
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/topologi_iplc_jkt.webp"
              alt="IPLC Network Topology - Jakarta"
              className="w-full rounded-2xl border border-slate-200/80 object-contain shadow-sm"
            />
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-blue-50/50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Need a Dedicated IPLC Connection?
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Consult with our network engineers for custom IPLC provisioning and enterprise pricing.
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
