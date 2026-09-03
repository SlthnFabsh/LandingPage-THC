const stats = [
  { value: '50RB+', label: 'Pelanggan retail' },
  { value: '100+', label: 'Titik kehadiran (POP)' },
  { value: '19Thn+', label: 'Beroperasi' },
  { value: '1RB+', label: 'Kilometer Kabel' },
  { value: '500+', label: 'Trafik Internet Dikelola' },
];

export default function CompanySection() {
  return (
    <section className="overflow-hidden bg-[#f5f5f3]">
      <div className="mx-auto max-w-[1600px] px-0 lg:px-4">
        <div className="grid min-h-[100vh] items-center lg:grid-cols-[1.25fr_0.75fr]">
          <div className="px-6 py-12 sm:px-8 md:px-10 lg:pl-16 lg:pr-8 xl:pl-20 xl:pr-10">
            <div className="max-w-[620px]">
              <h2 className="company-fade-up delay-100 text-[3rem] font-black leading-none tracking-[-0.08em] text-blue-900 md:text-[4.8rem] xl:text-[6.2rem]">
                PERUSAHAAN
              </h2>

              <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-700 md:text-[1.15rem] xl:text-[1.35rem]">
                <p className="company-fade-up delay-200">
                  Trans Hybrid Communication adalah mitra anda dan dalam dunia yang
                  serba cepat, memulukan komunikasi dan informasi untuk memastikan
                  bisnis Anda berjalan lancar.
                </p>

                <p className="company-fade-up delay-300">
                  Kami menyediakan layanan prima, wawasan lokal mendalam, dan koneksi
                  yang kuat, memberdayakan Anda untuk unggul. Dengan dedikasi pada
                  ekuitas jaringan, kami berkomitmen menghadirkan layanan terbaik agar
                  Anda selalu terhubung, kapan pun dan di mana pun.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-full border border-slate-700 bg-white px-7 py-3 text-base font-medium text-slate-600 transition hover:bg-blue-900 hover:text-white">
                  – Tentang Kami
                </button>
                <button className="rounded-full border border-slate-700 bg-white px-7 py-3 text-base font-medium text-slate-600 transition hover:bg-blue-900 hover:text-white">
                  – Perjalanan Kami
                </button>
              </div>
            </div>
          </div>

          <div className="relative h-[72vh] min-h-[420px] w-[94%] overflow-hidden justify-self-end lg:h-[78vh] lg:min-h-[620px] lg:w-[96%] lg:translate-x-[2.5rem]">
            <img
              src="/assets/images/pekerjaan.png"
              alt="Tim bekerja"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: 'right center' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/30 to-black/10" aria-hidden="true" />

            <div className="relative z-10 flex h-full min-h-[420px] flex-col justify-center gap-5 py-8 pl-6 pr-5 md:gap-6 md:py-12 md:pl-10 md:pr-8 lg:pl-12 lg:pr-8 xl:pl-14">
              {stats.map((stat, index) => (
                <div key={stat.label} className={`scale-in delay-${(index + 1) * 100} max-w-[280px]`}>
                  <div className="text-[1.65rem] font-black tracking-[-0.05em] text-white md:text-[2.1rem] xl:text-[2.5rem]">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-xs leading-snug text-white/85 md:text-sm xl:text-base">
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