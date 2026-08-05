/**
 * Ambient background: two slow-drifting accent washes, one hue only.
 *
 * Previously included a full-viewport ruled-grid overlay ("engineered
 * grid") and three differently-hued washes (accent/violet/aqua) — flagged
 * during /design-tokens as a generated-UI tell (an ambient decorative grid
 * unconnected to any actual content) and as a violation of "one confident
 * hue, quiet everywhere else" (violet is retired as a brand color, aqua is
 * status-only). Removed rather than reworked; a future section-divider
 * data-viz motif (tied to real content, per the design brief) is a
 * /frontend-design task, not an ambient full-page wash — see
 * .design/portfolio-v2/FUTURE_CONSIDERATIONS.md.
 *
 * Purely decorative, so it is aria-hidden, fixed (never affects layout), and
 * built from CSS gradients rather than images — it costs no network requests
 * and no layout work, and the drift animation is disabled under
 * prefers-reduced-motion by the global rule in globals.css.
 */
export function GradientField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Two accent-only washes, layered for depth without introducing a second hue. */}
      <div className="drift absolute -left-[15%] -top-[20%] size-[46rem] rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_62%)] opacity-[0.16] blur-3xl" />
      <div
        className="drift absolute -right-[12%] top-[18%] size-[36rem] rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_62%)] opacity-[0.08] blur-3xl"
        style={{ animationDelay: '-12s' }}
      />

      {/* Vignette to keep the page edges calm. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_35%,var(--bg)_88%)]" />
    </div>
  );
}
