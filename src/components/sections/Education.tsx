import { certifications, education } from '@/content/profile';
import { Icon } from '@/components/ui/Icon';
import { PillRow } from '@/components/ui/Pill';
import { RevealChild, RevealGroup } from '@/components/ui/Reveal';
import { Section } from '@/components/ui/Section';

export function Education() {
  return (
    <Section
      id="education"
      kicker="Education & credentials"
      title="Two Canadian post-grads, both with honours."
    >
      <div className="grid gap-10 lg:grid-cols-[1.25fr_1fr] lg:gap-14">
        {/* Education */}
        <RevealGroup className="space-y-3">
          {education.map((item) => (
            <RevealChild key={item.credential}>
              <div className="card p-5 transition-colors duration-300 hover:border-accent-line sm:p-6">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-base font-medium text-ink">{item.credential}</h3>
                  <span className="tabular font-mono text-[0.6875rem] tracking-wide text-ink-3">
                    {item.dates}
                  </span>
                </div>

                <p className="mt-1 text-sm text-ink-2">
                  {item.school}
                  <span className="text-ink-3"> · {item.location}</span>
                </p>

                {item.result && (
                  <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-full border border-aqua/35 bg-aqua/10 px-2.5 py-1 text-[0.6875rem] font-medium text-aqua">
                    <Icon name="check" size={12} />
                    {item.result}
                  </p>
                )}

                {item.coursework.length > 0 && (
                  <div className="mt-4">
                    <p className="kicker mb-2">Relevant coursework</p>
                    <PillRow items={item.coursework} />
                  </div>
                )}
              </div>
            </RevealChild>
          ))}
        </RevealGroup>

        {/* Certifications */}
        <div>
          <p className="kicker mb-4">Certifications</p>
          <RevealGroup className="space-y-2.5" stagger={0.05}>
            {certifications.map((cert) => {
              const Wrapper = cert.url ? 'a' : 'div';
              return (
                <RevealChild key={cert.title}>
                  <Wrapper
                    {...(cert.url
                      ? { href: cert.url, target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className="card group flex items-start gap-3.5 p-4 transition-colors duration-300 hover:border-accent-line"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-ink-3 transition-colors group-hover:border-accent-line group-hover:text-accent"
                    >
                      <Icon name="check" size={15} />
                    </span>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-[0.8125rem] font-medium leading-snug text-ink">
                          {cert.title}
                        </h3>
                        {cert.url && (
                          <Icon name="external" size={13} className="mt-0.5 shrink-0 text-ink-3" />
                        )}
                      </div>
                      <p className="mt-0.5 text-[0.6875rem] text-ink-3">
                        {cert.issuer} · {cert.date}
                      </p>
                      {cert.detail && (
                        <p className="mt-1.5 text-[0.6875rem] leading-relaxed text-ink-3">
                          {cert.detail}
                        </p>
                      )}
                    </div>
                  </Wrapper>
                </RevealChild>
              );
            })}
          </RevealGroup>
        </div>
      </div>
    </Section>
  );
}
