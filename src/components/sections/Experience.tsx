'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { experience, type Role } from '@/content/profile';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { PillRow } from '@/components/ui/Pill';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

export function Experience() {
  return (
    <Section
      id="experience"
      kicker="Experience"
      title="Five years, three countries, one throughline."
      lede="Every role has involved the same thing: taking a messy operational reality and turning it into numbers people are willing to act on."
    >
      <ol className="relative">
        {/* Timeline spine */}
        <span
          aria-hidden="true"
          className="absolute left-[7px] top-2 h-[calc(100%-2rem)] w-px bg-gradient-to-b from-accent-line via-line to-transparent"
        />
        {experience.map((role, i) => (
          <RoleItem key={role.id} role={role} defaultOpen={i === 0} />
        ))}
      </ol>
    </Section>
  );
}

function RoleItem({ role, defaultOpen }: { role: Role; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = `role-panel-${role.id}`;

  return (
    <Reveal as="li" className="relative pb-3 pl-8 last:pb-0">
      {/* Node */}
      <span
        aria-hidden="true"
        className={cn(
          'absolute left-0 top-[1.4rem] grid size-[15px] place-items-center rounded-full border-2 bg-bg transition-colors',
          role.current ? 'border-aqua' : 'border-line-strong',
        )}
      >
        {role.current && <span className="size-1.5 rounded-full bg-aqua" />}
      </span>

      <div className="card overflow-hidden transition-colors duration-300 hover:border-accent-line">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start gap-4 p-5 text-left sm:p-6"
        >
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
              <h3 className="text-base font-medium text-ink">{role.role}</h3>
              {role.current && (
                <span className="rounded-full border border-aqua/40 bg-aqua/10 px-2 py-0.5 font-mono text-[0.5625rem] uppercase tracking-wider text-aqua">
                  Current
                </span>
              )}
            </div>

            <p className="mt-1 text-sm text-ink-2">
              {role.org}
              <span className="text-ink-3"> · {role.location}</span>
            </p>

            <p className="tabular mt-1 font-mono text-[0.6875rem] tracking-wide text-ink-3">
              {role.dates}
            </p>

            <p className="mt-3 text-[0.8125rem] leading-relaxed text-ink-2">{role.summary}</p>
          </div>

          <span
            aria-hidden="true"
            className={cn(
              'mt-1 grid size-7 shrink-0 place-items-center rounded-full border border-line text-ink-3 transition-transform duration-300',
              open && 'rotate-180',
            )}
          >
            <Icon name="chevronDown" size={14} />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id={panelId}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="border-t border-line px-5 pb-5 pt-5 sm:px-6 sm:pb-6">
                <p className="kicker mb-3">What I did</p>
                <ul className="space-y-2.5">
                  {role.highlights.map((point) => (
                    <li
                      key={point.slice(0, 30)}
                      className="flex gap-3 text-[0.8125rem] leading-relaxed text-ink-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[7px] size-1 shrink-0 rounded-full bg-accent"
                      />
                      {point}
                    </li>
                  ))}
                </ul>

                <div className="mt-5">
                  <p className="kicker mb-2">Stack</p>
                  <PillRow items={role.stack} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
