import { type Variants, type Transition } from 'framer-motion';

/** Fade up — base entrance animation for most sections */
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

/** Stagger container — 100ms between children */
export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

/** Stagger container slow — 150ms between children (Experience timeline) */
export const staggerContainerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

/** Stagger badge — 50ms between children (Skills section) */
export const staggerBadge: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

/**
 * Hero entrance sequence — custom delay per element index.
 * Usage: <motion.div variants={heroSequence} custom={0}> (name)
 *        <motion.div variants={heroSequence} custom={1}> (tagline)
 *        etc.
 */
export const heroSequence: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.2, duration: 0.4, ease: 'easeOut' },
  }),
};

/** Card hover — applied as whileHover prop, not as variant */
export const cardHover = {
  y: -4,
  boxShadow: '0 8px 32px 0 rgba(6, 182, 212, 0.25)',
  transition: { duration: 0.2 } as Transition,
};
