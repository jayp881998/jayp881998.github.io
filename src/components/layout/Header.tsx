'use client';

import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { identity, navSections } from '@/content/profile';
import { useActiveSection, useScrollLock, useScrolledPast } from '@/lib/hooks';
import { asset, cn } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';
import { CommandPalette } from '@/components/chrome/CommandPalette';
import { ThemeToggle } from '@/components/chrome/ThemeToggle';

const SECTION_IDS = navSections.map((s) => s.id);

export function Header() {
  const scrolled = useScrolledPast(16);
  const active = useActiveSection(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollLock(menuOpen);

  return (
    <header
      className={cn(
        'no-print fixed inset-x-0 top-0 z-[100] transition-all duration-300',
        scrolled ? 'border-b border-line bg-bg/72 backdrop-blur-xl' : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-3 px-5 sm:px-8">
        {/* Wordmark */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label={`${identity.name} — home`}
        >
          <span className="grid size-7 place-items-center rounded-md border border-accent-line bg-accent-wash font-mono text-[0.6875rem] font-semibold text-accent">
            JP
          </span>
          <span className="hidden text-sm font-medium text-ink sm:block">{identity.name}</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Sections" className="ml-4 hidden items-center gap-0.5 md:flex">
          {navSections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-current={active === section.id ? 'true' : undefined}
              className={cn(
                'relative rounded-full px-3 py-1.5 text-[0.8125rem] transition-colors',
                active === section.id ? 'text-ink' : 'text-ink-3 hover:text-ink-2',
              )}
            >
              {active === section.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute inset-0 -z-10 rounded-full bg-surface-2"
                  transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                />
              )}
              {section.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <CommandPalette />
          <ThemeToggle />

          <a
            href={asset(identity.resume)}
            download=""
            className="hidden h-9 items-center gap-2 rounded-full bg-ink px-4 text-[0.8125rem] font-medium text-bg transition-transform hover:scale-[1.03] active:scale-95 sm:inline-flex"
          >
            <Icon name="download" size={14} />
            Resume
          </a>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className="grid size-9 place-items-center rounded-full border border-line text-ink-2 md:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} size={16} />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-nav"
            aria-label="Sections"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-line bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <ul className="mx-auto max-w-6xl px-5 py-3 sm:px-8">
              {navSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center justify-between border-b border-line py-3 text-sm text-ink-2 last:border-0"
                  >
                    {section.label}
                    <Icon name="arrowRight" size={15} className="text-ink-3" />
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <a
                  href={asset(identity.resume)}
                  download=""
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-ink text-sm font-medium text-bg"
                >
                  <Icon name="download" size={15} />
                  Download resume
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
