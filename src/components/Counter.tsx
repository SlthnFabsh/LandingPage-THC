'use client';

import { useEffect, useRef, useState } from 'react';

interface CounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  display?: string;
  animTarget?: number;
  className?: string;
}

export default function Counter({
  target,
  suffix = '',
  prefix = '',
  display,
  animTarget,
  className,
}: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [text, setText] = useState(`${prefix}0${suffix}`);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const duration = 2200;
    const end = typeof animTarget === 'number' ? animTarget : target;
    let startTime = 0;

    const updateCounter = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentNum = Math.floor(easeProgress * end);

      if (progress < 1) {
        setText(`${prefix}${currentNum}${suffix}`);
        requestAnimationFrame(updateCounter);
      } else {
        setText(display ?? `${prefix}${target}${suffix}`);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !startedRef.current) {
            startedRef.current = true;
            startTime = performance.now();
            requestAnimationFrame(updateCounter);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, suffix, prefix, display, animTarget]);

  return (
    <div ref={ref} className={className}>
      {text}
    </div>
  );
}