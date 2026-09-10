'use client';

import { useState } from 'react';
import { motion, type MotionProps } from 'framer-motion';
import { MapPin, ZoomIn, ZoomOut, Maximize2, ShieldCheck, Waves, Compass, Activity } from 'lucide-react';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const keyRoutes = [
  { from: 'Jakarta', to: 'Singapore', cables: 'Jakabare, INDIGO, Matrix, B3JS' },
  { from: 'Pontianak', to: 'Singapore', cables: 'Jasuka, Jakabare' },
  { from: 'Jakarta', to: 'Pontianak', cables: 'Jakabare, Jasuka' },
  { from: 'Singkawang', to: 'Batam', cables: 'Palapa Ring Barat' },
  { from: 'Batam', to: 'Singapore', cables: 'SEAX Cable' },
  { from: 'Biawak', to: 'Kuching', cables: 'Telkom Malaysia Inland' },
  { from: 'Kuching', to: 'Brunei', cables: 'SKR1M' },
  { from: 'Kuching', to: 'Mersing', cables: 'SKR1M' },
  { from: 'Brunei', to: 'Hong Kong', cables: 'SJC, AAG' },
];

export default function NetworkCoverage() {
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <MapPin className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Network Coverage Map
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Inland & Submarine Fiber Optic Infrastructure
              </span>
            </div>
          </div>

          <p className="mt-5 text-[15px] sm:text-[16px] leading-[1.85] text-slate-600">
            PT Trans Hybrid Communication operates an extensive carrier-grade terrestrial and submarine
            fiber optic network spanning across the Indonesian archipelago, with direct redundant
            interconnections to Singapore, Malaysia, Brunei, and Hong Kong.
          </p>
        </motion.div>

        {/* Network Map Image Container */}
        <motion.div {...reveal(0.1)} className="mt-8">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm">
            {/* Map Action Toolbar */}
            <div className="flex items-center justify-between border-b border-slate-200/80 bg-white/90 px-4 py-3 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                <Compass className="h-4 w-4 text-brand-600" />
                <span>Geographical Coverage Diagram</span>
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
                    <span>Enlarge Map</span>
                  </>
                )}
              </button>
            </div>

            {/* Image viewport */}
            <div className={`overflow-auto p-4 transition-all duration-300 ${zoomed ? 'max-h-[850px]' : 'max-h-[560px]'}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/assets/images/coverage.webp"
                alt="THC Network Coverage Map"
                className={`mx-auto rounded-xl object-contain transition-transform duration-300 ${
                  zoomed ? 'scale-125 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setZoomed((prev) => !prev)}
              />
            </div>

            <div className="border-t border-slate-200/80 bg-slate-50/60 px-4 py-2.5 text-center text-xs text-slate-500">
              💡 Click map or use toolbar button to toggle zoom view.
            </div>
          </div>
        </motion.div>

        {/* Strategic Submarine & Inland Route Matrix */}
        <div className="mt-12 border-t border-slate-100 pt-10">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-brand-600">
              <Waves className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                Strategic Submarine & Inland Routes
              </h3>
              <p className="text-xs text-slate-500">
                Redundant multi-system pathing ensuring zero single-point-of-failure
              </p>
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {keyRoutes.map((route) => (
              <div
                key={`${route.from}-${route.to}`}
                className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 transition-all hover:border-brand-200 hover:bg-white hover:shadow-xs"
              >
                <div className="flex items-center justify-between text-xs font-bold text-brand-600">
                  <span>{route.from}</span>
                  <span className="text-slate-400">↔</span>
                  <span>{route.to}</span>
                </div>
                <p className="mt-2 text-xs font-semibold text-slate-700">
                  {route.cables}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Infrastructure Specs */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3 border-t border-slate-100 pt-8">
          <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-xs">
            <span className="text-2xl font-black text-brand-600">99.9%</span>
            <p className="mt-1 text-xs font-semibold text-slate-700">Network Availability SLA</p>
            <p className="text-[11px] text-slate-400">Guaranteed uptime with carrier redundancy</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-xs">
            <span className="text-2xl font-black text-brand-600">&lt; 15 ms</span>
            <p className="mt-1 text-xs font-semibold text-slate-700">Jakarta - Singapore Latency</p>
            <p className="text-[11px] text-slate-400">Sub-millisecond low-jitter transmission</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-white p-4 text-center shadow-xs">
            <span className="text-2xl font-black text-brand-600">100+</span>
            <p className="mt-1 text-xs font-semibold text-slate-700">Nationwide PoPs</p>
            <p className="text-[11px] text-slate-400">Direct gateways & inland access nodes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
