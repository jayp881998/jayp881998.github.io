import Link from 'next/link';
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 ' +
  'active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink text-bg hover:bg-ink/88 shadow-[0_1px_2px_rgb(0_0_0/0.2)] hover:shadow-[0_8px_24px_-8px_var(--accent-line)]',
  secondary:
    'border border-line-strong bg-surface-2/60 text-ink backdrop-blur-sm hover:border-accent-line hover:bg-surface-3',
  ghost: 'text-ink-2 hover:text-ink hover:bg-surface-2',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-[0.8125rem]',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[0.9375rem]',
};

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function Button({
  href,
  external,
  download,
  onClick,
  type = 'button',
  ariaLabel,
  children,
  variant = 'secondary',
  size = 'md',
  className,
}: CommonProps & {
  href?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit';
  ariaLabel?: string;
}) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (href) {
    // Downloads and off-site links stay plain anchors — <Link> prefetching a
    // PDF or an external origin is pointless work.
    if (external || download) {
      return (
        <a
          href={href}
          aria-label={ariaLabel}
          className={classes}
          {...(download ? { download: '' } : { target: '_blank', rel: 'noopener noreferrer' })}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} aria-label={ariaLabel} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} aria-label={ariaLabel} className={classes}>
      {children}
    </button>
  );
}
