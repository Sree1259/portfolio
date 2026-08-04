'use client';

import React from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

/**
 * Base props shared by the button element path.
 */
interface ButtonBaseProps {
  variant?: ButtonVariant;
  className?: string;
  children?: React.ReactNode;
}

/**
 * Render as a native <button> (default).
 * Accepts all standard HTML button attributes.
 */
type ButtonAsButton = ButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    asChild?: false;
    href?: never;
  };

/**
 * Render as an <a> when `href` is provided.
 * Accepts all standard HTML anchor attributes.
 */
type ButtonAsAnchor = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    asChild?: true;
    href: string;
  };

/**
 * Render as an <a> when `href` is provided without `asChild`.
 * Convenience form: if href is given, renders as <a>.
 */
type ButtonWithHref = ButtonBaseProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof ButtonBaseProps> & {
    asChild?: never;
    href: string;
  };

type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonWithHref;

const variantClasses: Record<ButtonVariant, string> = {
  /**
   * Primary: deep navy background, animated cyan→violet→emerald gradient border
   * (3-second loop via the `animated-gradient-border` utility in globals.css),
   * white text, cyan glow on hover.
   */
  primary: [
    'bg-[#0d1b35]',
    'text-white',
    'animated-gradient-border',
    'shadow-[0_0_0_0_rgba(6,182,212,0)]',
    'hover:shadow-[0_0_16px_4px_rgba(6,182,212,0.35)]',
    'hover:bg-[#0f2145]',
    'transition-shadow transition-colors duration-200',
  ].join(' '),

  /**
   * Secondary: transparent background, solid cyan border, cyan-colored text.
   */
  secondary: [
    'bg-transparent',
    'border-2 border-[#06b6d4]',
    'text-[#06b6d4]',
    'hover:bg-[#06b6d4]/10',
    'transition-colors duration-200',
  ].join(' '),

  /**
   * Ghost: no border, subtle hover background.
   */
  ghost: [
    'bg-transparent',
    'border-0',
    'text-white/80',
    'hover:bg-white/5 hover:text-white',
    'transition-colors duration-200',
  ].join(' '),
};

/**
 * Accessible focus ring — meets 3:1 non-text contrast ratio requirement.
 * Uses focus-visible so the ring only appears for keyboard navigation, not mouse clicks.
 */
const focusClasses =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#06b6d4]';

const baseClasses = [
  'inline-flex items-center justify-center gap-2',
  'rounded-md px-5 py-2.5',
  'text-sm font-medium leading-none',
  'select-none whitespace-nowrap',
  'disabled:pointer-events-none disabled:opacity-50',
  focusClasses,
].join(' ');

/**
 * Button — polymorphic button/anchor primitive.
 *
 * Usage:
 *   <Button variant="primary">Click me</Button>
 *   <Button variant="secondary" href="/projects" asChild>View projects</Button>
 *   <Button variant="ghost" href="#contact">Contact</Button>
 */
const Button = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  ButtonProps
>((props, ref) => {
  const { variant = 'primary', className, children, ...rest } = props;

  const classes = cn(baseClasses, variantClasses[variant], className);

  // Render as <a> when href is provided (regardless of asChild flag)
  if ('href' in rest && rest.href !== undefined) {
    const { asChild: _asChild, href, ...anchorRest } =
      rest as ButtonAsAnchor & { asChild?: boolean };

    return (
      <a
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        className={classes}
        {...(anchorRest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    );
  }

  // Default: render as <button>
  const { asChild: _asChild, ...buttonRest } = rest as ButtonAsButton & {
    asChild?: boolean;
  };

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement>}
      type={(buttonRest as React.ButtonHTMLAttributes<HTMLButtonElement>).type ?? 'button'}
      className={classes}
      {...(buttonRest as React.ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
export type { ButtonProps, ButtonVariant };
