'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      id="back-to-top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Kembali ke Atas"
      className={`fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-600/40 hover:bg-brand-500 transition-all ${
        visible
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 pointer-events-none translate-y-4'
      }`}
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}