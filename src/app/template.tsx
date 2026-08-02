'use client';

import { motion } from 'framer-motion';
import { useReducedMotionSafe } from '@/lib/hooks';

/**
 * Page transition.
 *
 * A template (not a layout) remounts on navigation, which is what makes the
 * fade fire when moving between the home page and a case study.
 *
 * Note there is deliberately no full-screen "loading screen" splash on first
 * load: an artificial pre-loader delays Largest Contentful Paint, tanks the
 * Lighthouse score, and makes a recruiter wait for content they came to read.
 * Fast is the premium feel.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotionSafe();

  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
