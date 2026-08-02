import { aiPractice, differentiators, identity } from '@/content/profile';
import { Icon } from '@/components/ui/Icon';
import { Reveal, RevealChild, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

export function About() {
  return (
    <Section
      id="about"
      kicker="About"
      title="Mechanical engineer first. That is why the data makes sense to me."
    >
      <div className="grid gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <Reveal className="space-y-5">
          {identity.bio.map((para) => (
            <p key={para.slice(0, 32)} className="text-[0.9375rem] leading-relaxed text-ink-2 sm:text-base">
              {para}
            </p>
          ))}

          {/* AI practice — a genuine 2026 differentiator, kept concrete. */}
          <div className="card mt-8 p-5">
            <div className="flex items-center gap-2">
              <Icon name="process" size={16} className="text-accent" />
              <h3 className="text-sm font-medium text-ink">{aiPractice.title}</h3>
            </div>
            <p className="mt-1 text-xs text-ink-3">{aiPractice.blurb}</p>
            <ul className="mt-4 space-y-2.5">
              {aiPractice.points.map((point) => (
                <li key={point.slice(0, 28)} className="flex gap-2.5 text-[0.8125rem] leading-relaxed text-ink-2">
                  <Icon name="check" size={14} className="mt-1 shrink-0 text-aqua" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <RevealGroup className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {differentiators.map((item) => (
            <RevealChild key={item.title}>
              <div className="card h-full p-5 transition-colors duration-300 hover:border-accent-line">
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden="true"
                    className="grid size-9 shrink-0 place-items-center rounded-lg border border-accent-line bg-accent-wash text-accent"
                  >
                    <Icon name={item.kind} size={17} />
                  </span>
                  <div>
                    <h3 className="text-sm font-medium text-ink">{item.title}</h3>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-3">{item.body}</p>
                  </div>
                </div>
              </div>
            </RevealChild>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
