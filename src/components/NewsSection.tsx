'use client';

import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

interface NewsItem {
  img: string;
  alt: string;
  dateKey: string;
  titleKey: string;
  anim: string;
}

const news: NewsItem[] = [
  {
    img: '/assets/images/news-1.jpg',
    alt: 'Trans Hybrid Communication Dukung Penguatan Digitalisasi',
    dateKey: 'news.date1',
    titleKey: 'news.title1',
    anim: 'fade-up delay-100',
  },
  {
    img: '/assets/images/news-2.jpg',
    alt: 'PT Trans Hybrid Communication (THC) Resmi Meluncurkan Node Maritim',
    dateKey: 'news.date2',
    titleKey: 'news.title2',
    anim: 'fade-up delay-200',
  },
  {
    img: '/assets/images/news-3.jpg',
    alt: 'PT Trans Hybrid Communication Hadir di Jawa',
    dateKey: 'news.date3',
    titleKey: 'news.title3',
    anim: 'fade-up delay-300',
  },
  {
    img: '/assets/images/pekerjaan.png',
    alt: 'THC Hadirkan Internet Gratis untuk Sekolah di Perbatasan Kalimantan Barat',
    dateKey: 'news.date4',
    titleKey: 'news.title4',
    anim: 'fade-up delay-400',
  },
];

export default function NewsSection() {
  const { t } = useLanguage();

  return (
    <section id="berita" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 fade-up md:mb-16">
          <div>
            <h2 className="mb-3 text-5xl font-black uppercase leading-none tracking-[-0.06em] text-blue-900 sm:text-6xl md:text-7xl">
              {t('news.title')}
            </h2>
            <p className="text-sm font-normal text-slate-700 sm:text-base">{t('news.desc')}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-7">
          {news.map(({ img, alt, dateKey, titleKey, anim }, i) => (
            <article
              key={i}
              className={`group flex flex-col ${anim}`}
            >
              <div className="aspect-square overflow-hidden bg-slate-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img} alt={alt} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="flex flex-1 flex-col pt-4">
                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
                  <Calendar className="h-3.5 w-3.5" />
                  <span>{t(dateKey)}</span>
                </div>
                <h3 className="mb-6 text-xl font-medium leading-snug text-slate-900 transition-colors group-hover:text-brand-600 md:text-[22px]">
                  {t(titleKey)}
                </h3>
                <a href="#" className="mt-auto inline-flex w-fit items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700">
                  <span>{t('news.readmore')}</span>
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}