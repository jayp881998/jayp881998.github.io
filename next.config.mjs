/**
 * The site is built as a fully static export so that ONE build artifact deploys
 * identically to Vercel and to GitHub Pages. Nothing here requires a Node server.
 *
 * Deploy targets
 * --------------
 *  - Vercel                        -> `npm run build` (no env vars needed)
 *  - github.com/<user>.github.io   -> `npm run build` (no env vars needed, site is at the root)
 *  - github.com/<user>/<repo>      -> `BASE_PATH=/<repo> npm run build`
 *
 * See README.md for the full deployment walkthrough.
 */

const basePath = process.env.BASE_PATH ?? '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Emits a plain ./out folder of HTML/CSS/JS — no server, no runtime cost.
  output: 'export',

  // Required by `output: 'export'`; next/image optimisation needs a server.
  // Source images are pre-sized instead (see README > Assets).
  images: { unoptimized: true },

  // Emits /work/slug/index.html rather than /work/slug.html, which is what
  // GitHub Pages' static file server expects for clean URLs.
  trailingSlash: true,

  basePath,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },

  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
