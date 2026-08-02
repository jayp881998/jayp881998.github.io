import Link from 'next/link';
import type { Metadata } from 'next';
import { projects } from '@/content/profile';
import { Icon } from '@/components/ui/Icon';
import { Container } from '@/components/ui/Section';

export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Container className="flex min-h-[78dvh] flex-col justify-center py-24">
      <div className="max-w-xl">
        <p className="kicker">Error 404</p>

        <h1 className="figure mt-4 text-6xl font-semibold text-ink sm:text-7xl">
          <span className="bg-gradient-to-br from-accent-hi via-accent to-violet bg-clip-text text-transparent">
            404
          </span>
        </h1>

        <p className="mt-5 text-xl font-medium text-ink">This row doesn’t exist in the table.</p>

        <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink-2">
          The page you asked for isn’t here — most likely a stale link or a typo in the URL.
          Everything worth reading is one click away.
        </p>

        <div className="mt-8 flex flex-wrap gap-2.5">
          <Link
            href="/"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-medium text-bg transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Icon name="arrowRight" size={16} />
            Back to the portfolio
          </Link>
          <Link
            href="/#contact"
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line-strong px-5 text-sm text-ink-2 transition-colors hover:border-accent-line hover:text-ink"
          >
            Get in touch
          </Link>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="kicker mb-3">Case studies</p>
          <ul className="space-y-1.5">
            {projects.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/work/${p.slug}`}
                  className="group inline-flex items-center gap-2 text-sm text-ink-2 transition-colors hover:text-accent"
                >
                  <Icon
                    name="arrowRight"
                    size={14}
                    className="text-ink-3 transition-transform group-hover:translate-x-0.5"
                  />
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
}
