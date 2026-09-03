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
    <section id="jaringan" className="bg-[#f5f5f3] py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 md:mb-10">
          <h2 className="text-4xl font-black tracking-[-0.08em] text-slate-900 md:text-6xl">
            NETWORK MAP
          </h2>
          <p className="mt-3 max-w-2xl text-lg text-slate-600 md:text-xl">
            Peta jaringan kabel Trans Hybrid menghubungkan Indonesia, Malaysia, Brunei, dan
            Filipina melalui jalur submarine dan inland.
          </p>
        </div>
        <NetworkMap />
      </div>
    </section>
  );
}