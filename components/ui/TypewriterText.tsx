'use client';

import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface TypewriterTextProps {
  strings: string[];
  className?: string;
  typingSpeed?: number;
  displayDuration?: number;
  deletingSpeed?: number;
}

type Phase = 'typing' | 'holding' | 'deleting' | 'waiting';

/**
 * TypewriterText — cycles through `strings` with a character-by-character
 * typing animation, a hold pause, and character-by-character deletion.
 *
 * Respects `prefers-reduced-motion`: uses a simple fade/swap between strings
 * instead of the typewriter animation when the user has requested reduced motion.
 *
 * Renders nothing when `strings` is empty.
 */
export function TypewriterText({
  strings,
  className,
  typingSpeed = 80,
  displayDuration = 2500,
  deletingSpeed = 40,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState('');
  const [phase, setPhase] = useState<Phase>('typing');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  // Detect reduced motion once on mount
  const prefersReduced = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  // ── Reduced-motion path: simple fade-swap ──────────────────────────────
  useEffect(() => {
    if (!prefersReduced.current || strings.length === 0) return;

    setDisplayed(strings[0]);
    setVisible(true);

    if (strings.length === 1) return;

    let idx = 0;
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        idx = (idx + 1) % strings.length;
        setDisplayed(strings[idx]);
        setVisible(true);
      }, 300);
    }, displayDuration);

    return () => clearInterval(interval);
    // Only run once — intentionally omitting `strings` from deps to avoid
    // re-triggering the reduced-motion cycle if the array reference changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Full typewriter path ───────────────────────────────────────────────
  useEffect(() => {
    if (prefersReduced.current || strings.length === 0) return;

    const current = strings[stringIndex] ?? '';

    if (phase === 'typing') {
      if (charIndex < current.length) {
        const timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex + 1));
          setCharIndex((c) => c + 1);
        }, typingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing — hold
        const timeout = setTimeout(() => setPhase('deleting'), displayDuration);
        return () => clearTimeout(timeout);
      }
    }

    if (phase === 'deleting') {
      if (charIndex > 0) {
        const timeout = setTimeout(() => {
          setDisplayed(current.slice(0, charIndex - 1));
          setCharIndex((c) => c - 1);
        }, deletingSpeed);
        return () => clearTimeout(timeout);
      } else {
        // Finished deleting — move to next string
        setStringIndex((i) => (i + 1) % strings.length);
        setPhase('typing');
      }
    }
  }, [phase, charIndex, stringIndex, strings, typingSpeed, displayDuration, deletingSpeed]);

  if (strings.length === 0) return null;

  // Reduced-motion: fade transition
  if (prefersReduced.current) {
    return (
      <span
        className={cn(
          'transition-opacity duration-300',
          visible ? 'opacity-100' : 'opacity-0',
          className,
        )}
      >
        {displayed}
      </span>
    );
  }

  // Full typewriter with blinking cursor
  return (
    <span className={cn(className)}>
      {displayed}
      <span
        aria-hidden="true"
        className="inline-block w-[2px] animate-[fade-in_0.7s_ease-in-out_infinite_alternate] bg-current ml-0.5 align-middle"
        style={{ height: '1em' }}
      />
    </span>
  );
}
