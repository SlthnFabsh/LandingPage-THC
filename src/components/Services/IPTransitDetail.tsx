'use client';

import { useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import {
  Globe,
  Zap,
  ShieldCheck,
  Server,
  Activity,
  CheckCircle2,
  ChevronDown,
  ArrowRight,
  Radio,
  Network,
  Cpu,
  PhoneCall,
  ExternalLink,
  Layers,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

// 12 Advantages from the old website categorized into 4 modern cards
const advantageCategories = [
  {
    category: 'High-Capacity & Symmetrical Bandwidth',
    icon: Zap,
    accent: 'from-blue-600 to-sky-500',
    items: [
      {
        title: '10G - 100G Upstream Capacity',
        desc: 'Massive transit pipeline engineered to effortlessly handle high-volume enterprise traffic spikes without congestion.',
      },
      {
        title: 'Symmetrical 1 - 10 Gbps Upload & Download',
        desc: 'Guaranteed 1:1 symmetrical throughput ensures seamless bidirectional data transfers for cloud and data center hosting.',
      },
      {
        title: 'Enterprise-Grade Business Performance',
        desc: 'Ultra-low jitter and low latency routing specially optimized for mission-critical financial, SaaS, and telco operations.',
      },
    ],
  },
  {
    category: 'Tier-1 Upstreams & Content Peering',
    icon: Globe,
    accent: 'from-brand-600 to-blue-700',
    items: [
      {
        title: 'Multi-Tier-1 Global Upstream Providers',
        desc: 'Redundant peering with premier global carriers (Cogent, Tata, TM, China Mobile) ensuring optimized global routes.',
      },
      {
        title: 'Equinix-IX & SG-IX International Member',
        desc: 'Direct exchange peering in Singapore eliminates unnecessary transit hops and substantially lowers global latency.',
      },
      {
        title: 'Direct IPT to World Top Content Providers',
        desc: 'Direct peering with major hyper-scalers and CDNs including Google, Meta, Microsoft, and Cloudflare.',
      },
    ],
  },
  {
    category: 'Protocol Support & Multi-Path Redundancy',
    icon: Network,
    accent: 'from-indigo-600 to-brand-600',
    items: [
      {
        title: 'Comprehensive IPv4 & IPv6 Dual-Stack',
        desc: 'Full native support for both IPv4 and IPv6 protocols with complete Border Gateway Protocol (BGP) routing tables.',
      },
      {
        title: 'Autonomous Backbone Redundancy',
        desc: 'Multi-ring failover architecture automatically redirects active sessions across alternate backup lines with zero downtime.',
      },
      {
        title: 'Detailed NOC Traffic Utilization Reports',
        desc: 'Granular NetFlow telemetry and monthly bandwidth utilization analytics for capacity planning and compliance.',
      },
    ],
  },
  {
    category: 'Nationwide Presence & 24/7 Certified NOC',
    icon: Server,
    accent: 'from-sky-600 to-blue-600',
    items: [
      {
        title: 'Available Across All THC Nationwide PoPs',
        desc: 'Seamless provisioning across Indonesia with competitive enterprise pricing and carrier-neutral meet-me rooms.',
      },
      {
        title: '24/7/365 Dedicated NOC Support Center',
        desc: 'Continuous proactive monitoring and direct access to CCIE/JNCIE-certified BGP network routing engineers.',
      },
      {
        title: 'ASN 24534 Official BGP Peering',
        desc: 'Registered autonomous system with multi-homing capability, customized BGP communities, and route dampening.',
      },
    ],
  },
];

export default function IPTransitDetail() {
  const [activeSection, setActiveSection] = useState<'advantage' | 'international' | 'domestic' | 'topology'>('advantage');

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-brand-600">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
                <Globe className="h-6 w-6" />
              </span>
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                  IP Transit (ASN 24534)
                </h2>
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                  Global & Domestic BGP Peering Solutions
                </span>
              </div>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-brand-50 border border-brand-200/60 px-3 py-1 text-xs font-bold text-brand-700">
                ASN 24534
              </span>
              <span className="rounded-full bg-emerald-50 border border-emerald-200/60 px-3 py-1 text-xs font-bold text-emerald-700">
                BGP Multi-Homed
              </span>
              <span className="rounded-full bg-blue-50 border border-blue-200/60 px-3 py-1 text-xs font-bold text-blue-700">
                IPv4 & IPv6 Dual-Stack
              </span>
            </div>
          </div>

          {/* Overview Description from Old Website */}
          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.9] text-slate-600 font-normal">
            <strong className="font-semibold text-slate-900">PT Trans Hybrid Communication (THC)</strong> IP Transit
            is an enterprise-grade routing solution designed for both global internet and domestic peering,
            utilizing dedicated IP addresses and autonomous systems with comprehensive{' '}
            <strong className="font-semibold text-slate-900">Border Gateway Protocol (BGP)</strong> configuration
            capabilities. Operating under <strong className="font-semibold text-brand-600">ASN 24534</strong>, our
            IP Transit service provides mission-critical reliability backed by redundant leased line backbones,
            integrated international and domestic IP rings, and continuous 24/7 technical oversight from our certified
            networking team.
          </p>

          {/* Key Metrics Bar */}
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">10G - 100G</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Upstream Capacity</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">1 - 10 Gbps</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Symmetrical 1:1</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">99.9%</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Uptime SLA</p>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 text-center">
              <span className="text-xl sm:text-2xl font-black text-brand-600">24/7/365</span>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mt-0.5">Certified NOC</p>
            </div>
          </div>
        </motion.div>

        {/* Navigation Tabs for the 4 Sections */}
        <div className="mt-10 border-b border-slate-200">
          <div className="flex flex-wrap gap-2 sm:gap-4">
            {[
              { id: 'advantage', label: 'Key Advantages', icon: Sparkles },
              { id: 'international', label: 'International IP Transit', icon: Globe },
              { id: 'domestic', label: 'Domestic IP Transit', icon: Server },
              { id: 'topology', label: 'Topology & Architecture', icon: Network },
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

        {/* Tab 1: Key Advantages (12 Points from Old Website) */}
        {activeSection === 'advantage' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-8"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Comprehensive Technical Advantages
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                The 12 core advantages that make THC IP Transit the preferred choice for ISPs and large enterprises
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {advantageCategories.map((cat, idx) => {
                const CatIcon = cat.icon;
                return (
                  <motion.div
                    key={cat.category}
                    {...reveal(idx * 0.08)}
                    className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-6 transition-all hover:border-brand-200 hover:bg-white hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.accent} text-white shadow-sm`}>
                        <CatIcon className="h-5 w-5" />
                      </span>
                      <h4 className="text-[16px] font-bold text-slate-900">{cat.category}</h4>
                    </div>

                    <ul className="mt-5 space-y-4">
                      {cat.items.map((item) => (
                        <li key={item.title} className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-bold text-slate-800">{item.title}</p>
                            <p className="text-xs leading-relaxed text-slate-500 mt-0.5">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Tab 2: International IP Transit Service */}
        {activeSection === 'international' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                International IP Transit Service
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Direct global routing connecting Indonesian enterprises to Tier-1 international backbones
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 space-y-6">
              <p className="text-[15px] leading-relaxed text-slate-600">
                THC International IP Transit delivers carrier-grade global connectivity through diverse, low-latency
                submarine cable pathways including Jakabare, INDIGO, SEAX, Matrix, and B3JS. Our routing is engineered
                to ensure packets take the shortest possible AS path to global destinations.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <h5 className="font-bold text-sm text-slate-900">Global Upstream Tier-1</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct multi-homing with Cogent, Tata Communications, Telekom Malaysia, and China Mobile.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <h5 className="font-bold text-sm text-slate-900">International IX Peering</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct member at Equinix-IX (Singapore), SG-IX, and DE-CIX with multi-Gigabit peering capacity.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <h5 className="font-bold text-sm text-slate-900">Content Acceleration</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Sub-15ms round-trip latency to Singapore cloud regions and international SaaS providers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 3: Domestic IP Transit Service */}
        {activeSection === 'domestic' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                Domestic IP Transit Service
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Optimized national routing interconnecting major Indonesian Internet Exchanges and eyeball networks
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200/80 bg-white p-6 sm:p-8 space-y-6">
              <p className="text-[15px] leading-relaxed text-slate-600">
                Our Domestic IP Transit service ensures your users experience sub-millisecond local latency. By
                maintaining active multi-Gigabit peering with Indonesia Internet Exchange (IIX), OpenIXP, and
                commercial exchange points, domestic traffic remains within the country without international trombone routing.
              </p>

              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <h5 className="font-bold text-sm text-slate-900">National Exchange Points</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Direct interconnects at IIX, OpenIXP, neuCentrIX, JKT-IX, and CDIX.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <h5 className="font-bold text-sm text-slate-900">Local Loop Density</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    High-speed fiber connectivity spanning Java, Sumatera, Borneo, and Sulawesi domestic backbones.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                  <h5 className="font-bold text-sm text-slate-900">Sub-5ms Domestic Latency</h5>
                  <p className="text-xs text-slate-500 mt-1">
                    Lightning-fast communication between enterprise headquarters, branches, and national data centers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Tab 4: Topology & Architecture */}
        {activeSection === 'topology' && (
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-8 space-y-6"
          >
            <div>
              <h3 className="text-xl font-bold text-slate-900">
                IP Transit Architecture & Peering Topology
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                Visualizing the multi-homed BGP routing path from Customer Edge to Global Upstreams
              </p>
            </div>

            {/* Visual Topology Diagram */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-slate-900 p-6 text-white sm:p-8">
              <div className="min-w-[680px] flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  {/* Customer Edge */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-20 w-32 flex-col items-center justify-center rounded-2xl border border-slate-700 bg-slate-800 p-2 text-center shadow-sm">
                      <Server className="h-6 w-6 text-emerald-400" />
                      <span className="text-xs font-bold text-white mt-1">Customer Edge (CE)</span>
                      <span className="text-[10px] text-slate-400">Customer ASN</span>
                    </div>
                  </div>

                  {/* Redundant Connection */}
                  <div className="flex flex-col items-center text-sky-400">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      BGP Peering Session
                    </span>
                    <div className="h-0.5 w-24 bg-gradient-to-r from-emerald-400 via-sky-400 to-brand-500" />
                    <span className="text-[9px] text-slate-400 mt-0.5">Dual Leased Line</span>
                  </div>

                  {/* THC Core Router */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-24 w-40 flex-col items-center justify-center rounded-2xl border-2 border-brand-500 bg-[#12285e] p-2 text-center shadow-glow-blue">
                      <Network className="h-7 w-7 text-sky-400" />
                      <span className="text-xs font-black text-white mt-1">THC Provider Edge</span>
                      <span className="text-[11px] font-bold text-amber-300">ASN 24534</span>
                    </div>
                  </div>

                  {/* Forwarding Lines */}
                  <div className="flex flex-col items-center text-sky-400">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      Full BGP Tables
                    </span>
                    <div className="h-0.5 w-24 bg-gradient-to-r from-brand-500 via-purple-400 to-rose-400" />
                    <span className="text-[9px] text-slate-400 mt-0.5">10G - 100G Upstream</span>
                  </div>

                  {/* Upstream & IXP Cloud */}
                  <div className="flex flex-col gap-2">
                    <div className="rounded-xl border border-purple-500/40 bg-purple-950/50 px-4 py-2 text-center">
                      <span className="block text-xs font-bold text-purple-200">Global Tier-1 Upstreams</span>
                      <span className="text-[10px] text-purple-300">Cogent • Tata • TM • China Mobile</span>
                    </div>
                    <div className="rounded-xl border border-sky-500/40 bg-sky-950/50 px-4 py-2 text-center">
                      <span className="block text-xs font-bold text-sky-200">International & Domestic IXPs</span>
                      <span className="text-[10px] text-sky-300">Equinix-IX • SG-IX • IIX • OpenIXP</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA / Consultation Card */}
        <div className="mt-12 rounded-2xl border border-brand-100 bg-gradient-to-r from-brand-50 via-white to-blue-50/50 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h4 className="text-lg font-bold text-slate-900">
                Ready to Configure Your BGP Peering Session?
              </h4>
              <p className="text-sm text-slate-600 mt-1">
                Consult with our certified network engineers to obtain IP Transit bandwidth quotas, ASN cross-connects, and competitive enterprise rates.
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <Link
                href="/#faq"
                className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-glow-blue transition-all hover:bg-brand-700"
              >
                <span>Request BGP Quote</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
