'use client';

import { useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { Share2, ZoomIn, ZoomOut, Compass, Network, ExternalLink, ShieldCheck, Cpu, ArrowUpRight } from 'lucide-react';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const asNumbers = [
  {
    asn: 'AS 63516',
    title: 'Core Routing & Backbone Transit',
    peeringDb: 'https://www.peeringdb.com/net/8075',
    bgpHe: 'https://bgp.he.net/AS63516#_ix',
    accent: 'border-brand-500 bg-brand-50/50 text-brand-700',
  },
  {
    asn: 'AS 24534',
    title: 'Dedicated Internet & Upstream Peering',
    peeringDb: 'https://www.peeringdb.com/net/14388',
    bgpHe: 'https://bgp.he.net/AS24534#_peers',
    accent: 'border-blue-500 bg-blue-50/50 text-blue-700',
  },
  {
    asn: 'AS 153068',
    title: 'International Submarine & Cloud Exchange',
    peeringDb: 'https://www.peeringdb.com/net/36934',
    bgpHe: 'https://bgp.he.net/AS153068',
    accent: 'border-sky-500 bg-sky-50/50 text-sky-700',
  },
];

const networkMetrics = [
  { label: 'Customer / Member ISPs', value: 'More Than 100 ISPs' },
  { label: 'Capacity Interconnection Cable', value: 'More Than 300 Gbps' },
  { label: 'Capacity Upstream (Intl & Domestic)', value: 'More Than 1 Terabyte (Tbps)' },
  { label: 'PeeringDB Organization', value: 'peeringdb.com/org/11112' },
];

export default function GlobalNetwork() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Share2 className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Global Network & Peering Ecosystem
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Multi-ASN Interconnection, Tier-1 Upstreams & IXPs
              </span>
            </div>
          </div>

          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.85] text-slate-600">
            PT Trans Hybrid Communication maintains open peering relationships with Tier-1 global transit
            providers and premier Internet Exchange Points (IXPs) worldwide, empowering more than 100
            service provider members with resilient low-latency routing.
          </p>
        </motion.div>

        {/* Global Network Topology Image Container */}
        <motion.div {...reveal(0.1)} className="mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            {/* Action Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Compass className="h-4 w-4 text-brand-600" />
                <span>Global Peering & Upstream Topology Schema</span>
              </div>
              <button
                type="button"
                onClick={() => setZoomed((prev) => !prev)}
                className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs transition-colors hover:bg-slate-50 hover:text-brand-600"
              >
                {zoomed ? (
                  <>
                    <ZoomOut className="h-3.5 w-3.5" />
                    <span>Reset View</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="h-3.5 w-3.5" />
                    <span>Enlarge Schema</span>
                  </>
                )}
              </button>
            </div>

            {/* Image viewport */}
            <div className={`overflow-auto p-4 transition-all duration-300 ${zoomed ? 'max-h-[900px]' : 'max-h-[600px]'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/globalnetwork.webp"
                alt="THC Global Network Peering & Upstream Diagram"
                className={`mx-auto rounded-xl object-contain transition-transform duration-300 ${
                  zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setZoomed((prev) => !prev)}
              />
            </div>

            <div className="border-t border-slate-200/80 bg-slate-50/60 px-4 py-2.5 text-center text-xs text-slate-500">
              💡 Click diagram or use toolbar button to toggle zoom view.
            </div>
          </div>
        </motion.div>

        {/* Autonomous Systems (ASNs) Section */}
        <div className="mt-12 border-t border-slate-100 pt-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-brand-600">
              <Cpu className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Official Autonomous System Numbers (ASNs)
              </h3>
              <p className="text-xs text-slate-500">
                Independent BGP routing domains operated by PT Trans Hybrid Communication
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {asNumbers.map((item) => (
              <div
                key={item.asn}
                className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-brand-200 hover:shadow-md"
              >
                <div>
                  <span className="inline-block rounded-lg bg-brand-600 px-3 py-1 text-sm font-black text-white shadow-xs">
                    {item.asn}
                  </span>
                  <h4 className="mt-3 text-sm font-bold text-slate-900">{item.title}</h4>
                </div>

                <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-3 text-xs font-semibold text-brand-600">
                  <a
                    href={item.peeringDb}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-brand-800"
                  >
                    <span>PeeringDB</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  <span className="text-slate-300">•</span>
                  <a
                    href={item.bgpHe}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:text-brand-800"
                  >
                    <span>BGP.HE</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Official Network Capacity Table */}
        <div className="mt-10 border-t border-slate-100 pt-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Network Interconnection & Peering Specifications
          </h3>

          <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50/80 text-xs font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-6 py-3.5">Metric / Parameter</th>
                  <th className="px-6 py-3.5">Capacity & Routing Record</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700">
                {networkMetrics.map((row) => (
                  <tr key={row.label} className="transition-colors hover:bg-slate-50/50">
                    <td className="px-6 py-4 font-semibold text-slate-900">{row.label}</td>
                    <td className="px-6 py-4 font-mono font-medium text-brand-600">{row.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
