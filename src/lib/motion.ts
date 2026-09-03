'use client';

import { useEffect, useState } from 'react';

export interface MotionPrefs {
  loaded: boolean;
  reduced: boolean;
  coarsePointer: boolean;
  isMobile: boolean;
  allowHeavy: boolean;
}

/**
 * Global gate for heavy animations (custom cursor, tilt, text-split, parallax, noise).
 * - prefers-reduced-motion: disable all non-essential animation
 * - coarsePointer (touch): disable cursor/tilt/parallax-full
 * - isMobile (<768px): disable cursor/tilt/split
 */
export function useMotionPrefs(): MotionPrefs {
  const [state, setState] = useState<MotionPrefs>({
    loaded: false,
    reduced: false,
    coarsePointer: false,
    isMobile: typeof window !== 'undefined' && window.innerWidth < 768,
    allowHeavy: false,
  });

  useEffect(() => {
    const mqReduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mqFine = window.matchMedia('(pointer: fine)');
    const mqWidth = window.matchMedia('(max-width: 767px)');
    const mqCoarse = window.matchMedia('(pointer: coarse)');

    const update = () => {
      const reduced = mqReduce.matches;
      const coarsePointer = mqCoarse.matches || !mqFine.matches;
      const isMobile = mqWidth.matches;
      setState({
        loaded: true,
        reduced,
        coarsePointer,
        isMobile,
        allowHeavy: !reduced && !isMobile && !coarsePointer,
      });
    };

    update();
    mqReduce.addEventListener('change', update);
    mqFine.addEventListener('change', update);
    mqWidth.addEventListener('change', update);
    mqCoarse.addEventListener('change', update);

    return () => {
      mqReduce.removeEventListener('change', update);
      mqFine.removeEventListener('change', update);
      mqWidth.removeEventListener('change', update);
      mqCoarse.removeEventListener('change', update);
    };
  }, []);

  return state;
}
