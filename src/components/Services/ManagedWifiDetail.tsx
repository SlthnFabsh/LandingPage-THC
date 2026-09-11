'use client';

import { useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { Wifi, ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const features = [
  'Koneksi privat point to point yang andal',
  'Dedicated network dengan jaringan fiber optik',
  'Jaminan keamanan dan kecepatan untuk aplikasi mission critical',
  'Efisiensi biaya bagi perusahaan',
  'Layanan 24/7 oleh tim NOC',
];

export default function ManagedWifiDetail() {
  const [activeSection, setActiveSection] = useState<'features' | 'support'>('features');

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Wifi className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Managed Wi-Fi & IT
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                24/7 Wireless & Infrastructure NOC
              </span>
            </div>
          </div>

          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.9] text-slate-600 font-normal">
            Comprehensive cloud-managed enterprise Wi-Fi and proactive IT support, optimizing wireless
            density, security policies, and continuous network troubleshooting to maintain peak
            corporate productivity.
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mt-10 border-b border-slate-200">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {[
              { id: 'features', label: 'Features', icon: ShieldCheck },
              { id: 'support', label: 'Our Process Support', icon: ArrowRight },
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
                Reliable, dedicated, and secure wireless infrastructure managed by our NOC team
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

        {/* Tab 2: Our Process Support */}
        {activeSection === 'support' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-4"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Our Process Support
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Full lifecycle support from design, deployment, to 24/7 operations
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/wifit.webp"
              alt="Managed Wi-Fi & IT Process Support Diagram"
              className="w-full rounded-2xl border border-slate-200/80 object-contain shadow-sm"
            />
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-blue-50/50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Need Managed Wi-Fi & IT?
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Optimize your enterprise wireless and IT operations with our 24/7 managed NOC support.
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