'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { useMotionPrefs } from '@/lib/motion';

interface MagneticProps {
  children: ReactNode;
  className?: string;
  /** radius (px) within which the button is attracted */
  strength?: number;
}

/**
 * Magnetic button wrapper: the element is slightly attracted toward the cursor
 * within a radius, then springs back when the cursor leaves.
 * Disabled on touch / mobile.
 */
export default function Magnetic({
  children,
  className = '',
  strength = 28,
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefs = useMotionPrefs();
  const enabledRef = useRef(false);
  const mouse = useRef({ x: 0, y: 0 });
  const elPos = useRef({ x: 0, y: 0 });
  const raf = useRef(0);

  useEffect(() => {
    if (prefs.loaded && prefs.allowHeavy) enabledRef.current = true;
  }, [prefs]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      if (!enabledRef.current) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 90) {
        mouse.current.x = (dx / dist) * Math.min(strength, (1 - Math.min(dist / 90, 1)) * 90);
        mouse.current.y = (dy / dist) * Math.min(strength, (1 - Math.min(dist / 90, 1)) * 90);
      } else {
        mouse.current.x = 0;
        mouse.current.y = 0;
      }
    };

    const onLeave = () => {
      mouse.current.x = 0;
      mouse.current.y = 0;
    };

    const loop = () => {
      elPos.current.x += (mouse.current.x - elPos.current.x) * 0.2;
      elPos.current.y += (mouse.current.y - elPos.current.y) * 0.2;
      el.style.transform = `translate3d(${elPos.current.x}px, ${elPos.current.y}px, 0)`;
      raf.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseout', onLeave);
    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseout', onLeave);
      cancelAnimationFrame(raf.current);
      el.style.transform = '';
    };
  }, [strength]);

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}
