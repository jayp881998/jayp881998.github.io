'use client';

import { motion } from 'framer-motion';
import { useId } from 'react';
import { useReducedMotionSafe } from '@/lib/hooks';
import { cn } from '@/lib/utils';

/**
 * Tiny inline-SVG sparkline — a single-hue activity motif, not a data chart.
 *
 * Deliberately dependency-free (no Recharts/d3): the only use on the site is
 * this one decorative hero tile, and a full charting library would cost ~100KB
 * against the site's fast-LCP goal for a fifteen-line polyline. It is
 * aria-hidden and carries no axis or values, so it reads as "a live system is
 * running" rather than asserting a specific measured trend.
 */
export function Sparkline({
  data,
  className,
  strokeWidth = 1.6,
}: {
  data: number[];
  className?: string;
  strokeWidth?: number;
}) {
  const reduce = useReducedMotionSafe();
  const gradientId = useId();

  const w = 100;
  const h = 32;
  const pad = 2;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const stepX = (w - pad * 2) / (data.length - 1);

  const points = data.map((v, i) => {
    const x = pad + i * stepX;
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });

  const line = points.map(([x, y], i) => `${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
  const area = `${line} L ${points[points.length - 1]![0].toFixed(2)} ${h} L ${points[0]![0].toFixed(2)} ${h} Z`;

  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn('block', className)}
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.22" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </linearGradient>
      </defs>

      <path d={area} fill={`url(#${gradientId})`} stroke="none" />

      <motion.path
        d={line}
        fill="none"
        stroke="var(--accent)"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        initial={reduce ? false : { pathLength: 0 }}
        whileInView={reduce ? undefined : { pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0, 0, 0.2, 1] }}
      />
    </svg>
  );
}
