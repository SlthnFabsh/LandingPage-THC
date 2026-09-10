'use client';

import { useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { Server, ZoomIn, ZoomOut, Compass, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const backboneRegions = [
  {
    name: 'Java Domestic Backbone',
    hub: 'Jakarta (Central Gateway)',
    nodes: ['Banten', 'Bekasi', 'Cianjur', 'Indramayu', 'Depok', 'Bogor', 'Ciawi', 'Bandung', 'Cirebon', 'Surabaya'],
    accent: 'border-brand-500 bg-brand-50/40 text-brand-700',
  },
  {
    name: 'Sumatera Domestic Backbone',
    hub: 'Batam (International Hub)',
    nodes: ['Medan', 'Palembang', 'Jambi', 'Lampung', 'Padang'],
    accent: 'border-blue-500 bg-blue-50/40 text-blue-700',
  },
  {
    name: 'Borneo Domestic Backbone',
    hub: 'Pontianak (Regional Hub)',
    nodes: ['Aruk', 'Sambas', 'Singkawang', 'Mempawah', 'Entikong', 'Sintang', 'Sanggau', 'Samarinda', 'Balikpapan'],
    accent: 'border-emerald-500 bg-emerald-50/40 text-emerald-700',
  },
  {
    name: 'East & West Malaysia Backbone',
    hub: 'Kuching & Mersing Gateways',
    nodes: ['Kuching', 'Bintulu', 'Miri', 'Brunei', 'Mersing', 'Singapore'],
    accent: 'border-amber-500 bg-amber-50/40 text-amber-700',
  },
  {
    name: 'Sulawesi Domestic Backbone',
    hub: 'Makassar (Eastern Hub)',
    nodes: ['Makassar', 'Palopo'],
    accent: 'border-purple-500 bg-purple-50/40 text-purple-700',
  },
];

export default function HubPoP() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Server className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Hub & Point of Presence (PoP)
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Hierarchical Domestic & Cross-Border Backbone Topology
              </span>
            </div>
          </div>

          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.85] text-slate-600">
            A comprehensive architectural view of PT Trans Hybrid Communication regional backbone rings,
            showcasing central interconnection hubs in Jakarta, Batam, and Pontianak linked directly to
            domestic regional networks and international submarine landing stations.
          </p>
        </motion.div>

        {/* Hub & PoP Architecture Diagram Image */}
        <motion.div {...reveal(0.1)} className="mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            {/* Action Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Compass className="h-4 w-4 text-brand-600" />
                <span>Regional Backbone Topology Schema</span>
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
            <div className={`overflow-auto p-4 transition-all duration-300 ${zoomed ? 'max-h-[850px]' : 'max-h-[560px]'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/hubpop.webp"
                alt="THC Hub & Point of Presence Architecture Diagram"
                className={`mx-auto rounded-xl object-contain transition-transform duration-300 ${
                  zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setZoomed((prev) => !prev)}
              />
            </div>

            <div className="border-t border-slate-200/80 bg-slate-50/60 px-4 py-2.5 text-center text-xs text-slate-500">
              💡 Click schema or use toolbar button to toggle zoom view.
            </div>
          </div>
        </motion.div>

        {/* Regional Backbone Breakdown Cards */}
        <div className="mt-12 border-t border-slate-100 pt-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-brand-600">
              <Layers className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Regional Backbone Infrastructure Details
              </h3>
              <p className="text-xs text-slate-500">
                Segmented ring protection with autonomous route failovers across all major islands
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {backboneRegions.map((region) => (
              <div
                key={region.name}
                className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs transition-all hover:border-brand-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-900">{region.name}</h4>
                  <span className={`rounded-md border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${region.accent}`}>
                    Active
                  </span>
                </div>
                <p className="mt-1.5 text-xs font-semibold text-brand-600">
                  Hub: {region.hub}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
                  {region.nodes.map((node) => (
                    <span
                      key={node}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
