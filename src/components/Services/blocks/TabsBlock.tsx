'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { TabsData } from '@/lib/service-blocks';
import ServiceBlockList from './ServiceBlockList';

export default function TabsBlock({ data }: { data: TabsData }) {
  const [active, setActive] = useState(0);

  if (data.items.length === 0) return null;

  return (
    <div>
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
        {data.items.map((tab, index) => (
          <button
            key={`${tab.label}-${index}`}
            onClick={() => setActive(index)}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
              active === index
                ? 'bg-brand-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600 hover:bg-brand-50 hover:text-brand-700'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-8"
      >
        <ServiceBlockList blocks={data.items[active]?.blocks ?? []} nested />
      </motion.div>
    </div>
  );
}
