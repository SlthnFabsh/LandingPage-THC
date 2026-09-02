'use client';

import { Calendar, ChevronRight, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

interface NewsItem {
  img: string;
  badge: string;
  alt: string;
  dateKey: string;
  titleKey: string;
  descKey: string;
  anim: string;
}

const news: NewsItem[] = [
  {
    img: '/assets/images/news-1.jpg',
    badge: 'NEWS',
    alt: 'Trans Hybrid Communication Dukung Penguatan Digitalisasi',
    dateKey: 'news.date1',
    titleKey: 'news.title1',
    descKey: 'news.desc1',
    anim: 'fade-up delay-100',
  },
  {
    img: '/assets/images/news-2.jpg',
    badge: 'EVENT',
    alt: 'PT Trans Hybrid Communication (THC) Resmi Meluncurkan Node Maritim',
    dateKey: 'news.date2',
    titleKey: 'news.title2',
    descKey: 'news.desc2',
    anim: 'fade-up delay-200',
  },
  {
    img: '/assets/images/news-3.jpg',
    badge: 'BERITA',
    alt: 'PT Trans Hybrid Communication Hadir di Jawa',
    dateKey: 'news.date3',
    titleKey: 'news.title3',
    descKey: 'news.desc3',
    anim: 'fade-up delay-300',
  },
];

export default function NewsSection() {
  const { t } = useLanguage();

  return (
    <section id="berita" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Top Bar */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-14 gap-4 fade-up">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">{t('news.title')}</h2>
            <p className="text-slate-500 text-sm sm:text-base">{t('news.desc')}</p>
          </div>
          <a href="#" className="inline-flex items-center gap-2 font-bold text-sm text-brand-600 hover:text-brand-700 group">
            <span>{t('news.viewall')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map(({ img, badge, alt, dateKey, titleKey, descKey, anim }, i) => (
            <article
              key={i}
              className={`bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft shadow-hover flex flex-col group ${anim}`}
            >
              <div className="relative h-52 overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={alt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-brand-600 text-white font-bold text-[10px] tracking-widest uppercase px-3 py-1 rounded-full shadow-md">
                  {badge}
                </div>
              </div>
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-3 font-medium">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{t(dateKey)}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 leading-snug group-hover:text-brand-600 transition-colors">
                    {t(titleKey)}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 leading-relaxed mb-6">{t(descKey)}</p>
                </div>
                <a href="#" className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700 tracking-wide uppercase">
                  <span>{t('news.readmore')}</span>
                  <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}