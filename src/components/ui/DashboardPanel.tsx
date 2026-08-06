import type { Project } from '@/content/profile';
import { asset } from '@/lib/utils';
import { Icon } from './Icon';

/**
 * Featured-dashboard slot for a case study.
 *
 * Framed like an embedded report viewport so the swap is seamless: today it
 * holds a sanitized screenshot; the day a Power BI Publish-to-web URL is added
 * to the project's `dashboard.embedUrl`, the same frame renders a live,
 * interactive iframe instead — no layout or code change. The 16:10 box matches
 * the screenshot's shape so neither state shifts the page.
 */
export function DashboardPanel({
  dashboard,
  title,
}: {
  dashboard: NonNullable<Project['dashboard']>;
  title: string;
}) {
  return (
    <figure className="card overflow-hidden">
      {/* Viewport chrome — signals "this is the live reporting layer", and
          reads identically whether a screenshot or an iframe sits below. */}
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-2.5">
        <div className="flex min-w-0 items-center gap-2">
          <Icon name="model" size={14} className="shrink-0 text-accent" />
          <span className="truncate text-xs font-medium text-ink-2">
            Power BI · Executive overview
          </span>
        </div>
        <span className="shrink-0 rounded-full border border-line bg-surface-2 px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-wider text-ink-kicker">
          Synthetic data
        </span>
      </div>

      {/* Both states share the exact same 16:10 box, so swapping the screenshot
          for a live iframe never shifts the page. */}
      <div className="relative aspect-[16/10] w-full bg-surface-2">
        {dashboard.embedUrl ? (
          <iframe
            src={dashboard.embedUrl}
            title={`${title} — interactive Power BI dashboard (synthetic data)`}
            loading="lazy"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element -- static export, unoptimised by design
          <img
            src={asset(dashboard.src)}
            alt={`${title} — executive overview dashboard, built on synthetic sample data`}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 size-full object-cover object-top"
          />
        )}
      </div>

      <figcaption className="border-t border-line px-4 py-2.5 text-xs text-ink-3">
        {dashboard.caption}
      </figcaption>
    </figure>
  );
}
