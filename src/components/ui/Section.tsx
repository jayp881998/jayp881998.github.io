import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Reveal } from './Reveal';

/** Consistent page gutter. Every section uses this, nothing sets its own width. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</div>;
}

export function Section({
  id,
  kicker,
  title,
  lede,
  children,
  className,
  bleed = false,
}: {
  id: string;
  kicker?: string;
  title?: string;
  lede?: string;
  children: ReactNode;
  className?: string;
  /** Skip the Container so the child can run full-bleed. */
  bleed?: boolean;
}) {
  const header = (title || kicker) && (
    <Reveal className="mb-12 max-w-2xl sm:mb-16">
      {kicker && <p className="kicker mb-3">{kicker}</p>}
      {title && (
        <h2 className="text-3xl font-semibold text-ink sm:text-4xl md:text-[2.75rem] md:leading-[1.08]">
          {title}
        </h2>
      )}
      {lede && <p className="mt-4 text-base leading-relaxed text-ink-2 sm:text-lg">{lede}</p>}
    </Reveal>
  );

  return (
    <section id={id} className={cn('scroll-mt-24 py-20 sm:py-28', className)} aria-labelledby={`${id}-heading`}>
      {bleed ? (
        <>
          {header && <Container>{header}</Container>}
          {children}
        </>
      ) : (
        <Container>
          {header}
          {children}
        </Container>
      )}
      {/* Accessible name for the landmark, visually carried by the <h2> above. */}
      <span id={`${id}-heading`} className="sr-only">
        {title ?? id}
      </span>
    </section>
  );
}

/** Hairline divider used between major sections. */
export function Rule({ className }: { className?: string }) {
  return (
    <div className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-line-strong to-transparent" />
    </div>
  );
}
