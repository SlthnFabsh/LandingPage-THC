'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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
    <section id="faq" className="py-24 bg-white border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* FAQ Header */}
        <div className="text-center mb-16 fade-down">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">{t('faq.title')}</h2>
          <div className="w-12 h-1 bg-brand-600 mx-auto rounded-full mb-4"></div>
          <p className="text-slate-600 text-base font-normal">{t('faq.desc')}</p>
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4">
          {faqItems.map(({ qKey, aKey, anim, highlight }, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`faq-item rounded-2xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-all overflow-hidden ${anim}`}
              >
                <button
                  className="faq-header w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  onClick={() => toggle(i)}
                >
                  <span className="font-bold text-slate-900 text-base sm:text-lg">{t(qKey)}</span>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 ml-4">
                    <ChevronDown
                      className={`faq-icon w-5 h-5 text-slate-500 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`faq-content px-6 pb-6 text-slate-600 text-sm sm:text-base leading-relaxed border-t border-slate-200/60 pt-4 ${
                    isOpen ? '' : 'hidden'
                  }`}
                >
                  {renderAnswer(t, aKey, highlight)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}