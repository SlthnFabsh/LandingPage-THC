'use client';

import { motion, type MotionProps } from 'framer-motion';
import { Radio } from 'lucide-react';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

export default function ThcIxDetial() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <Radio className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                THC IX
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Internet Exchange Peering
              </span>
            </div>
          </div>

          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.9] text-slate-600 font-normal">
            A high-capacity internet exchange service that optimizes domestic traffic routing, reduces
            upstream transit latency, and ensures resilient, high-speed direct interconnection across
            national peering points.
          </p>
        </motion.div>

        {/* Topology Image */}
        <motion.div {...reveal(0.1)} className="mt-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/thcix.webp"
            alt="THC IX Internet Exchange Peering Topology"
            className="w-full rounded-2xl border border-slate-200/80 object-contain shadow-sm"
          />
        </motion.div>
      </div>
    </div>
  );
}
