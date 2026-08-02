'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { identity } from '@/content/profile';
import { useScrolledPast } from '@/lib/hooks';
import { asset } from '@/lib/utils';
import { Icon } from '@/components/ui/Icon';

/**
 * Persistent resume download + back-to-top, bottom-right.
 *
 * The resume button is the single most important control on a recruiter-facing
 * site, so it is always reachable without scrolling back to the hero. It fades
 * in after the first viewport so it never competes with the hero CTAs.
 */
export function FloatingActions() {
  const shown = useScrolledPast(560);

  return (
    <div className="no-print fixed bottom-5 right-5 z-[90] flex flex-col items-end gap-2.5 sm:bottom-7 sm:right-7">
      <AnimatePresence>
        {shown && (
          <motion.button
            key="top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="Back to top"
            title="Back to top"
            initial={{ opacity: 0, scale: 0.8, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 8 }}
            transition={{ duration: 0.2 }}
            className="glass grid size-10 place-items-center rounded-full text-ink-2 shadow-[var(--shadow-lift)] transition-colors hover:text-ink"
          >
            <Icon name="arrowUp" size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {shown && (
          <motion.a
            key="resume"
            href={asset(identity.resume)}
            download=""
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="group inline-flex h-11 items-center gap-2 rounded-full bg-ink px-4 text-sm font-medium text-bg shadow-[var(--shadow-lift)] transition-transform hover:scale-[1.03] active:scale-95"
          >
            <Icon name="download" size={16} />
            <span className="hidden sm:inline">Resume</span>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
