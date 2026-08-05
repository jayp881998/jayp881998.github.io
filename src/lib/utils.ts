/** Minimal class-name joiner. Avoids pulling clsx/tailwind-merge into the bundle. */
export function cn(...parts: (string | false | null | undefined)[]): string {
  return parts.filter(Boolean).join(' ');
}

/**
 * Prefix a /public asset with the deploy basePath.
 *
 * Next rewrites `basePath` for next/image and <Link>, but NOT for a raw
 * `src="/x.png"`. Route every static asset through this so the site keeps
 * working if it is ever deployed under a sub-path (e.g. /Portfolio).
 */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  if (!path.startsWith('/')) return `${base}/${path}`;
  return `${base}${path}`;
}

/**
 * Href for a home-page anchor section (e.g. `#work`), safe to use from any
 * route. A bare `#work` only scrolls correctly when already on `/` — from
 * `/work/[slug]` (or any future non-home route) it resolves against the
 * current page and finds nothing. Prefixing with `/` (and the basePath, for
 * sub-path deploys) makes the browser navigate home first, then jump to the
 * anchor, from anywhere.
 */
export function homeAnchor(id: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
  return `${base}/#${id}`;
}

/** "Jay Panchal" -> "JP". Used by the headshot fallback. */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join('');
}
