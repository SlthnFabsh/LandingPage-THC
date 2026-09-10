'use client';

import { motion } from 'framer-motion';

export default function TentangLoading() {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-white/95 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="flex flex-col items-center"
      >
        {/* THC Logo with swift breathing animation */}
        <div className="relative mb-5 flex items-center justify-center">
          {/* Subtle brand glow behind logo */}
          <div className="absolute h-16 w-36 rounded-full bg-brand-500/15 blur-xl animate-pulse" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/images/logo1.webp"
            alt="THC Logo"
            className="relative h-14 w-auto object-contain sm:h-16"
          />
        </div>

        {/* Ultra-sleek fast loading track */}
        <div className="relative h-1 w-32 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-full origin-left bg-gradient-to-r from-brand-600 via-sky-400 to-brand-600 animate-[loadingBar_0.8s_ease-in-out_infinite]" />
        </div>

        {/* Loading text */}
        <p className="mt-3 text-[11px] font-bold uppercase tracking-[0.25em] text-slate-400">
          MEMUAT...
        </p>
      </motion.div>
    </div>
  );
}
