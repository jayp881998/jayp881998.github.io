'use client';

import { motion } from 'framer-motion';
import type { Metric } from '@/content/profile';
import { useReducedMotionSafe, useSpotlight } from '@/lib/hooks';
import { cn } from '@/lib/utils';

/**
 * Stat tile — label, value, and the provenance of the number.
 *
 * Follows the stat-tile contract: label in sentence case with no trailing
 * colon, value in the UI sans at semibold. No delta and no sparkline, because
 * there is no honest comparison period for these figures — an invented
 * "+12% vs last quarter" would be the fastest way to lose a reader's trust.
 *
 * `detail` is what turns a number into evidence: it names where it came from.
 */
export function StatTile({ metric, index = 0 }: { metric: Metric; index?: number }) {
  const reduce = useReducedMotionSafe();
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <motion.div
      ref={ref}
      onPointerMove={onPointerMove}
      initial={reduce ? false : { opacity: 0, y: 14 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      className="card spotlight group relative overflow-hidden p-5 transition-colors duration-300 hover:border-accent-line sm:p-6"
    >
      {/* Value — proportional figures; tabular-nums would make it look loose. */}
      <p className="figure text-3xl font-semibold text-ink sm:text-[2.125rem]">{metric.value}</p>

      {/* Label — the text token, never the accent colour. */}
      <p className="mt-2 text-sm font-medium leading-snug text-ink">{metric.label}</p>

      <p className="mt-2 text-[0.8125rem] leading-relaxed text-ink-3">{metric.detail}</p>

      {/* Hairline accent that grows on hover — the only decorative mark. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
    </motion.div>
  );
}

export function StatGrid({ metrics, className }: { metrics: Metric[]; className?: string }) {
  // Pick the column count that divides evenly, so the last row is never a
  // single orphaned tile (4 metrics in a 3-wide grid leaves one stranded).
  const columns = metrics.length % 3 === 0 ? 'lg:grid-cols-3' : 'lg:grid-cols-4';

  return (
    <div className={cn('grid gap-3 sm:grid-cols-2', columns, className)}>
      {metrics.map((m, i) => (
        <StatTile key={m.label} metric={m} index={i} />
      ))}
    </div>
  );
}
