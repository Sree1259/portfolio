'use client';

import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

/**
 * Elevated card with glassmorphism background and hover lift effect.
 * When `onClick` is provided, renders as an accessible interactive element.
 */
export function Card({ children, className, onClick }: CardProps) {
  const isInteractive = typeof onClick === 'function';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };

  return (
    <div
      className={cn(
        'rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_0_rgba(6,182,212,0.25)] hover:border-white/20',
        isInteractive && 'cursor-pointer',
        className
      )}
      onClick={isInteractive ? onClick : undefined}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
    >
      {children}
    </div>
  );
}
