'use client';

import { useEffect, useState } from 'react';
import { useMotionPrefs } from '@/lib/motion';

/**
 * Fine SVG grain/noise texture overlay for dark sections.
 * Uses an inline feTurbulence filter (no external image).
 * Disabled on mobile / reduced-motion for performance.
 */
export default function NoiseOverlay({ className = '' }: { className?: string }) {
  const prefs = useMotionPrefs();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (prefs.loaded && !prefs.isMobile && !prefs.reduced) setShow(true);
  }, [prefs]);

  if (!show) return null;

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <svg
        className="h-full w-full opacity-[0.035] mix-blend-overlay"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="thc-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#thc-noise)" />
      </svg>
    </div>
  );
}
