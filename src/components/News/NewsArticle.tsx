'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';
import TiltCard from '@/components/TiltCard';
import { newsHref, type NewsFallback } from '@/lib/news-data';

function formatDate(date: string, lang: string): string {
  return new Date(date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function toParagraphs(value: string | null | undefined, fallback: string): string[] {
  const source = (value ?? '').trim() || fallback;
  return source
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export default function NewsArticle({
  news,
  related,
}: {
  news: NewsFallback;
  related: NewsFallback[];
}) {
  const { lang, t } = useLanguage();
  const title = lang === 'id' ? news.titleId : news.titleEn;
  const summary = lang === 'id' ? news.summaryId : news.summaryEn;
  const content = lang === 'id' ? news.contentId : news.contentEn;
  const paragraphs = toParagraphs(content, summary);

  return (
    <section className="bg-white py-14 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/#berita"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600 transition-colors hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>{t('news.back')}</span>
          </Link>

          <div className="mt-6 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={news.coverImage}
              alt={title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="mt-6 flex items-center gap-2 text-sm font-medium text-slate-500">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(news.date, lang)}</span>
          </div>

          <div className="mt-6 space-y-5">
            {paragraphs.map((paragraph, i) => (
              <p key={i} className="text-[15px] leading-relaxed text-slate-600 md:text-base">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mx-auto mt-16 max-w-7xl border-t border-slate-100 pt-12 md:mt-20">
            <h2 className="mb-8 text-2xl font-bold uppercase tracking-[-0.01em] text-blue-900 md:text-3xl">
              {t('news.related')}
            </h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
              {related.map((item, i) => {
                const itemTitle = lang === 'id' ? item.titleId : item.titleEn;
                const itemSummary = lang === 'id' ? item.summaryId : item.summaryEn;
                return (
                  <motion.article
                    key={item.id}
                    initial={{ opacity: 0, y: 32 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.8, delay: i * 0.1 }}
                    className="group flex flex-col"
                  >
                    <TiltCard className="flex h-full flex-col">
                      <Link href={newsHref(item.slug)} className="flex h-full flex-col">
                        <div className="aspect-video overflow-hidden bg-slate-100">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.coverImage}
                            alt={itemTitle}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex flex-1 flex-col pt-4">
                          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-slate-500">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{formatDate(item.date, lang)}</span>
                          </div>
                          <h3 className="mb-2 text-lg font-medium leading-snug text-slate-900 transition-colors group-hover:text-brand-600">
                            {itemTitle}
                          </h3>
                          <p className="mb-5 text-sm leading-relaxed text-slate-500 line-clamp-2">
                            {itemSummary}
                          </p>
                          <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-brand-600 group-hover:text-brand-700">
                            <span>{t('news.readmore')}</span>
                            <ArrowRight className="h-4 w-4" />
                          </span>
                        </div>
                      </Link>
                    </TiltCard>
                  </motion.article>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
