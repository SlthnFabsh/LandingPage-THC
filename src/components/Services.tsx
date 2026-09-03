'use client';

import { Wifi, Network, Cpu, Database, Plus } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const services = [
  {
    icon: Wifi,
    titleKey: 'services.internet',
    descKey: 'services.internet.desc',
    iconColor: 'text-violet-600',
  },
  {
    icon: Network,
    titleKey: 'services.konektivitas',
    descKey: 'services.konektivitas.desc',
    iconColor: 'text-emerald-500',
  },
  {
    icon: Cpu,
    titleKey: 'services.solusi',
    descKey: 'services.solusi.desc',
    iconColor: 'text-yellow-400',
  },
  {
    icon: Database,
    titleKey: 'services.data',
    descKey: 'services.data.desc',
    iconColor: 'text-red-500',
  },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="layanan" className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h2 className="services-reveal delay-100 text-5xl font-black uppercase tracking-[-0.06em] text-blue-900 md:text-6xl">
            {t('services.title')}
          </h2>
          <p className="services-reveal delay-200 mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">{t('services.desc')}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {services.map(({ icon: Icon, titleKey, descKey, iconColor }, i) => (
            <div
              key={i}
              className={`services-reveal delay-${(i + 3) * 100} group flex min-h-[280px] cursor-pointer flex-col justify-between border border-[#d9dce5] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#123f9b] hover:shadow-xl hover:shadow-[#123f9b]/10 sm:p-7 md:p-8`}
            >
              <div>
                <div className={`mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#eef0f8] transition-transform duration-300 group-hover:scale-105 ${iconColor}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#073b91] transition-colors group-hover:text-[#1259c7] md:text-[28px]">
                  {t(titleKey)}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-slate-500 md:text-[15px]">
                  {t(descKey)}
                </p>
              </div>

              <a
                href="#faq"
                className="inline-flex w-fit items-center gap-2 text-xs font-bold tracking-wide text-[#073b91] uppercase transition-colors hover:text-[#1259c7]"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#073b91] text-white transition-colors group-hover:bg-[#1259c7]">
                  <Plus className="h-4 w-4" />
                </span>
                <span>{t('common.lebihDetail')}</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}