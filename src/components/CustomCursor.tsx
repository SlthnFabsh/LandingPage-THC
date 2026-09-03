'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionPrefs } from '@/lib/motion';

/**
 * Custom cursor: small dot + lagging ring.
 * Only enabled on fine-pointer, non-mobile, non-reduced-motion.
 * Grows into outline ring when hovering interactive elements.
 */
export default function CustomCursor() {
  const prefs = useMotionPrefs();
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  const mouse = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const base = 32;

  useEffect(() => {
    if (prefs.loaded && prefs.allowHeavy) setEnabled(true);
  }, [prefs]);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add('thc-cursor-active');

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      setVisible(true);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%,-50%)`;
      }
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest(
        'a, button, [data-cursor="link"], [role="button"], select, input, textarea'
      );
      setHovering(!!target);
    };

    const onLeave = () => setVisible(false);
    const onEnterDoc = () => setVisible(true);

    const loop = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%,-50%) scale(${
          hovering ? 1.5 : 1
        })`;
        ringRef.current.style.backgroundColor = hovering ? 'rgba(255,213,0,0.10)' : 'transparent';
        ringRef.current.style.borderColor = hovering ? '#ffd500' : '#63a9ff';
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseover', onOver);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnterDoc);
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('thc-cursor-active');
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnterDoc);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, hovering]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[5000] h-1.5 w-1.5 rounded-full bg-[#63a9ff] transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
      />
      {/* Ring (fixed base size, scale via transform to avoid reflow) */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className={`pointer-events-none fixed left-0 top-0 z-[5000] rounded-full border-[1.5px] transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ width: base, height: base }}
      />
    </>
  );
}
