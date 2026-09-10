'use client';

import { motion, type MotionProps } from 'framer-motion';
import { GitFork, Network, Building2, CheckCircle2 } from 'lucide-react';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
});

export default function StrukturGrup() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header - Corporate Style */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <GitFork className="h-5 w-5" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Struktur Grup Perusahaan
              </h2>
              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                Bagan hierarki kepemilikan dan afiliasi strategis di bawah naungan PT Trans Hybrid Communication
              </p>
            </div>
          </div>
        </motion.div>

        {/* Interactive Org Chart Diagram */}
        <div className="mt-12 overflow-x-auto pb-4">
          <div className="min-w-[560px] flex flex-col items-center">
            {/* Parent Node */}
            <motion.div
              {...reveal(0.1)}
              className="group relative flex flex-col items-center"
            >
              <div className="relative flex min-h-[84px] w-[300px] flex-col items-center justify-center rounded-2xl border-2 border-brand-800 bg-[#1f3882] px-6 py-4 text-center text-white shadow-[0_10px_25px_rgba(31,56,130,0.35)] transition-transform duration-300 group-hover:scale-105">
                <span className="absolute -top-3 rounded-full bg-brand-500 px-3 py-0.5 text-[10px] font-extrabold uppercase tracking-widest text-white shadow-sm">
                  Holding / Induk Perusahaan
                </span>
                <span className="text-[15px] font-black uppercase tracking-wider">
                  PT TRANS HYBRID COMMUNICATION
                </span>
                <span className="mt-1 text-[11px] font-medium text-blue-200">
                  Network Access Provider & Telecommunications
                </span>
              </div>
            </motion.div>

            {/* Tree Branch Connectors */}
            <div className="flex flex-col items-center">
              {/* Vertical connector from parent */}
              <div className="h-10 w-0.5 bg-gradient-to-b from-[#1f3882] to-[#1d68b8]" />

              {/* Horizontal bar */}
              <div className="relative w-[380px] sm:w-[440px]">
                <div className="h-0.5 w-full bg-[#1d68b8]" />
                {/* Left Drop Point */}
                <div className="absolute -left-0.5 top-0 h-10 w-0.5 bg-[#1d68b8]" />
                {/* Right Drop Point */}
                <div className="absolute -right-0.5 top-0 h-10 w-0.5 bg-[#009fe3]" />
              </div>

              {/* Children Nodes */}
              <div className="flex w-[480px] sm:w-[540px] items-start justify-between pt-10">
                {/* Child 1: Dukodu */}
                <motion.div
                  {...reveal(0.2)}
                  className="group flex flex-col items-center"
                >
                  <div className="relative flex min-h-[82px] w-[210px] sm:w-[230px] flex-col items-center justify-center rounded-2xl border-2 border-blue-600 bg-[#1d68b8] px-4 py-4 text-center text-white shadow-[0_8px_20px_rgba(29,104,184,0.3)] transition-transform duration-300 group-hover:scale-105">
                    <span className="text-[14px] font-black uppercase tracking-wider">
                      DUKODU
                    </span>
                    <span className="text-[12px] font-bold uppercase tracking-wide text-sky-200">
                      DIGITAL SOLUTION
                    </span>
                  </div>
                </motion.div>

                {/* Child 2: THC Digital Solution */}
                <motion.div
                  {...reveal(0.3)}
                  className="group flex flex-col items-center"
                >
                  <div className="relative flex min-h-[82px] w-[210px] sm:w-[230px] flex-col items-center justify-center rounded-2xl border-2 border-sky-400 bg-[#009fe3] px-4 py-4 text-center text-white shadow-[0_8px_20px_rgba(0,159,227,0.3)] transition-transform duration-300 group-hover:scale-105">
                    <span className="text-[13px] font-black uppercase tracking-wider leading-tight">
                      TRANS HYBRID COMMUNICATION
                    </span>
                    <span className="mt-0.5 text-[12px] font-bold uppercase tracking-wide text-blue-950">
                      DIGITAL SOLUTION
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* Explanation / Entity Cards */}
        <div className="mt-14 border-t border-slate-100 pt-8">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
            Keterangan Entitas Bisnis
          </h3>

          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#1f3882]" />
                <span className="text-xs font-bold text-slate-800">THC Parent</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Penyedia infrastruktur jaringan internet, serat optik, NAP, dan ISP skala korporasi & BUMN.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#1d68b8]" />
                <span className="text-xs font-bold text-slate-800">Dukodu</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Unit transformasi digital & pengembangan solusi software kustom untuk kebutuhan bisnis modern.
              </p>
            </div>

            <div className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#009fe3]" />
                <span className="text-xs font-bold text-slate-800">THC Digital</span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-600">
                Layanan integrasi komunikasi terpadu, managed ICT services, dan connectivity digital suite.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
