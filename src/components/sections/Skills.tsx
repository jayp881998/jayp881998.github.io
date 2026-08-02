import { LEVEL_LABEL, skillGroups } from '@/content/profile';
import { LevelMeter } from '@/components/ui/LevelMeter';
import { Reveal, RevealChild, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

export function Skills() {
  return (
    <Section
      id="skills"
      kicker="Capabilities"
      title="What I can be handed on day one."
      lede="Rated on four named steps rather than invented percentages — and where a tool has a story behind it, the evidence is on the line."
    >
      {/* Legend — the scale has to be legible before the meters mean anything,
          and it keeps the level from ever depending on colour alone. */}
      <Reveal className="mb-8">
        <dl className="flex flex-wrap items-center gap-x-6 gap-y-3 rounded-xl border border-line bg-surface-2/40 px-5 py-4">
          {([4, 3, 2, 1] as const).map((level) => (
            <div key={level} className="flex items-center gap-2.5">
              <span aria-hidden="true" className="flex gap-[3px]">
                {[1, 2, 3, 4].map((step) => (
                  <span
                    key={step}
                    className={`block h-[3px] w-3.5 rounded-full ${
                      step <= level ? 'bg-accent' : 'bg-accent/18'
                    }`}
                  />
                ))}
              </span>
              <dt className="font-mono text-[0.625rem] uppercase tracking-wider text-ink-2">
                {LEVEL_LABEL[level]}
              </dt>
              <dd className="text-[0.6875rem] text-ink-3">
                {level === 4 && 'daily, in production'}
                {level === 3 && 'shipped independently'}
                {level === 2 && 'used on real projects'}
                {level === 1 && 'foundation, not depth'}
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <RevealGroup className="grid gap-3 md:grid-cols-2 lg:grid-cols-3" stagger={0.05}>
        {skillGroups.map((group) => (
          <RevealChild key={group.id}>
            <div className="card h-full p-5 transition-colors duration-300 hover:border-accent-line">
              <h3 className="text-sm font-medium text-ink">{group.title}</h3>
              <p className="mt-1 text-xs text-ink-3">{group.blurb}</p>

              <ul className="mt-5 space-y-3.5">
                {group.skills.map((skill) => {
                  const id = `${group.id}-${skill.name.replace(/\W+/g, '-').toLowerCase()}`;
                  return (
                    <li key={skill.name}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[0.8125rem] text-ink-2">{skill.name}</span>
                        <LevelMeter level={skill.level} id={id} />
                      </div>
                      {skill.note && (
                        <p className="mt-1 text-[0.6875rem] leading-snug text-ink-3">{skill.note}</p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </RevealChild>
        ))}
      </RevealGroup>
    </Section>
  );
}
