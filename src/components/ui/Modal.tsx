'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { useScrollLock } from '@/lib/hooks';
import { Icon } from './Icon';

/**
 * Accessible dialog: labelled, Escape-dismissable, focus-trapped, and it
 * returns focus to whatever opened it. Background scroll is locked.
 */
export function Modal({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    restoreRef.current = document.activeElement as HTMLElement | null;
    // Focus the panel itself so screen readers announce the dialog title.
    requestAnimationFrame(() => panelRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }
      if (e.key !== 'Tab' || !panelRef.current) return;

      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      restoreRef.current?.focus?.();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[120] flex items-end justify-center p-0 sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18 }}
        >
          <button
            type="button"
            aria-label="Close dialog"
            onClick={onClose}
            className="absolute inset-0 cursor-default bg-black/65 backdrop-blur-sm"
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={title}
            tabIndex={-1}
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.99 }}
            transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
            className="glass relative max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl p-6 shadow-[var(--shadow-lift)] outline-none sm:rounded-2xl sm:p-8"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <h3 className="text-lg font-semibold text-ink">{title}</h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="grid size-8 shrink-0 place-items-center rounded-full border border-line text-ink-2 transition-colors hover:border-line-strong hover:text-ink"
              >
                <Icon name="close" size={15} />
              </button>
            </div>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
