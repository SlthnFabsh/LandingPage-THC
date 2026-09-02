const stats = [
  { value: '50RB+', label: 'Pelanggan retail' },
  { value: '100+', label: 'Titik kehadiran (POP)' },
  { value: '19Thn+', label: 'Beroperasi' },
  { value: '1RB+', label: 'Kilometer Kabel' },
  { value: '500+', label: 'Trafik Internet Dikelola' },
];

export default function CompanySection() {
  return (
    <section className="bg-[#f5f5f3]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
          {/* Left Column: Text & Buttons */}
          <div className="py-16 pr-6 md:py-24 lg:pr-12">
            <div className="space-y-8">
              <h2 className="text-4xl font-black tracking-[-0.08em] text-slate-900 md:text-6xl">
                PERUSAHAAN
              </h2>

              <div className="space-y-6 text-lg leading-relaxed text-slate-700 md:text-xl">
                <p>
                  Trans Hybrid Communication adalah mitra anda dan dalam dunia yang
                  serba cepat, memulukan komunikasi dan informasi untuk memastikan
                  bisnis Anda berjalan lancar.
                </p>

                <p>
                  Kami menyediakan layanan prima, wawasan lokal mendalam, dan koneksi
                  yang kuat, memberdayakan Anda untuk unggul. Dengan dedikasi pada
                  ekuitas jaringan, kami berkomitmen menghadirkan layanan terbaik agar
                  Anda selalu terhubung, kapan pun dan di mana pun.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-2">
                <button className="rounded-full border border-slate-700 bg-white px-8 py-3 text-base font-medium text-slate-900 transition hover:bg-slate-900 hover:text-white">
                  – Tentang Kami
                </button>
                <button className="rounded-full border border-slate-700 bg-white px-8 py-3 text-base font-medium text-slate-900 transition hover:bg-slate-900 hover:text-white">
                  – Perjalanan Kami
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Full-Bleed Photo with Overlay Stats */}
          <div className="relative border-t border-slate-300 lg:border-t-0 lg:border-l">
            {/* Full-bleed background photo */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1400&q=80')",
              }}
              aria-hidden
            />
            {/* Dark gradient overlay for text contrast */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/25"
              aria-hidden
            />

            {/* Stats overlaid on top of photo */}
            <div className="relative flex min-h-[480px] h-full flex-col justify-center gap-7 py-20 pl-8 pr-6 md:gap-9 md:py-24 md:pl-12">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-4xl font-black tracking-[-0.06em] text-white md:text-5xl">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-lg text-white/85 md:text-xl">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}