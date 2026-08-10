import { coreStack } from '@/content/profile';
import { Container } from '@/components/ui/Section';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Compact core-stack strip — sits directly under the proof band so the
 * headline technologies land in the first scroll, ahead of the case studies.
 * Not a navigable section (no id, no nav entry): it's a scan accelerant, not a
 * destination. The full, step-rated inventory lives in the deep Skills grid.
 *
 * Deliberately static, not an auto-scrolling marquee — motion is spent on the
 * few elements that earn it, and an always-looping band is not one of them.
 */
export function SkillsStrip() {
  return (
    <section aria-label="Core stack" className="py-8 sm:py-10">
      <Container>
        <Reveal>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p className="kicker shrink-0 sm:w-28">Core stack</p>

            {/* Scrolls horizontally on narrow viewports rather than wrapping to
                three ragged rows; the fade-mask signals there's more. */}
            <div className="marquee-mask -mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <ul className="flex w-max items-center gap-2 sm:w-auto sm:flex-wrap">
                {coreStack.map((tech) => (
                  <li key={tech}>
                    <span className="inline-flex items-center rounded-md border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs tracking-tight text-ink-2">
                      {tech}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
