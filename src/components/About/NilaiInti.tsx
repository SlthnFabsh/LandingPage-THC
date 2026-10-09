'use client';

import { motion, type MotionProps } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const reveal = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1], delay },
});

export interface NilaiIntiValue {
  num: number;
  letter: string;
  titleId: string;
  titleEn: string;
  descriptionId: string;
  descriptionEn: string;
}

const coreValues: NilaiIntiValue[] = [
  {
    num: 1,
    letter: 'T',
    titleId: 'KEPERCAYAAN',
    titleEn: 'TRUST',
    descriptionId:
      'Kepercayaan adalah fondasi mendasar dari setiap interaksi di antara personel transhybrid. Kepercayaan dibangun dengan menegakkan integritas, transparansi, dan akuntabilitas, memastikan komunikasi terbuka, keandalan, dan perilaku etis dalam setiap interaksi.',
    descriptionEn:
      'Trust is the fundamental foundation of every interaction among transhybrid personnel. Trust is built by upholding integrity, transparency, and accountability, ensuring open communication, reliability, and ethical behavior in every interaction.',
  },
  {
    num: 2,
    letter: 'C',
    titleId: 'BERFOKUS PADA PELANGGAN',
    titleEn: 'CUSTOMER CENTRICITY',
    descriptionId:
      'Pelanggan adalah jantung dari semua kegiatan. Personel transhybrid secara aktif mendengarkan, memahami kebutuhan mereka, dan memberikan solusi dengan empati sambil terus meningkatkan kualitas layanan untuk melebihi harapan mereka.',
    descriptionEn:
      'Customers are the heart of all activities. Transhybrid personnel actively listen, understand their needs, and provide solutions with empathy while continuously improving service quality to exceed their expectations.',
  },
  {
    num: 3,
    letter: 'A',
    titleId: 'KELINCAHAN',
    titleEn: 'AGILITY',
    descriptionId:
      'Personel transhybrid merangkul perubahan dan dengan cepat beradaptasi dengan dinamika pasar dan kemajuan teknologi. Fleksibilitas, pengambilan keputusan proaktif, dan pola pikir pertumbuhan membuat perusahaan tetap kompetitif dan responsif.',
    descriptionEn:
      'Transhybrid personnel embrace change and quickly adapt to market dynamics and technological advances. Flexibility, proactive decision-making, and a growth mindset keep the company competitive and responsive.',
  },
  {
    num: 4,
    letter: 'R',
    titleId: 'HASIL MELALUI KOLABORASI',
    titleEn: 'RESULT THROUGH COLLABORATION',
    descriptionId:
      'Kolaborasi adalah kunci kesuksesan. Dengan mendorong komunikasi terbuka, saling menghormati, dan tujuan bersama, personel transhybrid bekerja sama baik secara internal maupun dengan mitra eksternal untuk mencapai hasil yang inovatif dan berdampak.',
    descriptionEn:
      'Collaboration is the key to success. By fostering open communication, mutual respect, and shared goals, transhybrid personnel work together both internally and with external partners to achieve innovative and impactful results.',
  },
  {
    num: 5,
    letter: 'E',
    titleId: 'KEUNGGULAN MELALUI INOVASI',
    titleEn: 'EXCELLENCE THROUGH INNOVATION',
    descriptionId:
      'Inovasi adalah inti dari pencapaian keunggulan. Dengan memanfaatkan teknologi, kreativitas, dan strategi visioner, Insan Transhybrid memberikan solusi transformatif yang terbaik untuk memenuhi kebutuhan pelanggan yang terus berkembang.',
    descriptionEn:
      'Innovation is the core of achieving excellence. By leveraging technology, creativity, and visionary strategies, Transhybrid people deliver the best transformative solutions to meet evolving customer needs.',
  },
];

const defaultIntro = {
  id: 'Ini adalah nilai-nilai inti yang memandu interaksi dan personel transhybrid dalam membangun masa depan yang lebih terhubung dan inovatif untuk Indonesia.',
  en: 'These are the core values that guide transhybrid personnel in building a more connected and innovative future for Indonesia.',
};

export default function NilaiInti({
  values,
  introId,
  introEn,
}: {
  values?: NilaiIntiValue[];
  introId?: string;
  introEn?: string;
}) {
  const { lang } = useLanguage();
  const data = values && values.length ? values : coreValues;
  const introText = lang === 'id' ? introId?.trim() || defaultIntro.id : introEn?.trim() || defaultIntro.en;

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
            {introText}
          </p>
        </motion.div>

        {/* Divider */}
        <div className="my-10 h-px bg-slate-100" />

        {/* Values List */}
        <div className="space-y-6">
          {data.map((value, index) => {
            const title = lang === 'id' ? value.titleId : value.titleEn;
            const description = lang === 'id' ? value.descriptionId : value.descriptionEn;
            return (
              <motion.div
                key={`${value.letter}-${index}`}
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
                    {title}
                  </h3>
                  <p className="mt-2 text-[14px] sm:text-[15px] leading-[1.85] text-slate-600">
                    {description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}