'use client';

import { useTheme } from '@/components/providers/ThemeProvider';
import { Icon } from '@/components/ui/Icon';

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={
        'grid size-9 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink ' +
        (className ?? '')
      }
    >
      {/* Both icons render; visibility is driven by the theme class so the
          correct one is already correct on first paint (no hydration flicker). */}
      <Icon name="sun" size={16} className="hidden dark:block" />
      <Icon name="moon" size={16} className="block dark:hidden" />
    </button>
  );
}
