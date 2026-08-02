'use client';

import { useState } from 'react';
import { identity } from '@/content/profile';
import { asset, cn, initials } from '@/lib/utils';

/**
 * Headshot with a graceful monogram fallback.
 *
 * The fallback matters: until the real photo is dropped into /public the site
 * still has to look finished, and a broken-image icon in the hero is worse
 * than no photo at all.
 */
export function Avatar({ className }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    // Rendered size comes from `className` so it can be responsive. On a phone
    // a 232px portrait pushes the headline entirely below the fold, which
    // wastes the only screen most recruiters actually read.
    <div
      className={cn(
        'relative grid place-items-center overflow-hidden rounded-2xl border border-line bg-surface-2',
        className,
      )}
    >
      {!failed ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export: images are unoptimised anyway, and this needs an onError fallback.
        <img
          src={asset(identity.headshot)}
          alt={`${identity.name}, ${identity.title}`}
          width={800}
          height={800}
          loading="eager"
          decoding="async"
          onError={() => setFailed(true)}
          className="size-full object-cover"
        />
      ) : (
        <div
          className="grid size-full place-items-center bg-gradient-to-br from-surface-3 to-surface"
          aria-label={identity.name}
          role="img"
        >
          <span className="figure text-[28%] font-semibold leading-none tracking-tight text-ink-3">
            {initials(identity.name)}
          </span>
        </div>
      )}

      {/* Inner hairline so the photo sits on a lit edge rather than floating. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/10"
      />
    </div>
  );
}
