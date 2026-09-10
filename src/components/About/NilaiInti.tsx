'use client';

import { motion, type MotionProps } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay },
});

const coreValues = [
  {
    letter: 'T',
    title: 'Trust',
    color: 'bg-brand-600',
    description:
      'Kepercayaan adalah fondasi mendasar dari setiap interaksi di antara personel transhybrid. Kepercayaan dibangun dengan menegakkan integritas, transparansi, dan akuntabilitas, memastikan komunikasi terbuka, keandalan, dan perilaku etis dalam setiap interaksi.',
  },
  {
    letter: 'C',
    title: 'Customer Centricity',
    color: 'bg-blue-600',
    description:
      'Pelanggan adalah jantung dari semua kegiatan. Personel transhybrid secara aktif mendengarkan, memahami kebutuhan mereka, dan memberikan solusi dengan empati sambil terus meningkatkan kualitas layanan untuk melebihi harapan mereka.',
  },
  {
    letter: 'A',
    title: 'Agility',
    color: 'bg-indigo-600',
    description:
      'Personel transhybrid merangkul perubahan dan dengan cepat beradaptasi dengan dinamika pasar dan kemajuan teknologi. Fleksibilitas, pengambilan keputusan proaktif, dan pola pikir pertumbuhan membuat perusahaan tetap kompetitif dan responsif.',
  },
  {
    letter: 'R',
    title: 'Result through Collaboration',
    color: 'bg-violet-600',
    description:
      'Kolaborasi adalah kunci kesuksesan. Dengan mendorong komunikasi terbuka, saling menghormati, dan tujuan bersama, personel transhybrid bekerja sama baik secara internal maupun dengan mitra eksternal untuk mencapai hasil yang inovatif dan berdampak.',
  },
  {
    letter: 'E',
    title: 'Excellence through Innovation',
    color: 'bg-purple-700',
    description:
      'Inovasi adalah inti dari pencapaian keunggulan. Dengan memanfaatkan teknologi, kreativitas, dan strategi visioner, Insan Transhybrid memberikan solusi transformatif yang terbaik untuk memenuhi kebutuhan pelanggan yang terus berkembang.',
  },
];

export default function NilaiInti() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="px-6 py-10 sm:px-8 md:py-14">
        {/* Section Header */}
        <motion.div {...reveal()} className="mb-12 md:mb-16">
          <div className="mb-5 flex items-center gap-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow-blue">
              <Sparkles className="h-5 w-5" />
            </span>
            <h2 className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-bold tracking-[-0.02em] text-blue-900">
              Nilai Inti
            </h2>
          </div>

          {/* T.C.A.R.E. Hero */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-brand-100/80 bg-gradient-to-br from-brand-600 to-blue-700 p-8 shadow-glow-blue-lg sm:p-10">
            <p className="text-center text-[clamp(3rem,8vw,5rem)] font-black tracking-[0.1em] text-white">
              T.C.A.R.E.
            </p>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm font-medium text-blue-100/90 sm:text-[15px]">
              Trust, Customer Centricity, Agility, Result through Collaboration, Excellence through
              Innovation
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-center text-[13px] leading-[1.8] text-blue-100/75 sm:text-sm">
              Ini adalah nilai-nilai inti yang memandu interaksi dan personel transhybrid langsung
              dalam membangun masa depan yang lebih terhubung dan inovatif untuk Indonesia.
            </p>
          </div>
        </motion.div>

        {/* Values List */}
        <div className="space-y-4">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.letter}
              {...reveal(index * 0.08)}
              className="group flex items-start gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-soft transition-all duration-300 hover:border-brand-200 hover:shadow-[0_8px_32px_rgba(2,86,235,0.10)] sm:p-6"
            >
              {/* Number + Letter Badge */}
              <div className="flex shrink-0 flex-col items-center gap-1.5">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-xl text-xl font-black text-white shadow-glow-blue ${value.color}`}
                >
                  {index + 1}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {value.letter}
                </span>
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1 pt-1">
                <h3 className="text-lg font-bold uppercase tracking-wide text-blue-900 sm:text-xl">
                  {value.title}
                </h3>
                <p className="mt-2 text-[14px] leading-[1.85] text-slate-600 sm:text-[15px]">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

  );
}
