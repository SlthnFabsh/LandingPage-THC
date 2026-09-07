'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import TextSplit from '@/components/TextSplit';
import NoiseOverlay from '@/components/NoiseOverlay';
import Parallax from '@/components/Parallax';
import NetworkLegendPanel from './NetworkLegendPanel';

const NetworkMap = dynamic(() => import('./NetworkMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[460px] md:min-h-[520px] rounded-[18px] border border-white/10 bg-[#0b2545] p-4 shadow-2xl shadow-black/10 flex items-center justify-center">
      <div className="h-full w-full animate-pulse rounded-xl bg-[#0d1f3f]/50" />
    </div>
  ),
});

export default function NetworkMapSection() {
  return (
    <section id="jaringan" className="hero-grid-pattern relative overflow-hidden bg-[#0b132b] py-16 md:py-24">
      <NoiseOverlay />
      <Parallax amount={70} delay={0.15} className="pointer-events-none absolute -right-40 top-10 z-0 h-[28rem] w-[28rem] rounded-full bg-[#0256eb]/20 blur-[110px]" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <TextSplit
            as="h2"
            text="NETWORK MAP"
            className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-[1.05] tracking-[-0.015em] text-white"
            stagger={0.04}
          />
          <p className="network-fade-up delay-100 mt-4 max-w-2xl text-lg leading-relaxed text-[#CBD8ED] md:text-xl">
            Peta jaringan kabel Trans Hybrid menghubungkan Indonesia, Malaysia, Brunei, dan
            Filipina melalui jalur submarine dan inland.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-[280px_1fr] lg:grid-cols-[300px_1fr] items-stretch">
          <NetworkLegendPanel />
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.3 }}
            className="w-full h-full min-w-0"
          >
            <NetworkMap />
          </motion.div>
        </div>
      </div>
    </section>
  );
}