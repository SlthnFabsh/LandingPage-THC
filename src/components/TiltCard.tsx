'use client';

import { useEffect, useState, type ReactNode } from 'react';
import Tilt from 'react-parallax-tilt';
import { useMotionPrefs } from '@/lib/motion';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  glareColor?: string;
  scale?: number;
}

/**
 * 3D tilt wrapper for cards. Outer transform-only so inner Framer/whileHover still works.
 * Disabled on mobile / touch / reduced-motion -> renders plain div.
 */
export default function TiltCard({
  children,
  className = '',
  glareColor = 'rgba(99,169,255,0.25)',
  scale = 1.02,
}: TiltCardProps) {
  const prefs = useMotionPrefs();
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (prefs.loaded && prefs.allowHeavy) setEnabled(true);
  }, [prefs]);

  if (!enabled) return <div className={className}>{children}</div>;

  return (
    <Tilt
      className={className}
      tiltMaxAngleX={9}
      tiltMaxAngleY={9}
      perspective={1000}
      scale={scale}
      transitionSpeed={1200}
      glareEnable
      glareMaxOpacity={0.15}
      glareColor={glareColor}
      glarePosition="all"
    >
      {children}
    </Tilt>
  );
}
