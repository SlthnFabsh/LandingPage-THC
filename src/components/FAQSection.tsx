'use client';

import { useState } from 'react';
import { Mail, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';

const faqItems = [
  { qKey: 'faq.q1', aKey: 'faq.a1', anim: 'fade-left delay-100', highlight: true },
  { qKey: 'faq.q2', aKey: 'faq.a2', anim: 'fade-right delay-200', highlight: false },
  { qKey: 'faq.q3', aKey: 'faq.a3', anim: 'fade-left delay-300', highlight: false },
  { qKey: 'faq.q4', aKey: 'faq.a4', anim: 'fade-right delay-100', highlight: false },
  { qKey: 'faq.q5', aKey: 'faq.a5', anim: 'fade-left delay-200', highlight: false },
  { qKey: 'faq.q6', aKey: 'faq.a6', anim: 'fade-right delay-300', highlight: false },
];

function renderAnswer(t: (k: string) => string, aKey: string, highlight: boolean) {
  const text = t(aKey);
  if (!highlight) return <>{text}</>;

  const email = 'info@transhybrid.net.id';
  const parts = text.split(email);
  return (
    <>
      {parts[0]}
      <a href={`mailto:${email}`} className="text-brand-600 font-semibold underline">
        {email}
      </a>
      {parts.slice(1).join(email)}
    </>
  );
}

export default function FAQSection() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="border-t border-slate-100 bg-[#f8f7ff] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16 lg:px-8">
        <div className="fade-left">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{t('nav.faq')}</div>
          <div className="mb-7 flex items-end gap-3">
            <div className="h-20 w-24 overflow-hidden rounded-xl bg-slate-200 shadow-sm sm:h-24 sm:w-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/news-1.jpg" alt="Infrastruktur Trans Hybrid" className="h-full w-full object-cover" />
            </div>
            <div className="mb-[-12px] h-20 w-24 overflow-hidden rounded-xl bg-slate-200 shadow-sm sm:h-24 sm:w-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/borneo.png" alt="Jaringan Trans Hybrid" className="h-full w-full object-cover" />
            </div>
          </div>
          <h2 className="max-w-md text-5xl font-black leading-[0.98] tracking-[-0.06em] text-blue-900 sm:text-6xl">
            {t('faq.title')}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600">{t('faq.desc')}</p>
          <a
            href="mailto:info@transhybrid.net.id"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:bg-brand-700"
          >
            <Mail className="h-4 w-4" />
            <span>{t('nav.hubungi')}</span>
          </a>
        </div>

        <div className="space-y-3 fade-right">
          {faqItems.map(({ qKey, aKey, anim, highlight }, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`faq-item overflow-hidden rounded-xl border border-white bg-white shadow-sm transition-all hover:shadow-md ${anim}`}
              >
                <button
                  className="faq-header flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left focus:outline-none sm:px-6"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold leading-snug text-slate-900 sm:text-lg">{t(qKey)}</span>
                  {isOpen ? <Minus className="h-5 w-5 shrink-0 text-slate-500" /> : <Plus className="h-5 w-5 shrink-0 text-slate-500" />}
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-100 px-5 pb-6 pt-4 text-sm leading-relaxed text-slate-600 sm:px-6 sm:text-base">
                        {renderAnswer(t, aKey, highlight)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}