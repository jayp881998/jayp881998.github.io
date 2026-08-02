import type { MetadataRoute } from 'next';
import { identity } from '@/content/profile';

// Required by `output: 'export'`.
export const dynamic = 'force-static';

/** Emitted as a static /robots.txt at build time. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/' }],
    sitemap: `${identity.siteUrl}/sitemap.xml`,
    host: identity.siteUrl,
  };
}
