'use client';

import { useState } from 'react';
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import TextSplit from '@/components/TextSplit';
import TiltCard from '@/components/TiltCard';
import type { NewsFallback } from '@/lib/news-data';

function formatDate(date: string, lang: string): string {
  return new Date(date).toLocaleDateString(lang === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const PER_PAGE = 4;

export default function NewsSection({ items }: { items: NewsFallback[] }) {
  const { lang, t } = useLanguage();
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const [page, setPage] = useState(0);
  const current = Math.min(page, totalPages - 1);
  const visible = items.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);
  const canPrev = current > 0;
  const canNext = current < totalPages - 1;

  return (
    <section id="berita" className="bg-white py-20 md:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <TextSplit
                key={t('news.title')}
                as="h2"
                text={t('news.title')}
                className="mb-3 text-[clamp(2.25rem,5vw,3.5rem)] font-bold uppercase leading-[1.05] tracking-[-0.02em] text-blue-900"
                stagger={0.028}
              />
              <p className="text-sm font-normal text-slate-600 sm:text-base">{t('news.desc')}</p>
            </div>
            {totalPages > 1 && (
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setPage(Math.max(0, current - 1))}
                  disabled={!canPrev}
                  aria-label="Berita sebelumnya"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="select-none text-sm font-semibold text-slate-500">
                  {current + 1} / {totalPages}
                </span>
                <button
                  type="button"
                  onClick={() => setPage(Math.min(totalPages - 1, current + 1))}
                  disabled={!canNext}
                  aria-label="Berita berikutnya"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition-colors hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-white"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </div>

        <motion.div
          key={current}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-6 lg:grid-cols-4 lg:gap-7"
        >
          {visible.map((item, i) => {
            const title = lang === 'id' ? item.titleId : item.titleEn;
            const summary = lang === 'id' ? item.summaryId : item.summaryEn;
            return (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.1, delay: i * 0.12 }}
                className="group flex flex-col"
              >
                <TiltCard className="flex h-full flex-col">
                  <div className="aspect-square overflow-hidden bg-slate-100">
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
                      <span>{formatDate(item.date, lang)}</span>
                    </div>
                    <h3 className="mb-3 text-xl font-medium leading-snug text-slate-900 transition-colors group-hover:text-brand-600 md:text-[22px]">
                      {title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-slate-500 line-clamp-3">
                      {summary}
                    </p>
                    <a
                      href="#"
                      className="mt-auto inline-flex w-fit items-center gap-1.5 text-xs font-bold text-brand-600 hover:text-brand-700"
                    >
                      <span>{t('news.readmore')}</span>
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                </TiltCard>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}