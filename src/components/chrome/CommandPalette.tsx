'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { identity, navSections, projects } from '@/content/profile';
import { useTheme } from '@/components/providers/ThemeProvider';
import { useScrollLock } from '@/lib/hooks';
import { asset, cn } from '@/lib/utils';
import { Icon, type IconName } from '@/components/ui/Icon';

type Action = {
  id: string;
  label: string;
  group: 'Navigate' | 'Case studies' | 'Connect' | 'Settings';
  icon: IconName;
  hint?: string;
  run: () => void;
};

/**
 * ⌘K command palette.
 *
 * On a portfolio this is not a gimmick: it is the fastest possible path from
 * "recruiter landed on the page" to "recruiter has the resume PDF". Every
 * high-intent action — resume, email, LinkedIn, GitHub — is one keystroke away.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const [copied, setCopied] = useState(false);

  const router = useRouter();
  const { toggle } = useTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useScrollLock(open);

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setCursor(0);
  }, []);

  const goToSection = useCallback(
    (id: string) => {
      close();
      // Let the dialog unmount before scrolling, or the scroll lock fights it.
      requestAnimationFrame(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    },
    [close],
  );

  const actions = useMemo<Action[]>(() => {
    const nav: Action[] = navSections.map((s) => ({
      id: `nav-${s.id}`,
      label: s.label,
      group: 'Navigate',
      icon: 'arrowRight',
      run: () => goToSection(s.id),
    }));

    const cases: Action[] = projects.map((p) => ({
      id: `case-${p.slug}`,
      label: p.title,
      group: 'Case studies',
      icon: 'model',
      hint: p.kicker,
      run: () => {
        close();
        router.push(`/work/${p.slug}`);
      },
    }));

    const connect: Action[] = [
      {
        id: 'resume',
        label: 'Download resume (PDF)',
        group: 'Connect',
        icon: 'download',
        run: () => {
          close();
          window.location.href = asset(identity.resume);
        },
      },
      {
        id: 'email',
        label: 'Copy email address',
        group: 'Connect',
        icon: 'copy',
        hint: identity.email,
        run: () => {
          navigator.clipboard?.writeText(identity.email).then(
            () => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            },
            () => {
              // Clipboard blocked (insecure context / permissions) — fall back
              // to opening the mail client rather than failing silently.
              window.location.href = `mailto:${identity.email}`;
            },
          );
        },
      },
      {
        id: 'mailto',
        label: 'Send an email',
        group: 'Connect',
        icon: 'mail',
        run: () => {
          close();
          window.location.href = `mailto:${identity.email}`;
        },
      },
      {
        id: 'linkedin',
        label: 'Open LinkedIn',
        group: 'Connect',
        icon: 'linkedin',
        run: () => {
          close();
          window.open(identity.links.linkedin, '_blank', 'noopener,noreferrer');
        },
      },
      {
        id: 'github',
        label: 'Open GitHub',
        group: 'Connect',
        icon: 'github',
        run: () => {
          close();
          window.open(identity.links.github, '_blank', 'noopener,noreferrer');
        },
      },
    ];

    const settings: Action[] = [
      { id: 'theme', label: 'Toggle theme', group: 'Settings', icon: 'sun', run: toggle },
    ];

    return [...nav, ...cases, ...connect, ...settings];
  }, [close, goToSection, router, toggle]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (a) =>
        a.label.toLowerCase().includes(q) ||
        a.group.toLowerCase().includes(q) ||
        a.hint?.toLowerCase().includes(q),
    );
  }, [actions, query]);

  // Global shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // "/" opens too, but not while typing in a field.
      const tag = (e.target as HTMLElement)?.tagName;
      if (e.key === '/' && tag !== 'INPUT' && tag !== 'TEXTAREA') {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => setCursor(0), [query]);

  // Keep the highlighted row scrolled into view during arrow navigation.
  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${cursor}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [cursor]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c + 1) % results.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (results.length ? (c - 1 + results.length) % results.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      results[cursor]?.run();
    }
  };

  let lastGroup = '';

  return (
    <>
      {/* Trigger lives in the header on desktop. */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="hidden h-9 items-center gap-2 rounded-full border border-line bg-surface-2/60 pl-3 pr-2 text-xs text-ink-3 transition-colors hover:border-line-strong hover:text-ink-2 lg:inline-flex"
      >
        <Icon name="search" size={13} />
        <span>Search</span>
        <kbd className="ml-1 rounded border border-line bg-surface-3 px-1.5 py-0.5 font-mono text-[0.625rem] text-ink-3">
          ⌘K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[150] flex items-start justify-center p-4 pt-[12vh]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <button
              type="button"
              aria-label="Close command palette"
              onClick={close}
              className="absolute inset-0 cursor-default bg-black/60 backdrop-blur-sm"
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.985 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              onKeyDown={onKeyDown}
              className="glass relative w-full max-w-xl overflow-hidden rounded-2xl shadow-[var(--shadow-lift)]"
            >
              <div className="flex items-center gap-3 border-b border-line px-4">
                <Icon name="search" size={16} className="text-ink-3" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Jump to a section, case study, or contact…"
                  aria-label="Search commands"
                  className="h-13 w-full bg-transparent py-4 text-sm text-ink outline-none placeholder:text-ink-3"
                />
                <kbd className="hidden rounded border border-line bg-surface-3 px-1.5 py-0.5 font-mono text-[0.625rem] text-ink-3 sm:block">
                  esc
                </kbd>
              </div>

              <div ref={listRef} className="max-h-[52vh] overflow-y-auto p-2" role="listbox">
                {results.length === 0 && (
                  <p className="px-3 py-8 text-center text-sm text-ink-3">
                    Nothing matches “{query}”.
                  </p>
                )}

                {results.map((action, i) => {
                  const showGroup = action.group !== lastGroup;
                  lastGroup = action.group;

                  return (
                    <div key={action.id}>
                      {showGroup && (
                        <p className="kicker px-3 pb-1.5 pt-3 first:pt-1">{action.group}</p>
                      )}
                      <button
                        type="button"
                        data-index={i}
                        role="option"
                        aria-selected={i === cursor}
                        onMouseEnter={() => setCursor(i)}
                        onClick={action.run}
                        className={cn(
                          'flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors',
                          i === cursor ? 'bg-accent-wash text-ink' : 'text-ink-2',
                        )}
                      >
                        <Icon
                          name={action.id === 'email' && copied ? 'check' : action.icon}
                          size={15}
                          className={i === cursor ? 'text-accent' : 'text-ink-3'}
                        />
                        <span className="flex-1 truncate">
                          {action.id === 'email' && copied ? 'Copied to clipboard' : action.label}
                        </span>
                        {action.hint && (
                          <span className="hidden truncate font-mono text-[0.6875rem] text-ink-3 sm:block">
                            {action.hint}
                          </span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-[0.6875rem] text-ink-3">
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-line bg-surface-3 px-1 font-mono">↑↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1.5">
                  <kbd className="rounded border border-line bg-surface-3 px-1 font-mono">↵</kbd>
                  select
                </span>
                <span className="ml-auto hidden items-center gap-1.5 sm:flex">
                  <kbd className="rounded border border-line bg-surface-3 px-1 font-mono">/</kbd>
                  opens this
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
