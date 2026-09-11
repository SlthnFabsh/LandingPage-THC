'use client';

import { useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import {
  Zap,
  ArrowRight,
  ShieldCheck,
  Globe,
  CheckCircle2,
  Network,
  Server,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const serviceTiers = [
  {
    name: 'Premium Service',
    sharingRasio: '1:1',
    sharingNote: 'Internet Akses Dedicated',
    connection: 'Multiple Upstream & Tier 1',
    internationalCable: 'Redundant Cable',
    sla: '99.8%',
    highlight: true,
  },
  {
    name: 'Standard Service',
    sharingRasio: '1:1',
    sharingNote: 'Internet Akses Dedicated',
    connection: 'Multiple Upstream & Tier 1',
    internationalCable: 'Single Cable',
    sla: '99.5%',
    highlight: false,
  },
  {
    name: 'Burstable Service',
    sharingRasio: 'Dual Commitment',
    sharingNote: 'Bandwidth',
    connection: 'Multiple Upstream & Tier 1',
    internationalCable: 'Single Cable',
    sla: '99.5%',
    highlight: false,
  },
  {
    name: 'Lite',
    sharingRasio: 'Fleksibel',
    sharingNote: 'Sesuai kebutuhan (International & Domestik)',
    connection: 'Multiple Upstream & Tier 1',
    internationalCable: 'Single Cable',
    sla: '99.5%',
    highlight: false,
  },
];

export default function DedicatedInternetDetail() {
  const [activeSection, setActiveSection] = useState<'advantage' | 'service' | 'topology'>('advantage');

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-brand-600">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
                <Zap className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                  Dedicated Internet
                </h2>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  1:1 Symmetrical Bandwidth Enterprise Service
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-50 border border-brand-200/60 px-3 py-1 text-xs font-bold text-brand-700">
                ASN 24534
              </span>
              <span className="rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs font-bold text-emerald-700">
                1:1 Symmetrical
              </span>
              <span className="rounded-full bg-blue-50 border border-blue-200/60 px-3 py-1 text-xs font-bold text-blue-700">
                99.9% SLA
              </span>
            </div>
          </div>

          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.9] text-slate-600 font-normal">
            <strong className="font-semibold text-slate-900">PT Trans Hybrid Communication (THC)</strong> Dedicated
            Internet is a premium 1:1 symmetrical IP service directly peered with THC routers under{' '}
            <strong className="font-semibold text-brand-600">ASN 24534</strong>, provisioned across all THC
            International gateways for guaranteed throughput and{' '}
            <strong className="font-semibold text-slate-900">99.9% uptime SLA</strong>.
          </p>

          {/* Key Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">1:1</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Symmetrical</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">1 - 10 Gbps</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Bandwidth</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">99.9%</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Uptime SLA</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">24/7/365</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">NOC Support</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs */}
        <div className="mt-10 border-b border-slate-200">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {[
              { id: 'advantage', label: 'Advantage', icon: Sparkles },
              { id: 'service', label: 'Service', icon: Globe },
              { id: 'topology', label: 'Topology', icon: Network },
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

        {/* Tab 1: Advantage */}
        {activeSection === 'advantage' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Why Choose Dedicated Internet
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Enterprise-grade internet built for performance, reliability, and scalability
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 space-y-6">
              <p className="text-[15px] leading-[1.9] text-slate-600">
                Can handle the needs of internet access for various kinds of business sectors with
                super fast bandwidth speed. Reliable, super fast internet connection throughout your
                business location to be able to support the latest technology that suits the
                company&apos;s needs.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 text-white">
                      <Zap className="h-4.5 w-4.5" />
                    </span>
                    <h5 className="font-bold text-sm text-slate-900">Super Fast Bandwidth</h5>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    1:1 symmetrical dedicated bandwidth ensures maximum throughput for
                    data-intensive enterprise operations without sharing with other users.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white">
                      <ShieldCheck className="h-4.5 w-4.5" />
                    </span>
                    <h5 className="font-bold text-sm text-slate-900">99.9% SLA Guarantee</h5>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Industry-leading uptime backed by redundant backbone paths and 24/7 proactive
                    network monitoring from our certified NOC engineers.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
                      <Globe className="h-4.5 w-4.5" />
                    </span>
                    <h5 className="font-bold text-sm text-slate-900">Multi-Sector Ready</h5>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Engineered to support diverse business sectors from finance, healthcare,
                    education, to manufacturing with tailored bandwidth configurations.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-600 text-white">
                      <Server className="h-4.5 w-4.5" />
                    </span>
                    <h5 className="font-bold text-sm text-slate-900">Latest Technology Support</h5>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Full IPv4/IPv6 dual-stack support with BGP routing, enabling seamless
                    integration with cloud, SaaS, and modern enterprise infrastructure.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 2: Service */}
        {activeSection === 'service' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Dedicated Internet Service Tiers
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Choose the plan that best fits your enterprise bandwidth requirements
              </p>
            </div>

            {/* Service Tier Comparison Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200/80 shadow-sm">
              <table className="w-full min-w-[640px] border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="border-b border-slate-200 px-5 py-3.5 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                      Features
                    </th>
                    {serviceTiers.map((tier) => (
                      <th
                        key={tier.name}
                        className={`border-b border-slate-200 px-5 py-3.5 text-center text-xs font-bold uppercase tracking-wider ${
                          tier.highlight
                            ? 'bg-brand-600 text-white'
                            : 'text-slate-700'
                        }`}
                      >
                        {tier.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Sharing Rasio */}
                  <tr className="border-b border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-700">Sharing Rasio</td>
                    {serviceTiers.map((tier) => (
                      <td key={tier.name} className="px-5 py-4 text-center">
                        <span className="font-bold text-slate-900">{tier.sharingRasio}</span>
                        <br />
                        <span className="text-xs text-slate-500">{tier.sharingNote}</span>
                      </td>
                    ))}
                  </tr>

                  {/* Connection / Content */}
                  <tr className="border-b border-slate-100 bg-slate-50/50">
                    <td className="px-5 py-4 font-semibold text-slate-700">Connection / Content</td>
                    {serviceTiers.map((tier) => (
                      <td key={tier.name} className="px-5 py-4 text-center text-slate-600 text-xs">
                        {tier.connection}
                      </td>
                    ))}
                  </tr>

                  {/* International Cable */}
                  <tr className="border-b border-slate-100">
                    <td className="px-5 py-4 font-semibold text-slate-700">International Cable</td>
                    {serviceTiers.map((tier) => (
                      <td key={tier.name} className="px-5 py-4 text-center text-slate-600 text-xs">
                        {tier.internationalCable}
                      </td>
                    ))}
                  </tr>

                  {/* SLA */}
                  <tr>
                    <td className="px-5 py-4 font-semibold text-slate-700">SLA</td>
                    {serviceTiers.map((tier) => (
                      <td key={tier.name} className="px-5 py-4 text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${
                            tier.highlight
                              ? 'bg-brand-100 text-brand-700'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {tier.sla}
                        </span>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Topology */}
        {activeSection === 'topology' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Dedicated Internet Topology
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Network architecture and peering topology for Dedicated Internet service
              </p>
            </div>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/images/topologi_dedicated.webp"
              alt="Dedicated Internet Topology"
              className="w-full rounded-2xl border border-slate-200/80 object-contain shadow-sm"
            />
          </motion.div>
        )}

        {/* Bottom CTA */}
        <div className="mt-12 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-blue-50/50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Ready to Deploy Dedicated Internet?
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Consult with our certified network engineers for enterprise bandwidth quotes and custom provisioning.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/#faq"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-glow-blue transition-all hover:bg-brand-700"
              >
                <span>Request Quote</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
