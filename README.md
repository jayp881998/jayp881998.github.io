# Jay Panchal — Portfolio

A recruiter-facing portfolio for a **BI Developer / Operations & Inventory Analyst**.
Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion.

Built as a **fully static export**, so one build artifact deploys identically to
Vercel and GitHub Pages with no server and no runtime cost.

---

## Quick start

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export -> ./out
npm run preview      # serve ./out locally, exactly as it will be hosted
```

Requires Node 20+ (built and tested on Node 24).

---

## ✅ Before you publish — the short checklist

| Item | Status | Where |
|---|---|---|
| Headshot | **Done** — cropped to 800×800, 62 KB | `public/jay-panchal.jpg` |
| Resume PDF | **Done** — 52 KB | `public/Jay-Panchal-Resume.pdf` |
| Dashboard screenshots | **Not added** — placeholders show | `public/projects/<slug>/` |
| Site URL | **Check this** — set to `https://jayp881998.github.io` | `src/content/profile.ts` → `identity.siteUrl` |
| Contact form | Falls back to `mailto:` until configured | `.env.local` → `NEXT_PUBLIC_FORM_ENDPOINT` |

Search the codebase for `‼️ REPLACE` to find every field that expects your input.

---

## Editing content — you only ever touch one file

**`src/content/profile.ts`** is the single source of truth. The nav, SEO metadata,
sitemap, JSON-LD structured data, command palette, Open Graph card, and the
generated `/work/[slug]` case-study pages all derive from it.

| Export | Drives |
|---|---|
| `identity` | Name, title, headline, bio, links, resume path, headshot path, site URL |
| `metrics` | The six proof tiles under the hero |
| `quickFacts` | The credibility chips under the headline |
| `differentiators` | The four About cards |
| `skillGroups` | The Skills section (nine groups, ordinal levels) |
| `experience` | The timeline |
| `projects` | Work cards **and** the auto-generated case-study pages |
| `education`, `certifications` | The Education section |
| `aiPractice` | The "Working in an AI-enabled environment" block |
| `navSections` | Header nav, footer nav, command palette, scroll-spy |
| `seo` | Title, description, keywords |

Add a project to the `projects` array and a fully-rendered case study appears at
`/work/<slug>`, linked from the grid, listed in the sitemap, and searchable in
the command palette. No other file changes.

### Adding screenshots

```
public/projects/it-support-analytics-pipeline/dashboard.png
```

```ts
gallery: [{ src: '/projects/it-support-analytics-pipeline/dashboard.png',
            caption: 'SLA compliance and backlog aging' }],
```

Sanitise them first — blur or replace real client names, ticket IDs, agent names
and volumes. Until a project has screenshots it shows a labelled placeholder
rather than an empty box.

---

## Deployment

The build output is plain static files. Both targets below use the **same**
`npm run build`.

### Vercel

1. Push this repo to GitHub.
2. vercel.com → **Add New… → Project** → import the repo.
3. Accept every default and deploy. Next.js is detected automatically.
4. Add a custom domain later under **Settings → Domains**.

### GitHub Pages at `jayp881998.github.io` (the root URL)

A user-site must live in a repo named exactly `<username>.github.io`:

1. Create a new repo named **`jayp881998.github.io`**.
2. Push this code to its `main` branch.
3. Repo → **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. `.github/workflows/deploy.yml` builds and publishes on every push to `main`.

Site lands at `https://jayp881998.github.io`.

> **Deploying to a sub-path instead?** (e.g. `jayp881998.github.io/Portfolio`)
> Uncomment the `BASE_PATH: /Portfolio` env block in `.github/workflows/deploy.yml`
> and update `identity.siteUrl`. Every asset already routes through the
> `asset()` helper in `src/lib/utils.ts`, so a base path works without further edits.

`public/.nojekyll` is committed and required — without it GitHub Pages' Jekyll
step silently discards the `_next/` directory and the whole site loads unstyled.

### Contact form

The form works with zero configuration by composing a pre-filled `mailto:`.
For real inbox submissions, create a free [Formspree](https://formspree.io) form and add:

```bash
# .env.local  (and the same variable in Vercel → Settings → Environment Variables)
NEXT_PUBLIC_FORM_ENDPOINT=https://formspree.io/f/xxxxxxxx
```

---

## Design decisions worth knowing

These are choices where the obvious option was rejected on purpose.

**No testimonials, patents, publications, or blog.** There is no real content
for them. A recruiter who spots one invented testimonial stops trusting the
true parts of the page too — and the true parts here are strong.

**Skills use four named ordinal steps, not percentage bars.** "SQL — 92%" is a
self-assigned number with no defensible basis, and it appears on every template
portfolio. *Familiar / Working / Advanced / Core* is calibratable, and the word
renders beside the meter so the level never depends on colour alone.

**Stat tiles carry no deltas or sparklines.** There is no honest comparison
period for "20 hrs/week eliminated", and a fabricated "+12% vs last quarter"
would undermine every other number on the page. Each tile instead names where
its figure came from.

**Architecture is rendered from data, not shipped as an image.** The pipeline
diagrams are React components driven by the `pipeline` array. They stay sharp at
any width, re-theme with dark/light, are readable by screen readers, and cost no
network request. They are deliberately *not* charts — there is no measured data
in a pipeline diagram, so drawing it as bars would be inventing an encoding.

**No full-screen loading splash.** A pre-loader delays Largest Contentful Paint,
costs Lighthouse points, and makes a recruiter wait for content they came to
read. Page transitions use a 350 ms fade via `src/app/template.tsx` instead.

**Work sits above About.** Evidence before biography.

**The custom cursor never hides the real one.** Replacing the system cursor
breaks text-selection affordances and resize handles. It also disables itself
on touch devices and under `prefers-reduced-motion`.

---

## Accessibility

- Skip-to-content link as the first tab stop.
- Every interactive element keyboard-reachable with a visible focus ring (never removed).
- Modal and command palette: focus-trapped, `Escape`-dismissable, focus restored to the trigger.
- `aria-expanded` / `aria-controls` on all disclosures; `aria-live` on form status.
- Colour is never the sole carrier of meaning (skill levels ship the word; status chips ship an icon).
- Full `prefers-reduced-motion` support — all decorative animation stops, nothing informational depends on it.
- `forced-colors` and print stylesheets included.

## Performance

- Static HTML, no server. ~167 kB first-load JS.
- Fonts self-hosted at build time by `next/font` (no render-blocking Google request, no layout shift).
- Icons are ~20 inline SVGs, not an icon package.
- Background visuals are CSS gradients — zero image requests.
- Headshot pre-sized to 800×800 / 62 KB (`images.unoptimized` is required by static export, so source images must be sized correctly rather than resized at request time).

---

## Keyboard shortcuts

| Key | Action |
|---|---|
| `⌘K` / `Ctrl+K` | Open command palette |
| `/` | Open command palette |
| `↑` `↓` | Navigate results |
| `↵` | Run |
| `Esc` | Close |

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Metadata, JSON-LD, theme bootstrap, chrome
│   ├── page.tsx                # Section order
│   ├── template.tsx            # Page transition
│   ├── not-found.tsx           # 404
│   ├── globals.css             # Design tokens + Tailwind v4 @theme
│   ├── icon.svg                # Favicon
│   ├── opengraph-image.tsx     # Social card (source of truth for og.png)
│   ├── robots.ts  sitemap.ts
│   └── work/[slug]/page.tsx    # Generated case studies
├── components/
│   ├── chrome/                 # Cursor, palette, scroll progress, floating actions, theme toggle
│   ├── layout/                 # Header, Footer
│   ├── providers/              # ThemeProvider (+ pre-paint init script)
│   ├── sections/               # Hero, Work, About, Skills, Experience, Education, Contact
│   └── ui/                     # Primitives
├── content/profile.ts          # ⭐ ALL CONTENT
└── lib/                        # Hooks + utils
scripts/postbuild.mjs           # Writes og.png with a correct extension
legacy/                         # Previous static template, kept for reference
```

---

## Theming

Change the accent hue in one place — `:root` and `.light` in
`src/app/globals.css` — and the entire site re-themes. Dark is the default;
light is a separately-chosen palette stepped for a light surface, not an
automatic inversion. Theme choice persists in `localStorage` and is applied by a
blocking script before first paint, so there is no flash of the wrong theme.
