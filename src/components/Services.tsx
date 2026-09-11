'use client';

import { Wifi, Network, Cpu, Database, Layers, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import TextSplit from '@/components/TextSplit';
import TiltCard from '@/components/TiltCard';
import type { ServiceItemData } from '@/lib/content';

const iconMap: Record<string, typeof Wifi> = {
  wifi: Wifi,
  network: Network,
  cpu: Cpu,
  database: Database,
};

const hrefMap: Record<string, string> = {
  wifi: '/layanan/internet',
  network: '/layanan/konektivitas',
  cpu: '/layanan/solusi/solusi-terkelola',
  database: '/layanan/pusat-data',
};

interface ServicesProps {
  services: ServiceItemData[];
}

export default function Services({ services }: ServicesProps) {
  const { lang } = useLanguage();
  const titleText = lang === 'id' ? 'Layanan Kami' : 'Our Services';
  const descText =
    lang === 'id'
      ? 'Solusi infrastruktur telekomunikasi komprehensif yang dirancang untuk keandalan tinggi dan performa bisnis optimal.'
      : 'Comprehensive telecommunication infrastructure solutions designed for high reliability and optimal business performance.';

  if (services.length === 0) return null;

  return (
    <section id="layanan" className="relative bg-white py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <TextSplit
            key={titleText}
            as="h2"
            text={titleText}
            className="text-[clamp(2.25rem,5vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-blue-900"
            stagger={0.028}
          />
          <motion.p initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 1.1, delay: 0.15 }} className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 md:text-lg">{descText}</motion.p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon] || Layers;
            const href = hrefMap[service.icon] || '#faq';
            return (
              <TiltCard
                key={service.id}
                glare={false}
                className="group flex min-h-[280px] cursor-pointer flex-col justify-between border border-[#d9dce5] bg-white p-6 transition-colors duration-300 hover:border-transparent hover:bg-[#0256eb] sm:p-7 md:p-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 38 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 1.25, delay: 0.25 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -6 }}
                  className="service-card flex h-full flex-col justify-between"
                >
                  <div>
                    <motion.div whileHover={{ scale: 1.12, rotate: 6 }} className={`mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-[#eef0f8] ${service.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </motion.div>
                    <h3 className="mb-3 text-[1.5rem] font-semibold text-[#073b91] transition-colors group-hover:text-white md:text-[1.75rem]">
                      {lang === 'id' ? service.titleId : service.titleEn}
                    </h3>
                    <p className="max-w-xl text-sm leading-relaxed text-slate-500 transition-colors group-hover:text-white md:text-[15px]">
                      {lang === 'id' ? service.descId : service.descEn}
                    </p>
                  </div>

                  <a
                    href={href}
                    className="mt-8 inline-flex w-fit items-center gap-2 text-xs font-semibold tracking-[0.08em] text-[#073b91] uppercase transition-colors group-hover:text-white"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#0256eb] text-white transition-colors group-hover:bg-[#0256eb] group-hover:text-white">
                      <Plus className="h-4 w-4" />
                    </span>
                    <span>{lang === 'id' ? 'Lebih Detail' : 'Learn More'}</span>
                  </a>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}