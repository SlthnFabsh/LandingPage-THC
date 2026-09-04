'use client';

import { Wifi, Network, Cpu, Database, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import TextSplit from '@/components/TextSplit';
import TiltCard from '@/components/TiltCard';

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
          <TextSplit
            key={t('services.title')}
            as="h2"
            text={t('services.title')}
            className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-blue-900"
            stagger={0.028}
          />
          <motion.p initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.1, delay: 0.15 }} className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">{t('services.desc')}</motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {services.map(({ icon: Icon, titleKey, descKey, iconColor }, i) => (
            <TiltCard
              key={i}
              className="group flex min-h-[280px] cursor-pointer flex-col justify-between border border-[#d9dce5] bg-white p-6 transition-colors duration-300 hover:border-transparent hover:bg-[#0256eb] sm:p-7 md:p-8"
            >
              <motion.div
                initial={{ opacity: 0, y: 38 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.25, delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(7, 59, 145, 0.12)' }}
                className="service-card flex h-full flex-col justify-between"
              >
                <div>
                  <motion.div whileHover={{ scale: 1.12, rotate: 6 }} className={`mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#eef0f8] ${iconColor}`}>
                    <Icon className="h-5 w-5" />
                  </motion.div>
                  <h3 className="mb-3 text-[1.5rem] font-semibold text-[#073b91] transition-colors group-hover:text-white md:text-[1.75rem]">
                    {t(titleKey)}
                  </h3>
                  <p className="max-w-xl text-sm leading-relaxed text-slate-500 transition-colors group-hover:text-white md:text-[15px]">
                    {t(descKey)}
                  </p>
                </div>

                <a
                  href="#faq"
                  className="mt-8 inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#073b91] uppercase transition-colors hover:text-[#1259c7] group-hover:text-white"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#073b91] text-white transition-colors group-hover:bg-white group-hover:text-[#0256eb]">
                    <Plus className="h-4 w-4" />
                  </span>
                  <span>{t('common.lebihDetail')}</span>
                </a>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}