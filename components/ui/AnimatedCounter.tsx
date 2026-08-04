'use client';

import React, { useEffect, useRef } from 'react';
import {
  useMotionValue,
  useInView,
  animate,
} from 'framer-motion';

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
}

/**
 * AnimatedCounter — counts from 0 to `target` when scrolled into view.
 *
 * Respects `prefers-reduced-motion`: skips animation and shows the final
 * value immediately when the user has requested reduced motion.
 */
export function AnimatedCounter({
  target,
  suffix = '',
  duration = 1.5,
}: AnimatedCounterProps) {
  const count = useMotionValue(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref as React.RefObject<any>, { once: true });
  const [display, setDisplay] = React.useState('0');

  useEffect(() => {
    // Detect prefers-reduced-motion
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setDisplay(String(target));
      return;
    }

    if (!isInView) return;

    const controls = animate(count, target, {
      duration,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplay(String(Math.round(latest)));
      },
    });

    return () => controls.stop();
  }, [isInView, target, duration, count]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}
