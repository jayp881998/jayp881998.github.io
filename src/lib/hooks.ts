'use client';

import { useReducedMotion } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Hydration-safe `prefers-reduced-motion`.
 *
 * framer-motion's `useReducedMotion()` reads the media query synchronously on
 * the client, so for a visitor with "reduce motion" enabled it returns `true`
 * on the very first client render while the server rendered with `false`. Any
 * component that branches on it — returning a plain <div> instead of a
 * <motion.div>, or dropping an `initial` style — then produces different HTML
 * on the server and the client, and React aborts hydration
 * (error #418) and re-renders the whole tree on the client. That is a real
 * failure for exactly the users who asked for less motion.
 *
 * Gating on `mounted` makes the first client render identical to the server's,
 * so hydration succeeds; the reduced-motion variant is applied on the very next
 * render. Everything decorative is additionally disabled in CSS, so nothing
 * depends on this alone.
 */
export function useReducedMotionSafe(): boolean {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return mounted && !!reduce;
}

/**
 * Writes pointer position into --mx/--my on the element so the `.spotlight`
 * CSS class can render a radial highlight that follows the cursor.
 * Pure CSS custom-property writes — no React re-render per mouse move.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onPointerMove = useCallback((e: React.PointerEvent<T>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, []);

  return { ref, onPointerMove };
}

/** SSR-safe media query. Returns false during render on the server. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, [query]);

  return matches;
}

/** True once the user has scrolled past `offset` pixels. */
export function useScrolledPast(offset = 24): boolean {
  const [past, setPast] = useState(false);

  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > offset);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [offset]);

  return past;
}

/**
 * Tracks which section is currently in view, for the header's active state.
 * Uses a band across the upper-middle of the viewport so the highlight changes
 * when a section becomes the *subject* of the screen, not when it merely enters.
 */
export function useActiveSection(ids: readonly string[]): string {
  // Starts empty so nothing is highlighted while the visitor is still on the
  // hero — defaulting to the first section marks "Work" as active before the
  // reader has reached it.
  const [active, setActive] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el);
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [ids]);

  return active;
}

/** Locks body scroll while a modal or the command palette is open. */
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prev = document.body.style.overflow;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (scrollbar > 0) document.body.style.paddingRight = `${scrollbar}px`;
    return () => {
      document.body.style.overflow = prev;
      document.body.style.paddingRight = '';
    };
  }, [locked]);
}
