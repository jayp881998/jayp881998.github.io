'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** Reading-progress hairline pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 320, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="no-print fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-accent via-violet to-aqua"
    />
  );
}
