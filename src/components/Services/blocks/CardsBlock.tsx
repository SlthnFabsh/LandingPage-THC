'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, ChevronDown, ShieldCheck } from 'lucide-react';
import { getServiceIcon } from '@/lib/service-icons';
import type { CardsData } from '@/lib/service-blocks';
import BlockShell from './BlockShell';

const EASE = [0.16, 1, 0.3, 1] as const;

export default function CardsBlock({ data }: { data: CardsData }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (data.items.length === 0) return null;

  if (data.style === 'grid') {
    return (
      <BlockShell>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {data.items.map((card) => (
            <div
              key={`${card.href}-${card.title}`}
              className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition-colors hover:border-brand-200 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                {(() => {
                  const Icon = getServiceIcon(card.icon);
                  return <Icon className="h-6 w-6" />;
                })()}
              </span>

              <h3 className="mt-4 text-lg font-bold text-slate-900">{card.title}</h3>
              {card.badge && (
                <span className="mt-1 inline-block w-fit rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                  {card.badge}
                </span>
              )}
              <p className="mt-3 flex-1 text-[14px] leading-[1.8] text-slate-600">{card.description}</p>

              {card.features.length > 0 && (
                <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                  {card.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                      <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              )}

              {card.href && (
                <Link
                  href={card.href}
                  className="mt-4 inline-flex items-center gap-1.5 border-t border-slate-100 pt-4 text-xs font-bold uppercase tracking-wider text-brand-600 transition-colors hover:text-brand-700"
                >
                  <span>{card.ctaLabel || 'Learn More'}</span>
                  <ArrowRight className="h-3.5 w-3.5 transition-transform hover:translate-x-1" />
                </Link>
              )}
            </div>
          ))}
        </div>
      </BlockShell>
    );
  }

  return (
    <BlockShell>
      <div className="space-y-4">
        {data.items.map((card, index) => {
          const Icon = getServiceIcon(card.icon);
          const isOpen = openIndex === index;

          return (
            <motion.div
              key={`${card.href}-${card.title}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: EASE, delay: index * 0.08 }}
              className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
                isOpen ? 'border-brand-200 shadow-lg' : 'border-slate-200/80 shadow-sm hover:border-brand-200 hover:shadow-md'
              }`}
            >
              <button onClick={() => setOpenIndex(isOpen ? null : index)} className="flex w-full items-center gap-4 p-5 text-left sm:p-6">
                <span
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl shadow-xs transition-colors ${
                    isOpen ? 'bg-brand-600 text-white' : 'bg-slate-100 text-slate-700 group-hover:bg-brand-600 group-hover:text-white'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                </span>

                <div className="min-w-0 flex-1">
                  <h3 className={`text-lg font-bold transition-colors sm:text-xl ${isOpen ? 'text-brand-600' : 'text-slate-900'}`}>
                    {card.title}
                  </h3>
                  {card.badge && (
                    <span className="mt-0.5 inline-block rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-600">
                      {card.badge}
                    </span>
                  )}
                </div>

                <motion.span animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="shrink-0 text-slate-400">
                  <ChevronDown className="h-5 w-5" />
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <div className="border-t border-slate-100 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                      <p className="text-[14px] leading-[1.8] text-slate-600">{card.description}</p>

                      {card.features.length > 0 && (
                        <ul className="mt-4 space-y-2 border-t border-slate-100 pt-4">
                          {card.features.map((feature) => (
                            <li key={feature} className="flex items-center gap-2 text-xs font-medium text-slate-500">
                              <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-brand-600" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                      {card.href && (
                        <div className="mt-4 border-t border-slate-100 pt-4">
                          <Link
                            href={card.href}
                            className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-600 transition-colors hover:text-brand-700"
                          >
                            <span>{card.ctaLabel || 'Learn More'}</span>
                            <ArrowRight className="h-3.5 w-3.5 transition-transform hover:translate-x-1" />
                          </Link>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </BlockShell>
  );
}
