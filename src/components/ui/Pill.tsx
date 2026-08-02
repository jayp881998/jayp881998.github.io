import { cn } from '@/lib/utils';

/** Technology / keyword tag. Quiet by default — these are supporting detail. */
export function Pill({
  children,
  tone = 'neutral',
  className,
}: {
  children: React.ReactNode;
  tone?: 'neutral' | 'accent';
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-1 font-mono text-[0.6875rem] leading-none tracking-tight',
        tone === 'accent'
          ? 'border-accent-line bg-accent-wash text-ink'
          : 'border-line bg-surface-2 text-ink-2',
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PillRow({ items, tone }: { items: readonly string[]; tone?: 'neutral' | 'accent' }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li key={item}>
          <Pill tone={tone}>{item}</Pill>
        </li>
      ))}
    </ul>
  );
}
