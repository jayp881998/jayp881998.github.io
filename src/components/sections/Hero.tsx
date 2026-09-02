'use client';

import { motion } from 'framer-motion';
import { experience, identity, metrics, projects, quickFacts } from '@/content/profile';
import { useReducedMotionSafe } from '@/lib/hooks';
import { asset } from '@/lib/utils';
import { Avatar } from '@/components/ui/Avatar';
import { Icon } from '@/components/ui/Icon';
import { PipelineStrip } from '@/components/ui/PipelineDiagram';
import { Container } from '@/components/ui/Section';
import { Sparkline } from '@/components/ui/Sparkline';
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
  const current = experience.find((r) => r.current) ?? experience[0];

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

              <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-ink-kicker">
                {identity.name} · {identity.location}
              </p>
            </motion.div>

            {/* 2. The claim. Rendered visible on first paint — this is the LCP
                element, so it must never depend on a JS-driven fade-in. */}
            <h1 className="mt-6 text-[2rem] font-semibold leading-[1.1] text-ink sm:text-[2.75rem] lg:text-[3.25rem] lg:leading-[1.06]">
              I build the <span className="text-accent">SQL-to-Power BI reporting</span> that
              operations teams run on.
            </h1>

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
                className="accent-glow inline-flex h-12 items-center gap-2 rounded-full bg-ink px-6 text-[0.9375rem] font-medium text-bg transition-transform hover:scale-[1.03] active:scale-95"
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

          {/* Mobile: just the headshot, small, above the text — visible on first
              paint, not animated, since it's part of the LCP region. The full
              bento cluster below would push the H1 off-screen on a phone. */}
          <div className="order-first justify-self-start lg:hidden">
            <Avatar className="size-24 shadow-[var(--shadow-lift)] sm:size-28" />
          </div>

          {/* Desktop: a bento cluster — "this person makes dashboards" at a
              glance. Headshot + status + current role + a live-feeling KPI tile.
              lg-only; the mobile headshot above stands in on smaller screens. */}
          <div className="hidden w-[336px] lg:block lg:justify-self-end">
            <div className="grid grid-cols-2 gap-3">
              {/* Headshot tile — full width of the cluster. Definite height (not
                  an aspect ratio) so object-cover has something to resolve
                  against; the cluster is a fixed 336px wide, so a fixed height
                  is stable and balances the text column's height. */}
              <Avatar className="col-span-2 h-56 w-full shadow-[var(--shadow-lift)]" />

              {/* Open to work. */}
              <div className="card flex flex-col justify-between gap-4 p-4">
                <span className="relative grid size-2.5 place-items-center">
                  <span className="absolute size-2.5 rounded-full bg-aqua ping-soft" />
                  <span className="size-2.5 rounded-full bg-aqua" />
                </span>
                <div>
                  <p className="text-sm font-medium text-ink">Open to work</p>
                  <p className="mt-0.5 text-xs text-ink-3">GTA or remote, Canada</p>
                </div>
              </div>

              {/* Currently. */}
              <div className="card flex flex-col justify-between gap-4 p-4">
                <Icon name="pin" size={16} className="text-accent" />
                <div>
                  <p className="kicker">Currently</p>
                  <p className="mt-1 text-sm font-medium leading-tight text-ink">{current.org}</p>
                  <p className="mt-0.5 text-xs leading-tight text-ink-3">{current.role}</p>
                </div>
              </div>

              {/* Live-feeling KPI — a real figure (45-min automated refresh) with
                  a decorative activity sparkline. No fabricated axis or values. */}
              <div className="card col-span-2 p-4">
                <div className="flex items-center justify-between">
                  <p className="kicker">Automated refresh</p>
                  <Icon name="schedule" size={15} className="text-ink-3" />
                </div>
                <p className="figure mt-1 text-2xl font-semibold text-ink">
                  45<span className="ml-1 text-base font-medium text-ink-2">min</span>
                </p>
                <Sparkline data={[5, 7, 6, 9, 8, 11, 9, 13, 11, 15]} className="mt-2 h-8 w-full" />
                <p className="mt-1.5 text-[0.6875rem] text-ink-3">
                  Unattended, on SQL Server Agent
                </p>
              </div>
            </div>
          </div>
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
          <p className="mt-4 max-w-[68ch] text-xs text-ink-3">
            Every figure above comes from a specific role or project and is described in context below.
          </p>
        </div>
      </Container>
    </section>
  );
}
