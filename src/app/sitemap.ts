import type { MetadataRoute } from 'next';
import { identity, projects } from '@/content/profile';

// Required by `output: 'export'`.
export const dynamic = 'force-static';

/** Emitted as a static /sitemap.xml at build time. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: identity.siteUrl,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${identity.siteUrl}/work/${project.slug}`,
      lastModified: now,
      changeFrequency: 'yearly' as const,
      priority: project.featured ? 0.8 : 0.6,
    })),
  ];
}
