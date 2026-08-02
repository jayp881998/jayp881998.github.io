'use client';

import Link from 'next/link';
import { useState } from 'react';
import { featuredProjects, otherProjects, type Project } from '@/content/profile';
import { useSpotlight } from '@/lib/hooks';
import { asset } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { Modal } from '@/components/ui/Modal';
import { PillRow } from '@/components/ui/Pill';
import { PipelineDiagram } from '@/components/ui/PipelineDiagram';
import { Reveal } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

export function Work() {
  return (
    <Section
      id="work"
      kicker="Selected work"
      title="Pipelines, not screenshots."
      lede="Each of these is an end-to-end build — extraction, modelling, semantic layer, and the automation that keeps it running. The architecture is documented, not implied."
    >
      <div className="space-y-4">
        {featuredProjects.map((project) => (
          <FeaturedCard key={project.slug} project={project} />
        ))}
      </div>

      {otherProjects.length > 0 && (
        <div className="mt-14">
          <p className="kicker mb-4">Also published</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {otherProjects.map((project) => (
              <CompactCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const [archOpen, setArchOpen] = useState(false);
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <Reveal>
      <article
        ref={ref}
        onPointerMove={onPointerMove}
        className="card spotlight group relative overflow-hidden transition-colors duration-300 hover:border-accent-line"
      >
        <div className="grid gap-0 lg:grid-cols-[1.15fr_1fr]">
          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="kicker">{project.kicker}</span>
              <span aria-hidden="true" className="text-ink-3">
                ·
              </span>
              <span className="font-mono text-[0.6875rem] tracking-wider text-ink-3">
                {project.period}
              </span>
            </div>

            <h3 className="mt-3 text-xl font-semibold text-ink sm:text-2xl">
              <Link href={`/work/${project.slug}`} className="hover:text-accent">
                <span className="absolute inset-0 z-10 lg:hidden" aria-hidden="true" />
                {project.title}
              </Link>
            </h3>

            <p className="mt-2.5 text-[0.9375rem] leading-relaxed text-ink-2">{project.tagline}</p>

            {/* Problem — what a hiring manager actually wants to read. */}
            <div className="mt-5 border-l-2 border-accent-line pl-4">
              <p className="kicker mb-1.5">The problem</p>
              <p className="text-sm leading-relaxed text-ink-2">{project.problem}</p>
            </div>

            {/* Impact metrics — inline, compact. */}
            {project.metrics.length > 0 && (
              <dl className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <dt className="sr-only">{m.label}</dt>
                    <dd>
                      <span className="figure block text-lg font-semibold text-ink">{m.value}</span>
                      <span className="mt-0.5 block text-[0.6875rem] leading-tight text-ink-3">
                        {m.label}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            )}

            <div className="mt-6">
              <PillRow items={project.stack} />
            </div>

            {/* Actions */}
            <div className="relative z-20 mt-7 flex flex-wrap items-center gap-2">
              <Link
                href={`/work/${project.slug}`}
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[0.8125rem] font-medium text-bg transition-transform hover:scale-[1.03] active:scale-95"
              >
                Read case study
                <Icon name="arrowRight" size={15} />
              </Link>

              {project.pipeline.length > 0 && (
                <button
                  type="button"
                  onClick={() => setArchOpen(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.8125rem] text-ink-2 transition-colors hover:border-accent-line hover:text-ink"
                >
                  <Icon name="model" size={15} />
                  Architecture
                </button>
              )}

              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.8125rem] text-ink-2 transition-colors hover:border-accent-line hover:text-ink"
                >
                  <Icon name="github" size={15} />
                  Code
                </a>
              )}

              {project.links.demo && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.8125rem] text-ink-2 transition-colors hover:border-accent-line hover:text-ink"
                >
                  <Icon name="external" size={15} />
                  Live demo
                </a>
              )}
            </div>
          </div>

          {/* Visual side — a real screenshot when one exists, otherwise the
              architecture rendered as structure. Never a stock image. */}
          <div className="relative border-t border-line bg-surface/40 p-6 sm:p-8 lg:border-l lg:border-t-0">
            {project.gallery.length > 0 ? (
              // eslint-disable-next-line @next/next/no-img-element -- static export, unoptimised by design
              <img
                src={asset(project.gallery[0]!.src)}
                alt={project.gallery[0]!.caption}
                loading="lazy"
                decoding="async"
                className="w-full rounded-lg border border-line"
              />
            ) : project.pipeline.length > 0 ? (
              <>
                <p className="kicker mb-4">Architecture</p>
                <ol className="space-y-2">
                  {project.pipeline.map((stage, i) => (
                    <li key={stage.label} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-px grid size-7 shrink-0 place-items-center rounded-md border border-line bg-surface-2 text-ink-3 transition-colors group-hover:border-accent-line group-hover:text-accent"
                      >
                        <Icon name={stage.kind} size={14} />
                      </span>
                      <div className="min-w-0 pb-1">
                        <p className="text-[0.8125rem] font-medium leading-tight text-ink">
                          {stage.label}
                        </p>
                        <p className="mt-0.5 text-[0.6875rem] leading-snug text-ink-3">
                          {stage.detail}
                        </p>
                      </div>
                      {i < project.pipeline.length - 1 && (
                        <span
                          aria-hidden="true"
                          className="absolute left-[calc(1.5rem+13px)] mt-8 h-3 w-px bg-line sm:left-[calc(2rem+13px)]"
                        />
                      )}
                    </li>
                  ))}
                </ol>
              </>
            ) : (
              <GalleryPlaceholder slug={project.slug} />
            )}
          </div>
        </div>
      </article>

      <Modal open={archOpen} onClose={() => setArchOpen(false)} title={`${project.title} — architecture`}>
        <p className="mb-6 text-sm leading-relaxed text-ink-2">{project.tagline}</p>
        <PipelineDiagram stages={project.pipeline} />
        <div className="mt-6 border-t border-line pt-5">
          <p className="kicker mb-2">Stack</p>
          <PillRow items={project.stack} />
        </div>
      </Modal>
    </Reveal>
  );
}

function CompactCard({ project }: { project: Project }) {
  const { ref, onPointerMove } = useSpotlight<HTMLDivElement>();

  return (
    <Reveal>
      <article
        ref={ref}
        onPointerMove={onPointerMove}
        className="card spotlight group relative h-full p-5 transition-colors duration-300 hover:border-accent-line"
      >
        <span className="kicker">{project.kicker}</span>
        <h3 className="mt-2 text-base font-medium text-ink">
          <Link href={`/work/${project.slug}`}>
            <span className="absolute inset-0" aria-hidden="true" />
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-3">{project.tagline}</p>

        <div className="mt-4">
          <PillRow items={project.stack.slice(0, 4)} />
        </div>

        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.8125rem] text-ink-2 transition-colors group-hover:text-accent">
          Read case study
          <Icon
            name="arrowRight"
            size={14}
            className="transition-transform group-hover:translate-x-0.5"
          />
        </span>
      </article>
    </Reveal>
  );
}

/** Clearly labelled so an empty gallery reads as "not added yet", not "broken". */
export function GalleryPlaceholder({ slug }: { slug: string }) {
  return (
    <div className="grid h-full min-h-40 place-items-center rounded-lg border border-dashed border-line-strong bg-surface-2/40 p-6 text-center">
      <div>
        <Icon name="serve" size={22} className="mx-auto text-ink-3" />
        <p className="mt-3 text-xs text-ink-3">
          Add sanitised screenshots to
          <br />
          <code className="mt-1 inline-block rounded bg-surface-3 px-1.5 py-0.5 font-mono text-[0.625rem] text-ink-2">
            /public/projects/{slug}/
          </code>
        </p>
      </div>
    </div>
  );
}
