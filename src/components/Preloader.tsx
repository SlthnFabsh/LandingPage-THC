'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionPrefs } from '@/lib/motion';

const STORAGE_KEY = 'thc_loaded';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [show, setShow] = useState(true);
  const doneRef = useRef(false);
  const prefs = useMotionPrefs();

  useEffect(() => {
    // Skip entirely if already shown this session
    let alreadyLoaded = false;
    try {
      alreadyLoaded = sessionStorage.getItem(STORAGE_KEY) === '1';
    } catch {
      /* ignore */
    }

    if (alreadyLoaded || !prefs.loaded) {
      if (alreadyLoaded && prefs.loaded) {
        setShow(false);
        setHidden(true);
      }
      return;
    }

    const duration = prefs.reduced ? 200 : 1500;
    const start = performance.now();
    const steps = 24;
    let i = 0;

    // Use setInterval with coarse ticks to minimize React re-renders / main-thread load
    const timer = window.setInterval(() => {
      i += 1;
      const elapsed = performance.now() - start;
      const p = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      if (p >= 1) {
        window.clearInterval(timer);
        finish();
      }
    }, duration / steps);

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      try {
        sessionStorage.setItem(STORAGE_KEY, '1');
      } catch {
        /* ignore */
      }
      window.setTimeout(() => setHidden(true), prefs.reduced ? 0 : 200);
    };

    return () => {
      window.clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prefs.loaded, prefs.reduced]);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0b132b] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Logo scale + fade */}
      <div
        className={`relative transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          hidden ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/assets/images/logo1.png"
          alt=""
          className="h-28 w-auto object-contain sm:h-36"
        />
      </div>

      {/* Progress bar */}
      <div className="mt-10 h-[3px] w-56 overflow-hidden rounded-full bg-white/15 sm:w-64">
        <div
          className="h-full rounded-full bg-[#63a9ff] transition-[width] duration-100 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="mt-4 text-sm font-semibold tabular-nums tracking-widest text-white/70">
        {progress}%
      </div>
    </div>
  );
}
