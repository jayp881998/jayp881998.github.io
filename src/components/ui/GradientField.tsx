/**
 * Ambient background: a grid plane plus three slow-drifting colour washes.
 *
 * Purely decorative, so it is aria-hidden, fixed (never affects layout), and
 * built from CSS gradients rather than images — it costs no network requests
 * and no layout work, and the drift animation is disabled under
 * prefers-reduced-motion by the global rule in globals.css.
 */
export function GradientField() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Engineered grid — the "this person builds systems" cue. */}
      <div className="grid-plane absolute inset-0 opacity-[0.55]" />

      {/* Colour washes. Low opacity; they tint the plane, never compete with text. */}
      <div className="drift absolute -left-[15%] -top-[20%] size-[46rem] rounded-full bg-[radial-gradient(circle,var(--accent)_0%,transparent_62%)] opacity-[0.16] blur-3xl" />
      <div
        className="drift absolute -right-[12%] top-[18%] size-[38rem] rounded-full bg-[radial-gradient(circle,var(--violet)_0%,transparent_62%)] opacity-[0.13] blur-3xl"
        style={{ animationDelay: '-8s' }}
      />
      <div
        className="drift absolute bottom-[-18%] left-[28%] size-[34rem] rounded-full bg-[radial-gradient(circle,var(--aqua)_0%,transparent_62%)] opacity-[0.09] blur-3xl"
        style={{ animationDelay: '-16s' }}
      />

      {/* Vignette to keep the page edges calm. */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,transparent_35%,var(--bg)_88%)]" />
    </div>
  );
}
