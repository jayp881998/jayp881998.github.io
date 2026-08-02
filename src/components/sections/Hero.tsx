'use client';

import { motion } from 'framer-motion';
import { identity, metrics, projects, quickFacts } from '@/content/profile';
import { useReducedMotionSafe } from '@/lib/hooks';
import { asset } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Icon } from '@/components/ui/Icon';
import { PipelineStrip } from '@/components/ui/PipelineDiagram';
import { Container } from '@/components/ui/Section';
import { StatTile } from '@/components/ui/StatTile';

/**
 * The 10-second answer.
 *
 * Ordering is deliberate and is the whole design argument of the page:
 *   1. Who + what + where  (one mono line — read in ~1s)
 *   2. What I do for a business  (the H1 — a claim, not a job title)
 *   3. How I do it  (one supporting sentence)
 *   4. Proof  (six verifiable numbers, immediately below the fold line)
 *   5. Actions  (resume first — it is what a recruiter actually wants)
 *
 * A recruiter who reads only items 1, 2 and 4 has everything they need to
 * decide whether to open the resume. That is the entire job of this screen.
 */
export function Hero() {
  const reduce = useReducedMotionSafe();
  const featured = projects.find((p) => p.featured);

  const rise = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section id="top" className="relative pt-24 sm:pt-32 lg:pt-40">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
          <div className="max-w-2xl">
            {/* 1. Identity line — availability, name, role, location. */}
            <motion.div {...rise(0)} className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface-2/70 py-1 pl-2 pr-3 backdrop-blur-sm">
                <span className="relative grid size-2 place-items-center">
                  <span className="absolute size-2 rounded-full bg-aqua ping-soft" />
                  <span className="size-2 rounded-full bg-aqua" />
                </span>
                <span className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-2">
                  Open to work
                </span>
              </span>

              <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-3">
                {identity.name} · {identity.location}
              </p>
            </motion.div>

            {/* 2. The claim. */}
            <motion.h1
              {...rise(0.07)}
              className="mt-6 text-[2rem] font-semibold leading-[1.1] text-ink sm:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.06]"
            >
              I build the{' '}
              <span className="bg-gradient-to-br from-accent-hi via-accent to-violet bg-clip-text text-transparent">
                SQL-to-Power BI reporting
              </span>{' '}
              that operations and inventory teams actually run on.
            </motion.h1>

            {/* 3. How. */}
            <motion.p {...rise(0.14)} className="mt-6 text-base leading-relaxed text-ink-2 sm:text-lg">
              {identity.subheadline}
            </motion.p>

            {/* Scannable credibility strip. */}
            <motion.ul {...rise(0.2)} className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-2">
              {quickFacts.map((fact) => (
                <li
                  key={fact}
                  className="rounded-full border border-line bg-surface-2/60 px-3 py-1 text-xs text-ink-2"
                >
                  {fact}
                </li>
              ))}
            </motion.ul>

            {/* 5. Actions — resume is the primary, not "hire me". */}
            <motion.div {...rise(0.27)} className="mt-9 flex flex-wrap items-center gap-2.5">
              <a
                href={asset(identity.resume)}
                download=""
                className="conic-ring inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-bg transition-transform hover:scale-[1.03] active:scale-95"
              >
                <Icon name="download" size={17} />
                Download resume
              </a>

              <a
                href="#work"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-line-strong bg-surface-2/60 px-6 text-[0.9375rem] font-medium text-ink backdrop-blur-sm transition-colors hover:border-accent-line hover:bg-surface-3"
              >
                View work
                <Icon name="arrowRight" size={16} />
              </a>

              <div className="flex items-center gap-1.5">
                {(
                  [
                    { name: 'linkedin' as const, href: identity.links.linkedin, label: 'LinkedIn' },
                    { name: 'github' as const, href: identity.links.github, label: 'GitHub' },
                    { name: 'mail' as const, href: `mailto:${identity.email}`, label: 'Email' },
                  ]
                ).map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    aria-label={link.label}
                    title={link.label}
                    {...(link.name !== 'mail'
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="grid size-11 place-items-center rounded-full border border-line text-ink-2 transition-all hover:border-accent-line hover:text-ink"
                  >
                    <Icon name={link.name} size={17} />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Portrait — secondary on mobile, deliberately not the first thing read. */}
          <motion.div
            {...rise(0.16)}
            className="order-first justify-self-start lg:order-none lg:justify-self-end"
          >
            <div className="relative">
              <Avatar className="size-24 shadow-[var(--shadow-lift)] sm:size-28 lg:size-[232px]" />
              {/* Soft accent glow behind the portrait. */}
              <div
                aria-hidden="true"
                className="absolute -inset-6 -z-10 rounded-[2rem] bg-[radial-gradient(circle_at_50%_30%,var(--accent-wash),transparent_70%)] blur-xl"
              />
            </div>
          </motion.div>
        </div>

        {/* The signature move: the actual architecture I ship, as a live diagram. */}
        {featured && featured.pipeline.length > 0 && (
          <motion.div {...rise(0.34)} className="mt-14">
            <p className="kicker mb-3">A pipeline I shipped — {featured.title}</p>
            <PipelineStrip stages={featured.pipeline} />
          </motion.div>
        )}

        {/* 4. Proof. Placed high on purpose. */}
        <div id="proof" className="mt-14 scroll-mt-24 sm:mt-20">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {metrics.map((m, i) => (
              <StatTile key={m.label} metric={m} index={i} />
            ))}
          </div>
          <p className="mt-4 text-xs text-ink-3">
            Every figure above comes from a specific role or project and is described in context below.
          </p>
        </div>
      </Container>
    </section>
  );
}
