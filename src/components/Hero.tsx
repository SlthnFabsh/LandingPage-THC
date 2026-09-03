'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

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

      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.h1
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.18, delayChildren: 0.2 } } }}
          className="text-[2.8rem] font-black leading-[0.9] tracking-[-0.06em] sm:text-[4.5rem] md:text-[7rem] lg:text-[8.5rem]"
        >
          <span className="block overflow-hidden">
            <motion.span initial={{ y: '105%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="block">
              #To The Next
            </motion.span>
          </span>
          <span className="block overflow-hidden">
            <motion.span initial={{ y: '105%', opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.18, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="block">
              Level !
            </motion.span>
          </span>
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.35, duration: 1, ease: 'easeOut' }} className="mt-8 text-[1.4rem] font-semibold tracking-[-0.04em] sm:text-[2rem] md:text-[2.8rem]">
          Your Connection, Our Commitment.
        </motion.p>
        <motion.a href="#layanan" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.65, duration: 0.8 }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="mt-9 inline-flex items-center gap-3 rounded-full bg-[#1263a0] px-6 py-3 text-sm font-bold text-white shadow-xl shadow-black/20">
          Mulai Terhubung <ArrowUpRight className="h-4 w-4" />
        </motion.a>
      </div>
    </section>
  );
}