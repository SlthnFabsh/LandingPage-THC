'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMotionPrefs } from '@/lib/motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxProps {
  children?: ReactNode;
  className?: string;
  /** translateY range in px */
  amount?: number;
  /** higher = more lag vs content */
  delay?: number;
}

/**
 * Lightweight scroll-linked vertical parallax. translateY only (no reflow/CLS).
 * Disabled on mobile / reduced-motion.
 */
export default function Parallax({
  children,
  className = '',
  amount = 60,
  delay = 0.15,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefs = useMotionPrefs();

  useEffect(() => {
    if (!prefs.loaded || prefs.isMobile || prefs.reduced) return;
    const el = ref.current;
    if (!el) return;

    const tween = gsap.fromTo(
      el,
      { y: -amount / 2 },
      {
        y: amount / 2,
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 0.6 + delay,
        },
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefs, amount, delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
