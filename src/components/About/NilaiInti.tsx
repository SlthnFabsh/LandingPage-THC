'use client';

import { motion, type MotionProps } from 'framer-motion';
import { Sparkles, HeartHandshake } from 'lucide-react';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

const coreValues = [
  {
    num: 1,
    letter: 'T',
    title: 'TRUST',
    description:
      'Kepercayaan adalah fondasi mendasar dari setiap interaksi di antara personel transhybrid. Kepercayaan dibangun dengan menegakkan integritas, transparansi, dan akuntabilitas, memastikan komunikasi terbuka, keandalan, dan perilaku etis dalam setiap interaksi.',
  },
  {
    num: 2,
    letter: 'C',
    title: 'CUSTOMER CENTRICITY',
    description:
      'Pelanggan adalah jantung dari semua kegiatan. Personel transhybrid secara aktif mendengarkan, memahami kebutuhan mereka, dan memberikan solusi dengan empati sambil terus meningkatkan kualitas layanan untuk melebihi harapan mereka.',
  },
  {
    num: 3,
    letter: 'A',
    title: 'AGILITY',
    description:
      'Personel transhybrid merangkul perubahan dan dengan cepat beradaptasi dengan dinamika pasar dan kemajuan teknologi. Fleksibilitas, pengambilan keputusan proaktif, dan pola pikir pertumbuhan membuat perusahaan tetap kompetitif dan responsif.',
  },
  {
    num: 4,
    letter: 'R',
    title: 'RESULT THROUGH COLLABORATION',
    description:
      'Kolaborasi adalah kunci kesuksesan. Dengan mendorong komunikasi terbuka, saling menghormati, dan tujuan bersama, personel transhybrid bekerja sama baik secara internal maupun dengan mitra eksternal untuk mencapai hasil yang inovatif dan berdampak.',
  },
  {
    num: 5,
    letter: 'E',
    title: 'EXCELLENCE THROUGH INNOVATION',
    description:
      'Inovasi adalah inti dari pencapaian keunggulan. Dengan memanfaatkan teknologi, kreativitas, dan strategi visioner, Insan Transhybrid memberikan solusi transformatif yang terbaik untuk memenuhi kebutuhan pelanggan yang terus berkembang.',
  },
];

export default function NilaiInti() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-soft">
      <div className="p-6 sm:p-8 lg:p-12">
        {/* Header Section */}
        <motion.div {...reveal()} className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-600">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Core Values Culture</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-blue-900 sm:text-4xl lg:text-5xl">
            T.C.A.R.E.
          </h2>

          <p className="mt-2 text-sm font-semibold tracking-wide text-brand-600 sm:text-base">
            (Trust, Customer Centricity, Agility, Result through Collaboration, Excellence through Innovation)
          </p>

          <p className="mx-auto mt-4 max-w-2xl text-[14px] leading-relaxed text-slate-600 sm:text-[15px]">
            Ini adalah nilai-nilai inti yang memandu interaksi dan personel transhybrid langsung dalam
            membangun masa depan yang lebih terhubung dan inovatif untuk Indonesia.
          </p>
        </motion.div>

        {/* Divider */}
        <div className="my-10 h-px bg-slate-100" />

        {/* Values List matching Reference Image 3 */}
        <div className="space-y-6">
          {coreValues.map((value, index) => (
            <motion.div
              key={value.title}
              {...reveal(index * 0.08)}
              className="group flex flex-col sm:flex-row items-start gap-4 sm:gap-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm transition-all duration-300 hover:border-brand-200 hover:bg-brand-50/20 hover:shadow-md"
            >
              {/* Blue Square Number Badge */}
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 shrink-0 items-center justify-center rounded-xl bg-[#0256eb] text-xl sm:text-2xl font-black text-white shadow-glow-blue transition-transform duration-300 group-hover:scale-105">
                {value.num}
              </div>

              {/* Title & Description */}
              <div className="flex-1">
                <h3 className="text-[17px] sm:text-lg font-black tracking-wide text-slate-900 transition-colors group-hover:text-brand-600">
                  {value.title}
                </h3>
                <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.85] text-slate-600">
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
