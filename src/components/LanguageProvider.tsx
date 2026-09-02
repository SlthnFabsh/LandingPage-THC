'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { Language, metaByLang, translate } from '@/lib/i18n';

const LNG_STORAGE_KEY = 'thc_lang';

interface LanguageContextValue {
  lang: Language;
  setLang: (lng: Language) => void;
  toggle: () => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('id');

  useEffect(() => {
    const saved = window.localStorage.getItem(LNG_STORAGE_KEY);
    if (saved === 'en' || saved === 'id') {
      setLangState(saved);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    const t = metaByLang[lang];
    document.title = t.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.desc);
  }, [lang]);

  const setLang = useCallback((lng: Language) => {
    setLangState(lng);
    try {
      window.localStorage.setItem(LNG_STORAGE_KEY, lng);
    } catch {
      // ignore storage errors (private mode etc.)
    }
  }, []);

  const toggle = useCallback(() => {
    setLangState((prev) => {
      const next: Language = prev === 'en' ? 'id' : 'en';
      try {
        window.localStorage.setItem(LNG_STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  const t = useCallback((key: string) => translate(lang, key), [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return ctx;
}