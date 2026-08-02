import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { identity, projects } from '@/content/profile';
import { asset } from '@/lib/utils';
import { GalleryPlaceholder } from '@/components/sections/Work';
import { Icon } from '@/components/ui/Icon';
import { PillRow } from '@/components/ui/Pill';
import { PipelineDiagram } from '@/components/ui/PipelineDiagram';
import { Reveal } from '@/components/ui/Reveal';
import { Container } from '@/components/ui/Section';
import { StatGrid } from '@/components/ui/StatTile';

type Params = { slug: string };

/** Pre-renders one static HTML file per project at build time. */
export function generateStaticParams(): Params[] {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: 'Case study not found' };

  return {
    title: project.title,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title} — ${identity.name}`,
      description: project.tagline,
      url: `${identity.siteUrl}/work/${project.slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — ${identity.name}`,
      description: project.tagline,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === slug);
  const next = projects[(index + 1) % projects.length]!;

  return (
    <article className="pt-28 sm:pt-36">
      <Container>
        {/* Back */}
        <Link
          href="/#work"
          className="group inline-flex items-center gap-2 text-[0.8125rem] text-ink-3 transition-colors hover:text-ink"
        >
          <Icon
            name="arrowRight"
            size={14}
            className="rotate-180 transition-transform group-hover:-translate-x-0.5"
          />
          All work
        </Link>

        {/* Header */}
        <Reveal className="mt-8 max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="kicker">{project.kicker}</span>
            <span aria-hidden="true" className="text-ink-3">
              ·
            </span>
            <span className="font-mono text-[0.6875rem] tracking-wider text-ink-3">
              {project.period}
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-[2.75rem] sm:leading-[1.08]">
            {project.title}
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-ink-2">{project.tagline}</p>

          <div className="mt-7 flex flex-wrap items-center gap-2">
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-4 text-[0.8125rem] font-medium text-bg transition-transform hover:scale-[1.03] active:scale-95"
              >
                <Icon name="github" size={15} />
                View code
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
            <a
              href={asset(identity.resume)}
              download=""
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line-strong px-4 text-[0.8125rem] text-ink-2 transition-colors hover:border-accent-line hover:text-ink"
            >
              <Icon name="download" size={15} />
              Resume
            </a>
          </div>
        </Reveal>

        {/* Outcome first — a hiring manager should not have to scroll for it. */}
        {project.metrics.length > 0 && (
          <section className="mt-14" aria-label="Outcome">
            <p className="kicker mb-4">Outcome</p>
            <StatGrid metrics={project.metrics} />
          </section>
        )}

        <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
          <div className="space-y-12">
            <Reveal>
              <h2 className="text-xl font-semibold text-ink">The problem</h2>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">{project.problem}</p>
            </Reveal>

            <Reveal>
              <h2 className="text-xl font-semibold text-ink">What I built</h2>
              <ol className="mt-4 space-y-4">
                {project.approach.map((step, i) => (
                  <li key={step.slice(0, 30)} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="tabular mt-0.5 grid size-6 shrink-0 place-items-center rounded-md border border-line bg-surface-2 font-mono text-[0.625rem] text-ink-3"
                    >
                      {i + 1}
                    </span>
                    <p className="text-[0.9375rem] leading-relaxed text-ink-2">{step}</p>
                  </li>
                ))}
              </ol>
            </Reveal>

            <Reveal>
              <h2 className="text-xl font-semibold text-ink">Impact</h2>
              <ul className="mt-4 space-y-3">
                {project.impact.map((point) => (
                  <li
                    key={point.slice(0, 30)}
                    className="flex gap-3 text-[0.9375rem] leading-relaxed text-ink-2"
                  >
                    <Icon name="check" size={16} className="mt-1 shrink-0 text-aqua" />
                    {point}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            <Reveal>
              <div className="card p-5">
                <p className="kicker mb-3">Stack</p>
                <PillRow items={project.stack} tone="accent" />
              </div>
            </Reveal>

            {project.gallery.length > 0 ? (
              <Reveal>
                <p className="kicker mb-3">Screens</p>
                <div className="space-y-3">
                  {project.gallery.map((shot) => (
                    <figure key={shot.src}>
                      {/* eslint-disable-next-line @next/next/no-img-element -- static export, unoptimised by design */}
                      <img
                        src={asset(shot.src)}
                        alt={shot.caption}
                        loading="lazy"
                        decoding="async"
                        className="w-full rounded-lg border border-line"
                      />
                      <figcaption className="mt-2 text-xs text-ink-3">{shot.caption}</figcaption>
                    </figure>
                  ))}
                </div>
              </Reveal>
            ) : (
              <Reveal>
                <p className="kicker mb-3">Screens</p>
                <GalleryPlaceholder slug={project.slug} />
              </Reveal>
            )}
          </aside>
        </div>

        {/* Architecture, full width */}
        {project.pipeline.length > 0 && (
          <section className="mt-20" aria-label="Architecture">
            <Reveal>
              <h2 className="text-xl font-semibold text-ink">Architecture</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-2">
                Each stage below is a real component of the build, in execution order.
              </p>
            </Reveal>
            <div className="mt-6">
              <PipelineDiagram stages={project.pipeline} />
            </div>
          </section>
        )}

        {/* Next */}
        <nav aria-label="Next case study" className="mt-24 border-t border-line pt-8">
          <p className="kicker mb-2">Next</p>
          <Link
            href={`/work/${next.slug}`}
            className="group flex items-center justify-between gap-4"
          >
            <span>
              <span className="block text-lg font-medium text-ink transition-colors group-hover:text-accent">
                {next.title}
              </span>
              <span className="mt-1 block text-sm text-ink-3">{next.tagline}</span>
            </span>
            <Icon
              name="arrowRight"
              size={20}
              className="shrink-0 text-ink-3 transition-transform group-hover:translate-x-1"
            />
          </Link>
        </nav>
      </Container>
    </article>
  );
}
