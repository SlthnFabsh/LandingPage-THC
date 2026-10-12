'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import TextSplit from '@/components/TextSplit';
import NewsCard from '@/components/News/NewsCard';
import type { NewsFallback } from '@/lib/news-data';

const PER_PAGE = 4;

export default function NewsSection({ items }: { items: NewsFallback[] }) {
  const { t } = useLanguage();
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
          {visible.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} imageClassName="aspect-square" />
          ))}
        </motion.div>

        <div className="mt-14 flex justify-center">
          <Link
            href="/berita"
            prefetch={true}
            className="group inline-flex items-center gap-3 rounded-full bg-brand-600 px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700"
          >
            <span>{t('news.seeall')}</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
