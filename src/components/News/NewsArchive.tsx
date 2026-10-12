'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import NewsCard from '@/components/News/NewsCard';
import type { NewsFallback } from '@/lib/news-data';

const PER_PAGE = 6;

export default function NewsArchive({ items }: { items: NewsFallback[] }) {
  const totalPages = Math.max(1, Math.ceil(items.length / PER_PAGE));
  const [page, setPage] = useState(0);
  const current = Math.min(page, totalPages - 1);
  const visible = items.slice(current * PER_PAGE, current * PER_PAGE + PER_PAGE);
  const canPrev = current > 0;
  const canNext = current < totalPages - 1;

  if (items.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 text-center text-slate-500">
          No news published yet.
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7"
        >
          {visible.map((item, i) => (
            <NewsCard
              key={item.id}
              item={item}
              index={i}
              imageClassName="aspect-video"
            />
          ))}
        </motion.div>

        {totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-3">
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
    </section>
  );
}
