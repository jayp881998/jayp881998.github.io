'use client';

import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useRef, useState } from 'react';
import type { PipelineStage } from '@/content/profile';
import { Icon } from './Icon';
import { useReducedMotionSafe } from '@/lib/hooks';
import { cn } from '@/lib/utils';

/**
 * The site's signature visual: a project's actual architecture, rendered from
 * data rather than shipped as a screenshot of a Visio diagram.
 *
 * Deliberately NOT a chart. There is no measured data here, so drawing it as
 * bars or a line would be fabricating an encoding — this is structure, and it
 * is drawn as structure. It also stays readable at any width and in any theme,
 * which an exported image never does.
 */
export function PipelineDiagram({
  stages,
  className,
  compact = false,
}: {
  stages: PipelineStage[];
  className?: string;
  compact?: boolean;
}) {
  const reduce = useReducedMotionSafe();
  if (!stages.length) return null;

  return (
    <div className={cn('relative', className)}>
      <ol
        className={cn(
          'grid gap-3',
          compact ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-2 lg:grid-cols-3',
        )}
      >
        {stages.map((stage, i) => (
          <motion.li
            key={stage.label}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -8% 0px' }}
            transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="group relative"
          >
            <div className="card h-full p-4">
              <div className="flex items-start gap-3">
                <span
                  aria-hidden="true"
                  className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-accent-line bg-accent-wash text-accent"
                >
                  <Icon name={stage.kind} size={16} />
                </span>

                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="tabular font-mono text-[0.625rem] text-ink-3">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="truncate text-sm font-medium text-ink">{stage.label}</p>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-ink-3">{stage.detail}</p>
                </div>
              </div>
            </div>

            {/* Flow connector — hidden on the last item and on stacked layouts. */}
            {i < stages.length - 1 && (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -right-3 top-1/2 hidden h-px w-3 -translate-y-1/2 bg-line-strong sm:block"
              />
            )}
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Scroll-linked vertical rail — the flagship's signature moment.
 *
 * As the reader scrolls the section, each stage activates in sequence, tied to
 * scroll position (so it tracks back and forth, not a one-shot reveal). The
 * connector segment to an already-reached stage fills with the accent, so the
 * eye follows the data down its actual path. Under reduced motion every stage
 * is shown active immediately with no scroll dependency.
 *
 * Deliberately no per-stage "counting metric": the stages carry no measured
 * per-node figure, and inventing one for each would fabricate numbers — which
 * this site never does. The sequential reveal is the effect; the honest detail
 * line under each stage is the payload.
 */
export function ScrollyPipeline({ stages }: { stages: PipelineStage[] }) {
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLOListElement>(null);
  // Progress runs 0→1 as the list travels from low in the viewport to high,
  // which is the window during which the reader is actually reading it.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 75%', 'end 55%'],
  });
  const [active, setActive] = useState(-1);

  useMotionValueEvent(scrollYProgress, 'change', (p) => {
    setActive(Math.min(stages.length - 1, Math.floor(p * stages.length)));
  });

  if (!stages.length) return null;

  return (
    <ol ref={ref} className="space-y-2">
      {stages.map((stage, i) => {
        const on = reduce || i <= active;
        const linkOn = reduce || i < active;
        const last = i === stages.length - 1;

        return (
          <li key={stage.label} className="flex gap-4">
            {/* Node + connector column — self-stretch makes the connector fill
                exactly to the next node regardless of card height. */}
            <div className="flex flex-col items-center self-stretch">
              <span
                aria-hidden="true"
                className={cn(
                  'grid size-9 shrink-0 place-items-center rounded-lg border transition-colors duration-500 sm:size-10',
                  on
                    ? 'border-accent-line bg-accent-wash text-accent'
                    : 'border-line bg-surface-2 text-ink-3',
                )}
              >
                <Icon name={stage.kind} size={16} />
              </span>
              {!last && (
                <span
                  aria-hidden="true"
                  className={cn(
                    'mt-1 w-px flex-1 transition-colors duration-500',
                    linkOn ? 'bg-accent' : 'bg-line',
                  )}
                />
              )}
            </div>

            <div
              className={cn(
                'card mb-1 flex-1 p-4 transition-opacity duration-500',
                on ? 'opacity-100' : 'opacity-45',
              )}
            >
              <div className="flex items-baseline gap-2">
                <span className="tabular font-mono text-[0.625rem] text-ink-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="text-sm font-medium text-ink">{stage.label}</p>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-ink-3">{stage.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/**
 * Condensed inline version for the hero — the pipeline as a single line of
 * labelled nodes with an animated pulse travelling along it.
 */
export function PipelineStrip({ stages }: { stages: PipelineStage[] }) {
  const reduce = useReducedMotionSafe();

  return (
    // The strip scrolls horizontally when it outruns the container. The mask
    // fades the trailing edge so a cut-off node reads as "there is more this
    // way" rather than as a broken layout.
    <div className="marquee-mask relative w-full overflow-hidden">
      <ol className="flex items-center gap-1 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {stages.map((stage, i) => (
          <li key={stage.label} className="flex shrink-0 items-center gap-1">
            <div className="group flex items-center gap-2 rounded-lg border border-line bg-surface-2/70 px-3 py-2 backdrop-blur-sm transition-colors hover:border-accent-line">
              <Icon name={stage.kind} size={14} className="text-accent" />
              <span className="whitespace-nowrap text-xs font-medium text-ink-2 group-hover:text-ink">
                {stage.label}
              </span>
            </div>

            {i < stages.length - 1 && (
              <span aria-hidden="true" className="relative block h-px w-6 bg-line-strong">
                {!reduce && (
                  <motion.span
                    className="absolute inset-y-0 left-0 block w-2 rounded-full bg-accent"
                    animate={{ x: [0, 24], opacity: [0, 1, 0] }}
                    transition={{
                      duration: 1.4,
                      delay: i * 0.28,
                      repeat: Infinity,
                      repeatDelay: stages.length * 0.28,
                      ease: 'easeInOut',
                    }}
                  />
                )}
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
