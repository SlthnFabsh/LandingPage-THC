'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import TextSplit from '@/components/TextSplit';
import NoiseOverlay from '@/components/NoiseOverlay';
import Parallax from '@/components/Parallax';
import Magnetic from '@/components/Magnetic';

export default function Hero() {
  return (
    <section id="beranda" className="relative flex min-h-screen items-center justify-center overflow-hidden bg-brand-950">
      {/* Hero Video Background */}
      <div className="hero-video-wrapper">
        <video autoPlay loop muted playsInline className="hero-video opacity-85">
          <source src="/assets/video/hero2.mp4" type="video/mp4" />
        </video>
        {/* Gradient Overlay */}
        <div className="hero-video-overlay"></div>
      </div>

      {/* Noise texture */}
      <NoiseOverlay />

      {/* Decorative parallax blob */}
      <Parallax amount={50} delay={0.1} className="pointer-events-none absolute -left-20 top-1/4 z-0 h-80 w-80 rounded-full bg-[#0256eb]/25 blur-[100px]" />
      <Parallax amount={40} delay={0.2} className="pointer-events-none absolute -right-24 bottom-1/4 z-0 h-96 w-96 rounded-full bg-[#63a9ff]/15 blur-[120px]" />

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <TextSplit
          as="h1"
          text="#To The Next Level !"
          className="text-[2.8rem] font-black leading-[0.9] tracking-[-0.06em] sm:text-[4.5rem] md:text-[7rem] lg:text-[8.5rem]"
          stagger={0.035}
          delay={0.1}
        />

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1, ease: 'easeOut' }} className="mt-8 text-[1.4rem] font-semibold tracking-[-0.04em] sm:text-[2rem] md:text-[2.8rem]">
          Your Connection, Our Commitment.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 0.8 }}>
          <Magnetic>
            <motion.a href="#layanan" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-flex items-center gap-3 rounded-full bg-[#1263a0] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-black/20">
              Mulai Terhubung <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  );
}