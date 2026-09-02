'use client';

import { Wifi, Network, Cpu, Database, CheckCircle2, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

const services = [
  {
    icon: Wifi,
    titleKey: 'services.internet',
    descKey: 'services.internet.desc',
    feature1Key: 'services.internet.feature1',
    feature2Key: 'services.internet.feature2',
    anim: 'fade-left delay-100',
  },
  {
    icon: Network,
    titleKey: 'services.konektivitas',
    descKey: 'services.konektivitas.desc',
    feature1Key: 'services.konektivitas.feature1',
    feature2Key: 'services.konektivitas.feature2',
    anim: 'flip-up delay-200',
  },
  {
    icon: Cpu,
    titleKey: 'services.solusi',
    descKey: 'services.solusi.desc',
    feature1Key: 'services.solusi.feature1',
    feature2Key: 'services.solusi.feature2',
    anim: 'flip-up delay-300',
  },
  {
    icon: Database,
    titleKey: 'services.data',
    descKey: 'services.data.desc',
    feature1Key: 'services.data.feature1',
    feature2Key: 'services.data.feature2',
    anim: 'fade-right delay-400',
  },
];

export default function Services() {
  const { t } = useLanguage();

  return (
    <section id="layanan" className="py-24 bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 fade-down">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            {t('services.title')}
          </h2>
          <div className="w-12 h-1 bg-brand-600 mx-auto rounded-full mb-4"></div>
          <p className="text-slate-600 text-base max-w-2xl mx-auto font-normal">{t('services.desc')}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map(({ icon: Icon, titleKey, descKey, feature1Key, feature2Key, anim }, i) => (
            <div
              key={i}
              className={`bg-white hover:bg-gradient-to-b hover:from-brand-600 hover:to-brand-800 p-8 rounded-3xl border border-slate-200/80 hover:border-transparent shadow-soft hover:shadow-2xl hover:shadow-brand-600/40 hover:-translate-y-3 hover-instant transition-all duration-150 flex flex-col justify-between group ${anim} cursor-pointer`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 group-hover:bg-white/20 group-hover:text-white group-hover:border group-hover:border-white/30 flex items-center justify-center mb-6 transition-all duration-150 shadow-xs">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-3 group-hover:text-white transition-colors duration-150">
                  {t(titleKey)}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 group-hover:text-blue-100 transition-colors duration-150">
                  {t(descKey)}
                </p>

                <ul className="space-y-2.5 mb-8 text-xs font-bold text-slate-700 group-hover:text-white transition-colors duration-150">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 group-hover:text-cyan-300 transition-colors" />
                    <span>{t(feature1Key)}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-brand-600 group-hover:text-cyan-300 transition-colors" />
                    <span>{t(feature2Key)}</span>
                  </li>
                </ul>
              </div>

              <a
                href="#faq"
                className="inline-flex items-center gap-2 text-xs font-bold text-brand-600 group-hover:text-white tracking-wide uppercase transition-colors duration-150"
              >
                <span>{t('common.lebihDetail')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}