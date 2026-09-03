'use client';

import dynamic from 'next/dynamic';

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
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h2 className="fade-up text-3xl font-black tracking-[-0.08em] text-white md:text-6xl">
            NETWORK MAP
          </h2>
          <p className="fade-up delay-100 mt-3 max-w-2xl text-lg text-[#CBD8ED] md:text-1XL">
            Peta jaringan kabel Trans Hybrid menghubungkan Indonesia, Malaysia, Brunei, dan
            Filipina melalui jalur submarine dan inland.
          </p>
        </div>
        <div className="map-reveal mx-auto max-w-2xl rounded-[22px] border border-white/10 bg-[#0d1f3f]/55 p-2 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-3 md:p-4">
          <NetworkMap />
        </div>
      </div>
    </section>
  );
}