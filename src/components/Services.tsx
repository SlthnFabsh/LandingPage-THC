'use client';

import { Wifi, Network, Cpu, Database, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
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
          <motion.h2 initial={{ opacity: 0, y: 38 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.1 }} className="text-5xl font-black uppercase tracking-[-0.06em] text-blue-900 md:text-6xl">
            {t('services.title')}
          </motion.h2>
          <motion.p initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.1, delay: 0.15 }} className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">{t('services.desc')}</motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {services.map(({ icon: Icon, titleKey, descKey, iconColor }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 38 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.25, delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(7, 59, 145, 0.12)' }}
              className="service-card group flex min-h-[280px] cursor-pointer flex-col justify-between border border-[#d9dce5] bg-white p-6 transition-colors duration-300 hover:border-transparent sm:p-7 md:p-8"
            >
              <div>
                <motion.div whileHover={{ scale: 1.12, rotate: 6 }} className={`mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#eef0f8] ${iconColor}`}>
                  <Icon className="h-5 w-5" />
                </motion.div>
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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}