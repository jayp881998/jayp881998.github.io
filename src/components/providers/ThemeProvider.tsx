'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

const ThemeContext = createContext<{ theme: Theme; toggle: () => void }>({
  theme: 'dark',
  toggle: () => {},
});

export const STORAGE_KEY = 'jp-theme';

/**
 * Blocking script injected into <head> before paint.
 *
 * This is what prevents the flash of wrong theme: it stamps the class on
 * <html> synchronously, before React hydrates and before the first paint.
 * Dark is the default when nothing is stored.
 */
export const themeInitScript = `
(function(){
  try {
    var stored = localStorage.getItem('${STORAGE_KEY}');
    var theme = stored === 'light' || stored === 'dark'
      ? stored
      : 'dark';
    var root = document.documentElement;
    root.classList.remove('light','dark');
    root.classList.add(theme);
    root.style.colorScheme = theme;
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`.trim();

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');

  // Read back whatever the blocking script decided, so React state agrees
  // with the DOM instead of fighting it.
  useEffect(() => {
    const current = document.documentElement.classList.contains('light') ? 'light' : 'dark';
    setTheme(current);
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      const root = document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(next);
      root.style.colorScheme = next;
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* private mode — theme just won't persist */
      }
      return next;
    });
  }, []);

  return <ThemeContext.Provider value={{ theme, toggle }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
