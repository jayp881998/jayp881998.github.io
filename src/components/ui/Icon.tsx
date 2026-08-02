import { cn } from '@/lib/utils';

/**
 * Inline icon set. Kept local (rather than an icon package) so the bundle
 * carries only the ~20 glyphs actually used. All stroke-based on a 24 grid
 * and inherit currentColor.
 */
const paths: Record<string, React.ReactNode> = {
  // --- Brand / contact -----------------------------------------------------
  github: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12 1.5a10.5 10.5 0 0 0-3.32 20.47c.53.1.72-.23.72-.5v-1.9c-2.92.63-3.54-1.25-3.54-1.25-.48-1.22-1.17-1.54-1.17-1.54-.95-.65.07-.64.07-.64 1.06.08 1.61 1.09 1.61 1.09.94 1.6 2.46 1.14 3.06.87.1-.68.37-1.14.67-1.4-2.33-.27-4.78-1.17-4.78-5.19 0-1.15.41-2.08 1.08-2.82-.11-.27-.47-1.34.1-2.79 0 0 .88-.28 2.88 1.08a9.98 9.98 0 0 1 5.24 0c2-1.36 2.88-1.08 2.88-1.08.57 1.45.21 2.52.1 2.79.67.74 1.08 1.67 1.08 2.82 0 4.03-2.46 4.92-4.8 5.18.38.33.72.97.72 1.96v2.9c0 .28.19.61.73.5A10.5 10.5 0 0 0 12 1.5Z"
    />
  ),
  linkedin: (
    <path
      fill="currentColor"
      stroke="none"
      d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"
    />
  ),
  mail: (
    <>
      <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
      <path d="m3 7 8.13 5.42a1.6 1.6 0 0 0 1.74 0L21 7" />
    </>
  ),
  phone: <path d="M6.6 2.5h-2A2.1 2.1 0 0 0 2.5 4.7C2.5 13.2 10.8 21.5 19.3 21.5a2.1 2.1 0 0 0 2.2-2.1v-2l-4.4-1.8-2.2 2.7a15.6 15.6 0 0 1-6.2-6.2l2.7-2.2L9.6 5.5Z" />,
  pin: (
    <>
      <path d="M20 10.4c0 5.4-8 12.1-8 12.1s-8-6.7-8-12.1a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10.2" r="2.8" />
    </>
  ),

  // --- Actions -------------------------------------------------------------
  download: (
    <>
      <path d="M12 3.5v12" />
      <path d="m7 10.8 5 4.9 5-4.9" />
      <path d="M4 19.5h16" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M4 12h15.5" />
      <path d="m13.5 5.8 6.2 6.2-6.2 6.2" />
    </>
  ),
  arrowUp: (
    <>
      <path d="M12 20V4.5" />
      <path d="m5.8 10.7 6.2-6.2 6.2 6.2" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6" />
      <path d="M19.4 4.6 10.5 13.5" />
      <path d="M18.5 14.6V18a2.5 2.5 0 0 1-2.5 2.5H6A2.5 2.5 0 0 1 3.5 18V8A2.5 2.5 0 0 1 6 5.5h3.4" />
    </>
  ),
  close: (
    <>
      <path d="m5.5 5.5 13 13" />
      <path d="m18.5 5.5-13 13" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.5 4.5" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  copy: (
    <>
      <rect x="8.5" y="8.5" width="12" height="12" rx="2.4" />
      <path d="M15.5 5.5A2 2 0 0 0 13.5 3.5h-8a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2" />
    </>
  ),
  chevronDown: <path d="m6 9.5 6 6 6-6" />,
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.5v2.2M12 19.3v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.5 12h2.2M19.3 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
    </>
  ),
  moon: <path d="M20.5 14.4A8.6 8.6 0 0 1 9.6 3.5a8.6 8.6 0 1 0 10.9 10.9Z" />,
  command: <path d="M8.5 3.5a2.5 2.5 0 1 0 0 5h11a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0-2.5 2.5v12a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-2.5-2.5h-11a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 2.5-2.5V6a2.5 2.5 0 0 0-2.5-2.5Z" />,

  // --- Pipeline stage kinds ------------------------------------------------
  source: (
    <>
      <path d="M3.5 7.5c0-1.7 3.8-3 8.5-3s8.5 1.3 8.5 3-3.8 3-8.5 3-8.5-1.3-8.5-3Z" />
      <path d="M20.5 7.5v9c0 1.7-3.8 3-8.5 3s-8.5-1.3-8.5-3v-9" />
      <path d="M3.5 12c0 1.7 3.8 3 8.5 3s8.5-1.3 8.5-3" />
    </>
  ),
  process: (
    <>
      <path d="M4 6h9" />
      <path d="M4 12h16" />
      <path d="M4 18h9" />
      <circle cx="16.5" cy="6" r="2.5" />
      <circle cx="16.5" cy="18" r="2.5" />
    </>
  ),
  store: (
    <>
      <rect x="3" y="4" width="18" height="6.5" rx="1.8" />
      <rect x="3" y="13.5" width="18" height="6.5" rx="1.8" />
      <path d="M7 7.2h.01M7 16.8h.01" />
    </>
  ),
  model: (
    <>
      <circle cx="12" cy="5" r="2.5" />
      <circle cx="5" cy="18" r="2.5" />
      <circle cx="19" cy="18" r="2.5" />
      <path d="M10.4 7 6.6 15.6M13.6 7l3.8 8.6M7.5 18h9" />
    </>
  ),
  serve: (
    <>
      <rect x="3" y="4.5" width="18" height="13" rx="2" />
      <path d="M7.5 14V10M12 14V7.5M16.5 14v-2.5" />
      <path d="M9 20.5h6" />
    </>
  ),
  schedule: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.2V12l3.2 2" />
    </>
  ),
};

export type IconName = keyof typeof paths;

export function Icon({
  name,
  className,
  size = 20,
}: {
  name: IconName;
  className?: string;
  size?: number;
}) {
  const isFilled = name === 'github' || name === 'linkedin' || name === 'command';

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
      fill="none"
      stroke={isFilled ? 'none' : 'currentColor'}
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}
