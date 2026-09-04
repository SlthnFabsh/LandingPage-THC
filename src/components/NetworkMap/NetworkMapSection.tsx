'use client';

import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import TextSplit from '@/components/TextSplit';
import NoiseOverlay from '@/components/NoiseOverlay';
import Parallax from '@/components/Parallax';

const NetworkMap = dynamic(() => import('./NetworkMap'), {
  ssr: false,
  loading: () => (
    <div
      className="relative overflow-hidden rounded-[14px] bg-[#132A54] p-4 sm:p-6"
      role="img"
      aria-label="Memuat peta jaringan Trans Hybrid"
    >
      <div className="aspect-[680/430] w-full animate-pulse rounded bg-[#1E3E73]" />
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
        <motion.div initial={{ opacity: 0, y: 36 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.3 }} className="mx-auto max-w-3xl rounded-[22px] border border-white/10 bg-[#0d1f3f]/55 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-3 md:p-4">
          <NetworkMap />
        </motion.div>
      </div>
    </section>
  );
}