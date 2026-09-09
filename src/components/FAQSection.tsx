'use client';

import { useState } from 'react';
import { Mail, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '@/components/LanguageProvider';
import type { FaqEntryData } from '@/lib/content';

interface FAQSectionProps {
  faqs: FaqEntryData[];
  contactEmail?: string;
}

const anims = ['fade-left delay-100', 'fade-right delay-200', 'fade-left delay-300', 'fade-right delay-100', 'fade-left delay-200', 'fade-right delay-300'];

function renderAnswer(text: string, email?: string) {
  if (!email || !text.includes(email)) return <>{text}</>;

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

export default function FAQSection({ faqs, contactEmail = 'info@transhybrid.net.id' }: FAQSectionProps) {
  const { lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqTitle = lang === 'id' ? 'Pertanyaan yang Sering Diajukan' : 'Frequently Asked Questions';
  const faqDesc =
    lang === 'id'
      ? 'Punya pertanyaan? Kami telah menyediakan jawaban umum untuk membantu Anda.'
      : 'Have questions? We\'ve provided common answers to help you.';

  const faqTitleWords = faqTitle.split(' ');
  const titleBreak = faqTitleWords.length > 3 ? 3 : 2;

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="border-t border-slate-100 bg-[#f8f7ff] py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-16 lg:px-8">
        <div className="fade-left">
          <div className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{lang === 'id' ? 'FAQ' : 'FAQ'}</div>
          <div className="mb-7 flex items-end gap-3">
            <div className="h-20 w-24 overflow-hidden rounded-xl bg-slate-200 shadow-sm sm:h-24 sm:w-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/news-1.webp" alt="Infrastruktur Trans Hybrid" className="h-full w-full object-cover" />
            </div>
            <div className="mb-[-12px] h-20 w-24 overflow-hidden rounded-xl bg-slate-200 shadow-sm sm:h-24 sm:w-28">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/images/borneo.webp" alt="Jaringan Trans Hybrid" className="h-full w-full object-cover" />
            </div>
          </div>
          <h2 className="max-w-md text-[clamp(1.75rem,3vw,2.45rem)] font-bold leading-[1.15] tracking-[-0.02em] text-blue-900">
            <span className="block">{faqTitleWords.slice(0, titleBreak).join(' ')}</span>
            <span className="block">{faqTitleWords.slice(titleBreak).join(' ')}</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-slate-600">{faqDesc}</p>
          <a
            href={`mailto:${contactEmail}`}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-slate-950 px-5 py-3 text-[15px] font-medium text-white shadow-lg shadow-slate-900/15 transition hover:bg-brand-700"
          >
            <Mail className="h-4 w-4" />
            <span>{lang === 'id' ? 'Hubungi Kami' : 'Contact Us'}</span>
          </a>
        </div>

        <div className="space-y-3 fade-right">
          {faqs.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={item.id}
                className={`faq-item overflow-hidden rounded-xl border border-white bg-white shadow-sm transition-all hover:shadow-md ${anims[i % anims.length]}`}
              >
                <button
                  className="faq-header flex min-h-[72px] w-full cursor-pointer items-center justify-between gap-4 px-5 py-5 text-left focus:outline-none sm:px-6"
                  onClick={() => toggle(i)}
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold leading-snug text-slate-900 sm:text-lg">
                    {lang === 'id' ? item.questionId : item.questionEn}
                  </span>
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
                        {renderAnswer(lang === 'id' ? item.answerId : item.answerEn, contactEmail)}
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