'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionPrefs } from '@/lib/motion';

interface TextSplitProps {
  text: string;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  stagger?: number;
  delay?: number;
  mode?: 'chars' | 'words';
}

/**
 * Per-character (or per-word) reveal on scroll into view.
 * Uses GSAP ScrollTrigger (once) + SplitType, loaded lazily to keep them
 * off the critical initial bundle.
 * Falls back to static render on mobile / reduced-motion / coarse pointer.
 */
export default function TextSplit({
  text,
  className = '',
  as = 'h2',
  stagger = 0.02,
  delay = 0,
  mode = 'chars',
}: TextSplitProps) {
  const ref = useRef<HTMLElement | null>(null);
  const prefs = useMotionPrefs();
  const [staticRender, setStaticRender] = useState(false);

  useEffect(() => {
    if (prefs.loaded && !prefs.allowHeavy) {
      setStaticRender(true);
    }
  }, [prefs]);

  useEffect(() => {
    if (!prefs.loaded || !prefs.allowHeavy) return;
    const el = ref.current;
    if (!el) return;
    let cancelled = false;

    Promise.all([
      import('split-type'),
      import('gsap'),
      import('gsap/ScrollTrigger'),
    ]).then(([{ default: SplitType }, { default: gsap }, { default: ScrollTrigger }]) => {
      if (cancelled) return;

      const split = new SplitType(el, {
        types: mode === 'chars' ? 'chars' : 'words',
        tagName: 'span',
      });
      const targets = mode === 'chars' ? split.chars : split.words;
      if (!targets || targets.length === 0) {
        split.revert();
        return;
      }

      gsap.set(targets, {
        yPercent: 120,
        rotate: 6,
        opacity: 0,
        display: 'inline-block',
      });

      const tween = gsap.to(targets, {
        yPercent: 0,
        rotate: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power4.out',
        stagger,
        delay,
      });

      const st = ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => tween.play(),
      });

      return () => {
        st.kill();
        tween.kill();
        split.revert();
      };
    });

    return () => {
      cancelled = true;
    };
  }, [prefs, text, stagger, delay, mode]);

  if (staticRender) {
    const Tag = as as 'span';
    return <Tag className={className}>{text}</Tag>;
  }

  const Tag = as as 'span';
  return (
    <Tag
      ref={ref as never}
      className={className}
      style={{ transform: prefs.loaded && prefs.allowHeavy ? 'none' : undefined }}
    >
      {text}
    </Tag>
  );
}
