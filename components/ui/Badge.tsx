import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'accent';
}

export function Badge({ children, className, variant = 'default' }: BadgeProps) {
  return (
    <span
      className={cn(
        // Pill shape, typography, and spacing
        'inline-flex items-center rounded-full px-2.5 py-0.5 font-mono text-xs',
        // Glassmorphism background with subtle border
        'border border-white/10 bg-white/5 backdrop-blur-sm',
        // Text color per variant
        variant === 'accent'
          ? 'text-accent-cyan border-accent-cyan/20 bg-accent-cyan/10'
          : 'text-white/70',
        className,
      )}
    >
      {children}
    </span>
  );
}
