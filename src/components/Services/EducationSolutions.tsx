'use client';

import { motion, type MotionProps } from 'framer-motion';
import {
  GraduationCap,
  Leaf,
  PiggyBank,
  Smartphone,
  LayoutDashboard,
  Clock4,
  BookOpenCheck,
  Eye,
  Lock,
} from 'lucide-react';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const smartSchoolBenefits = [
  { label: 'Go Green Go Paperless', icon: Leaf },
  { label: 'Penghematan Biaya', icon: PiggyBank },
  { label: 'Mobile Application', icon: Smartphone },
  { label: 'School Dashboard System', icon: LayoutDashboard },
  { label: 'Kapanpun & dimanapun', icon: Clock4 },
  { label: 'Terintegrasi E-learning', icon: BookOpenCheck },
  { label: 'Transparasi Data', icon: Eye },
  { label: 'Keamanan Data', icon: Lock },
];

export default function EducationSolutions() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="border-b border-slate-100 pb-8">
          <div className="flex items-center gap-3 text-brand-600">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 shadow-sm">
              <GraduationCap className="h-6 w-6" />
            </span>
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-blue-900 sm:text-3xl">
                Education Solutions
              </h2>
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-600">
                Universities & K-12 Smart Schools
              </span>
            </div>
          </div>

          <p className="mt-6 text-[15px] sm:text-[16px] leading-[1.9] text-slate-600 font-normal">
            We support to advance the education sector using high-speed internet, reliable wifi by
            integrating our applications and systems to school systems and devices, in the right way
            towards a greater school.
          </p>
        </motion.div>

        {/* Education Service Solution */}
        <motion.div {...reveal(0.1)} className="mt-10 rounded-2xl border border-slate-200/80 bg-slate-50/50 p-6 sm:p-8">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
            Education Service Solution
          </span>
          <p className="mt-4 text-[15px] sm:text-[16px] leading-[1.9] text-slate-600 font-normal">
            We support to advance the education sector using high-speed internet, reliable wifi by
            integrating our applications and systems to school systems and devices, in the right way
            towards a greater school.
          </p>
        </motion.div>

        {/* Smart School Benefits */}
        <motion.div {...reveal(0.15)} className="mt-10">
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600">
            Smart School Benefits
          </span>

          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {smartSchoolBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.label}
                  className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200/80 bg-white p-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition-colors group-hover:bg-brand-600 group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-[12.5px] font-bold leading-snug text-slate-700">
                    {benefit.label}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}