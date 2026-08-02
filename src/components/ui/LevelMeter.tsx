'use client';

import { motion } from 'framer-motion';
import { LEVEL_LABEL, type Level } from '@/content/profile';
import { useReducedMotionSafe } from '@/lib/hooks';

/**
 * Ordinal proficiency meter — four discrete steps, not a percentage.
 *
 * Why not a percentage bar: "SQL — 92%" is a self-assigned number with no
 * defensible basis, and every template portfolio has one. Four named steps
 * (Familiar / Working / Advanced / Core) say something a reader can actually
 * calibrate against, and the word is always rendered beside the meter, so the
 * level never depends on colour alone.
 *
 * The unfilled track is a lighter step of the fill's own hue, so state reads
 * across the whole bar rather than as "colour vs nothing".
 */
export function LevelMeter({ level, id }: { level: Level; id: string }) {
  const reduce = useReducedMotionSafe();
  const steps: Level[] = [1, 2, 3, 4];

  return (
    <span className="inline-flex items-center gap-2" role="img" aria-label={`Proficiency: ${LEVEL_LABEL[level]}`}>
      <span aria-hidden="true" className="flex gap-[3px]">
        {steps.map((step) => {
          const filled = step <= level;
          return (
            <motion.span
              key={step}
              initial={reduce ? false : { scaleX: 0 }}
              whileInView={reduce ? undefined : { scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.4,
                delay: step * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{ originX: 0 }}
              className={
                'block h-[3px] w-3.5 rounded-full ' +
                (filled ? 'bg-accent' : 'bg-accent/18')
              }
            />
          );
        })}
      </span>
      <span
        id={`${id}-level`}
        className="font-mono text-[0.625rem] uppercase tracking-wider text-ink-3"
      >
        {LEVEL_LABEL[level]}
      </span>
    </span>
  );
}
