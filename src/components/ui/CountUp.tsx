'use client';

import { animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useReducedMotionSafe } from '@/lib/hooks';

/**
 * Counts a stat value up from zero when it scrolls into view.
 *
 * The metric strings are not plain numbers — they carry units and shapes like
 * "20 hrs", "45 min", "15%", "1,000+", "100K+", "4.58". Only the numeric token
 * animates; the prefix, unit/suffix, thousands separators and decimal places
 * are preserved exactly so "1,000+" counts up to "1,000+", not "1000".
 *
 * SSR renders the real, final value (so search engines and no-JS visitors get
 * the truth, and hydration matches). Only after mount does a motion-enabled
 * client reset to zero and animate. Under prefers-reduced-motion the value is
 * shown immediately, never animated. An unparseable value renders verbatim.
 */
type Parsed = {
  prefix: string;
  target: number;
  decimals: number;
  hasComma: boolean;
  suffix: string;
};

function parse(value: string): Parsed | null {
  const m = value.match(/^(\D*)([\d,]+(?:\.\d+)?)(.*)$/s);
  if (!m) return null;
  const [, prefix, numStr, suffix] = m;
  const decimals = numStr!.includes('.') ? numStr!.split('.')[1]!.length : 0;
  return {
    prefix: prefix!,
    target: parseFloat(numStr!.replace(/,/g, '')),
    decimals,
    hasComma: numStr!.includes(','),
    suffix: suffix!,
  };
}

function format(n: number, { prefix, decimals, hasComma, suffix }: Parsed): string {
  const fixed = n.toFixed(decimals);
  if (!hasComma) return `${prefix}${fixed}${suffix}`;
  const [int, dec] = fixed.split('.');
  const grouped = int!.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return `${prefix}${dec ? `${grouped}.${dec}` : grouped}${suffix}`;
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const parsed = parse(value);
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  // Start at the real value so SSR and the first client render agree.
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!parsed || reduce) {
      setDisplay(value);
      return;
    }
    if (!inView) {
      // Motion is on but the tile hasn't been reached — park it at zero so the
      // count has somewhere to start from.
      setDisplay(format(0, parsed));
      return;
    }
    const controls = animate(0, parsed.target, {
      duration: 1.1,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(format(v, parsed)),
    });
    return () => controls.stop();
    // parsed is derived from value; value is the real dependency.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, reduce, value]);

  if (!parsed) return <span className={className}>{value}</span>;
  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
