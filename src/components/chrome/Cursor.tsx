'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useMediaQuery } from '@/lib/hooks';

/**
 * Custom cursor — a precise dot with a lagging ring that widens over
 * interactive elements.
 *
 * Three rules keep this from being obnoxious:
 *  1. Only on devices with a fine pointer and hover capability (never touch).
 *  2. Disabled entirely under prefers-reduced-motion.
 *  3. The real system cursor is NEVER hidden — replacing it breaks text-selection
 *     affordances, resize handles, and link semantics. This layers on top.
 *
 * Positioning: the outer span carries the x/y motion values, the inner span
 * carries the -50% centring. They must be separate elements — framer-motion's
 * `x` and CSS `translateX` both write `transform`, so combining them on one
 * node makes the two fight.
 */
export function Cursor() {
  const finePointer = useMediaQuery('(pointer: fine) and (hover: hover)');
  const reduceMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  const enabled = finePointer && !reduceMotion;

  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const ringX = useSpring(x, { stiffness: 300, damping: 26, mass: 0.35 });
  const ringY = useSpring(y, { stiffness: 300, damping: 26, mass: 0.35 });

  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = e.target as HTMLElement | null;
      setActive(
        !!el?.closest('a, button, [role="button"], input, textarea, select, [data-cursor="active"]'),
      );
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="no-print pointer-events-none fixed inset-0 z-[300] overflow-hidden"
      style={{ opacity: visible ? 1 : 0, transition: 'opacity 200ms ease' }}
    >
      {/* Dot — tracks the pointer exactly, no lag. */}
      <motion.span style={{ x, y }} className="absolute left-0 top-0 block">
        <span className="block size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent" />
      </motion.span>

      {/* Ring — spring-lagged, grows over interactive targets. */}
      <motion.span style={{ x: ringX, y: ringY }} className="absolute left-0 top-0 block">
        <motion.span
          animate={{ width: active ? 38 : 26, height: active ? 38 : 26 }}
          transition={{ type: 'spring', stiffness: 400, damping: 28 }}
          className={
            'block -translate-x-1/2 -translate-y-1/2 rounded-full border transition-colors duration-200 ' +
            (active ? 'border-accent bg-accent/10' : 'border-ink-3/40')
          }
        />
      </motion.span>
    </div>
  );
}
