'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import TiltCard from '@/components/TiltCard';
import { newsHref, type NewsFallback } from '@/lib/news-data';

export function formatNewsDate(date: string, lang: string): string {
  return new Date(date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

interface NewsCardProps {
  item: NewsFallback;
  index?: number;
  imageClassName?: string;
  titleClassName?: string;
  summaryClassName?: string;
}

export default function NewsCard({
  item,
  index = 0,
  imageClassName = 'aspect-video',
  titleClassName = 'text-xl md:text-[22px]',
  summaryClassName = 'line-clamp-3',
}: NewsCardProps) {
  const { lang, t } = useLanguage();
  const title = lang === 'id' ? item.titleId : item.titleEn;
  const summary = lang === 'id' ? item.summaryId : item.summaryEn;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.1 }}
      className="group flex flex-col"
    >
      <TiltCard className="flex h-full flex-col">
        <Link href={newsHref(item.slug)} className="flex h-full flex-col">
          <div className={`overflow-hidden bg-slate-100 ${imageClassName}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.coverImage}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          </div>
          <div className="flex flex-1 flex-col pt-4">
            <div className="mb-3 flex items-center gap-2 text-xs font-medium text-slate-500">
              <Calendar className="h-3.5 w-3.5" />
              <span>{formatNewsDate(item.date, lang)}</span>
            </div>
            <h3
              className={`mb-3 font-medium leading-snug text-slate-900 transition-colors group-hover:text-brand-600 ${titleClassName}`}
            >
              {title}
            </h3>
            <p className={`mb-6 text-sm leading-relaxed text-slate-500 ${summaryClassName}`}>
              {summary}
            </p>
            <span className="mt-auto inline-flex w-fit items-center gap-1.5 text-xs font-bold text-brand-600 group-hover:text-brand-700">
              <span>{t('news.readmore')}</span>
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </Link>
      </TiltCard>
    </motion.article>
  );
}
