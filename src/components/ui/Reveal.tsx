'use client';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useReducedMotionSafe } from '@/lib/hooks';

/**
 * Scroll-in reveal. Deliberately restrained — an 18px rise and a fade, once.
 * Long distances and bounces read as a template; this reads as polish.
 *
 * Respects prefers-reduced-motion by rendering the final state immediately.
 */
export function Reveal({
  children,
  delay = 0,
  y = 18,
  className,
  as = 'div',
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: 'div' | 'li' | 'section' | 'span';
}) {
  const reduce = useReducedMotionSafe();
  const MotionTag = motion[as];

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/** Staggers direct children. Pair with <RevealChild>. */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotionSafe();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
    >
      {children}
    </motion.div>
  );
}

export function RevealChild({ children, className }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotionSafe();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 16 },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}
