'use client';

import { motion, type MotionProps } from 'framer-motion';
import { GitFork } from 'lucide-react';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

// Company node component
function Node({
  label,
  variant = 'primary',
}: {
  label: string | string[];
  variant?: 'primary' | 'secondary' | 'tertiary';
}) {
  const styles = {
    primary:
      'bg-[#1a237e] text-white shadow-[0_8px_32px_rgba(26,35,126,0.45)] border-[#3949ab]/60',
    secondary:
      'bg-[#1565c0] text-white shadow-[0_6px_24px_rgba(21,101,192,0.35)] border-[#1976d2]/60',
    tertiary:
      'bg-[#0097a7] text-white shadow-[0_6px_20px_rgba(0,151,167,0.3)] border-[#00acc1]/60',
  };

  return (
    <div
      className={`flex min-h-[72px] w-[200px] items-center justify-center rounded-2xl border px-4 py-3 text-center text-sm font-bold uppercase leading-snug tracking-wide ${styles[variant]}`}
    >
      {Array.isArray(label) ? (
        <span>
          {label.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </span>
      ) : (
        label
      )}
    </div>
  );
}

export default function StrukturGrup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="px-6 py-10 sm:px-8 md:py-14">
        {/* Section Header */}
        <motion.div {...reveal()} className="mb-14 md:mb-20">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow-blue">
              <GitFork className="h-5 w-5" />
            </span>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold tracking-[-0.02em] text-blue-900">
              Struktur Grup Perusahaan
            </h2>
          </div>
          <p className="max-w-2xl text-[15px] leading-[1.85] text-slate-500">
            Berikut adalah struktur kepemilikan grup PT Trans Hybrid Communication beserta anak
            perusahaannya.
          </p>
        </motion.div>

        {/* Org Chart */}
        <motion.div
          {...reveal(0.1)}
          className="flex flex-col items-center"
        >
          {/* Parent */}
          <Node label={['PT TRANS HYBRID', 'COMMUNICATION']} variant="primary" />

          {/* Connector line from parent down */}
          <div className="flex flex-col items-center">
            <div className="h-10 w-px bg-gradient-to-b from-[#1a237e]/60 to-[#1565c0]/40" />

            {/* Horizontal bridge */}
            <div className="relative flex items-start justify-center gap-16 sm:gap-24 md:gap-40">
              {/* Left vertical drop */}
              <div className="flex flex-col items-center">
                <div className="h-10 w-px bg-[#1565c0]/50" />
                <Node label={['DUKODU', 'DIGITAL SOLUTION']} variant="secondary" />
              </div>

              {/* Horizontal connector bar */}
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-[#1565c0]/50 via-[#1565c0]/30 to-[#0097a7]/50" />

              {/* Right vertical drop */}
              <div className="flex flex-col items-center">
                <div className="h-10 w-px bg-[#0097a7]/50" />
                <Node
                  label={['TRANS HYBRID', 'COMMUNICATION', 'DIGITAL SOLUTION']}
                  variant="tertiary"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Legend / description */}
        <motion.div
          {...reveal(0.25)}
          className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-20 md:grid-cols-3"
        >
          {[
            {
              color: 'bg-[#1a237e]',
              title: 'PT Trans Hybrid Communication',
              desc: 'Perusahaan induk yang menaungi seluruh unit bisnis grup.',
            },
            {
              color: 'bg-[#1565c0]',
              title: 'Dukodu Digital Solution',
              desc: 'Anak perusahaan yang bergerak di bidang solusi digital & software.',
            },
            {
              color: 'bg-[#0097a7]',
              title: 'Trans Hybrid Communication Digital Solution',
              desc: 'Anak perusahaan yang bergerak di bidang solusi digital komunikasi.',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-soft"
            >
              <span className={`mt-1 h-3 w-3 shrink-0 rounded-full ${item.color}`} />
              <div>
                <p className="text-sm font-semibold text-slate-800">{item.title}</p>
                <p className="mt-0.5 text-[13px] leading-snug text-slate-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>

  );
}
