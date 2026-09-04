'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import NoiseOverlay from '@/components/NoiseOverlay';

interface Milestone {
  year: string;
  title: string;
  points: string[];
}

const milestones: Milestone[] = [
  {
    year: '2006',
    title: 'Founded as a NAP',
    points: ['Trans Hybrid Communication founded as a Network Access Provider (NAP).'],
  },
  {
    year: '2017',
    title: 'Start of the Information Journey',
    points: ['New license: Fixed Closed Network (Jartatup).'],
  },
  {
    year: '2018',
    title: 'New International License',
    points: ['New international network license (Jartatup International).'],
  },
  {
    year: '2019',
    title: 'Expansion & New Licenses',
    points: [
      'New license: Internet Service Provider (ISP).',
      'Completion of the Kalbar Backbone.',
      'New expansion project: Cyber 1-IDC Fiber Backhaul.',
    ],
  },
  {
    year: '2020',
    title: 'New Coverage Licenses',
    points: [
      'New license: FTTH (Jartaplok).',
      'New expansion project: Rural Penetration Using Wireless.',
    ],
  },
  {
    year: '2021',
    title: 'City Fiber Rollout',
    points: [
      'FTTH rollout in 2 cities.',
      'New connection to Singapore–Jakarta.',
      'New diversity link Jakarta–Singapore.',
      'New expansion project: 50 towers.',
    ],
  },
  {
    year: '2022',
    title: 'Backbone Expansion',
    points: [
      'Project TBK023.',
      'FTTH rollout Depok–Bogor.',
      'Mempawah–Sintang Backbone.',
    ],
  },
];

export default function Milestones() {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden bg-brand-950 py-20 text-white md:py-28">
      {/* Decorations */}
      <div className="hero-grid-pattern absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="pointer-events-none absolute -left-32 top-16 h-80 w-80 rounded-full bg-[#0256eb]/20 blur-[130px]" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#63a9ff]/10 blur-[150px]" aria-hidden="true" />
      <NoiseOverlay />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#63a9ff] sm:text-xs"
          >
            <span className="h-2 w-2 rounded-full bg-[#e83b42]" />
            {t('about.timelineEyebrow')}
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-white"
          >
            {t('about.timeline')}
          </motion.h2>
        </div>

        {/* Timeline */}
        <div className="relative mx-auto mt-14 max-w-5xl md:mt-20">
          {/* Vertical track */}
          <div
            className="pointer-events-none absolute bottom-4 left-[19px] top-4 w-px bg-gradient-to-b from-transparent via-[#63a9ff]/50 to-transparent md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol>
            {milestones.map((milestone, index) => {
              const onLeft = index % 2 === 0;
              return (
                <li key={milestone.year} className="relative md:grid md:grid-cols-2 md:gap-x-28">
                  {/* Node */}
                  <span
                    className="absolute left-[19px] top-6 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border border-[#63a9ff]/60 bg-brand-950 shadow-[0_0_18px_rgba(2,86,235,0.55)] md:top-7"
                    aria-hidden="true"
                  >
                    <Check className="h-5 w-5 text-[#63a9ff]" strokeWidth={3} />
                  </span>

                  <motion.div
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.25 }}
                    transition={{ duration: 0.8, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
                    className={`pl-16 pb-12 md:pl-0 md:pb-16 ${onLeft ? 'md:col-start-1' : 'md:col-start-2'}`}
                  >
                    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-colors duration-300 hover:border-[#63a9ff]/40 sm:p-7">
                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center justify-center rounded-lg bg-[#1263a0] px-3 py-1 text-xs font-bold tracking-[0.14em] text-white">
                          {milestone.year}
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-[#63a9ff]/50 to-transparent" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold leading-snug text-white sm:text-xl">
                        {milestone.title}
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {milestone.points.map((point) => (
                          <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-slate-400">
                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[#63a9ff]" aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
