import type { Metadata, Viewport } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

import { certifications, education, experience, identity, seo, skillGroups } from '@/content/profile';
import { ThemeProvider, themeInitScript } from '@/components/providers/ThemeProvider';
import { Cursor } from '@/components/chrome/Cursor';
import { FloatingActions } from '@/components/chrome/FloatingActions';
import { ScrollProgress } from '@/components/chrome/ScrollProgress';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { GradientField } from '@/components/ui/GradientField';

// Self-hosted at build time by next/font — no render-blocking request to
// Google, no layout shift, and it works offline.
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL(identity.siteUrl),
  title: {
    default: seo.title,
    template: `%s — ${identity.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: identity.name, url: identity.siteUrl }],
  creator: identity.name,
  applicationName: `${identity.name} — Portfolio`,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_CA',
    url: identity.siteUrl,
    siteName: `${identity.name} — ${identity.title}`,
    title: seo.title,
    description: seo.description,
    // Points at the .png copy written by scripts/postbuild.mjs — an
    // extensionless file is served as octet-stream by static hosts and no
    // social platform will render it. See that script for the full reasoning.
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: `${identity.name} — ${identity.title}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seo.title,
    description: seo.description,
    images: ['/og.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#08090b' },
    { media: '(prefers-color-scheme: light)', color: '#fbfbfc' },
  ],
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'dark light',
};

/**
 * Schema.org Person graph.
 *
 * This is what lets a recruiter's search for the name surface a rich result,
 * and what an ATS or an LLM-based screening tool reads to understand the
 * profile. Built from the same config as the visible page, so it can never
 * drift out of sync with what a human sees.
 */
function StructuredData() {
  const json = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: identity.name,
    jobTitle: identity.title,
    description: seo.description,
    email: `mailto:${identity.email}`,
    telephone: identity.phone,
    url: identity.siteUrl,
    image: `${identity.siteUrl}${identity.headshot}`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Toronto',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    sameAs: [identity.links.linkedin, identity.links.github],
    knowsAbout: skillGroups.flatMap((g) => g.skills.map((s) => s.name)),
    alumniOf: education.map((e) => ({
      '@type': 'EducationalOrganization',
      name: e.school,
    })),
    hasCredential: certifications.map((c) => ({
      '@type': 'EducationalOccupationalCredential',
      name: c.title,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: c.issuer },
    })),
    worksFor: {
      '@type': 'Organization',
      name: experience[0]!.org,
    },
  };

  return (
    <script
      type="application/ld+json"
      // Content is our own static config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `dark` is the default so the very first paint is already correct;
    // themeInitScript replaces it before paint if the visitor chose light.
    <html lang="en" className={`dark ${inter.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <StructuredData />
      </head>
      <body className="min-h-dvh antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>

        <ThemeProvider>
          <GradientField />
          <ScrollProgress />
          <Cursor />
          <Header />

          <main id="main">{children}</main>

          <Footer />
          <FloatingActions />
        </ThemeProvider>
      </body>
    </html>
  );
}
