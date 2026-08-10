# Design Brief: Portfolio v2

## Problem

A recruiter or hiring manager lands on Jay's portfolio with about ten seconds of attention before they decide whether to keep reading. Right now the site mostly earns that attention — but a handful of things quietly work against it: the command-palette search looks broken on every case-study page (dims instead of blurring), the hero's headline and photo fade in from invisible instead of being there on arrival, and several small labels are too low-contrast to read comfortably. Visually, the site currently reads as competent-but-generic — Inter everywhere, an indigo→violet gradient, icon-tile-over-heading cards — the same surface language every AI-assisted portfolio now has, which undercuts the very thing Jay is trying to prove: that he is a careful, detail-oriented analyst, not someone who shipped the first draft.

Beyond the job search, this is Jay's long-term personal site. It needs to hold up and stay easy to extend for years, not just survive one hiring cycle.

## Solution

v2 is a polish-and-differentiate pass, not a rebuild. It keeps everything that already works — the "pipelines, not screenshots" thesis, architecture rails beside every case study, step-rated skills instead of fabricated percentages — and fixes what's broken, replaces the generic visual layer with a distinctive one, and adds a small number of signature interactions that make the site feel unmistakably built *by* a BI analyst rather than *for* one. The experience should feel like reading a well-typeset internal report from a data team that takes its own polish seriously: confident, quiet, fast, nothing decorative that isn't also informative.

Ship in two slices: first, the concrete bugs that hurt the live job-search asset today (command-palette portal fix, hero LCP/opacity-0 fix, label contrast, contact form wiring) — independently deployable, low risk. Then the fuller visual and interaction rebuild (tokens, typography, bento hero, scrollytelling pipeline, dashboard-embed slot).

## Experience Principles

1. **Evidence over assertion** — Every claim on the page (a metric, a skill level, an outcome) is real, sourced, and traceable to a named role. This resolves the tension between wanting the site to impress and wanting it to be trusted; trust wins every time a corner is cut.
2. **Visible on arrival, earned on scroll** — The information that lets someone triage in five seconds (name, role, headline metric, current status) renders immediately, at full opacity, with no animation gating comprehension. Motion is reserved for elaboration the user has already opted into by scrolling or interacting.
3. **One confident hue, quiet everywhere else** — Color and motion are spent deliberately on the few things that deserve emphasis (the accent, the flagship pipeline, a count-up number), and withheld everywhere else. This is what separates "restrained and premium" from "bland," and "AI-slop gradient" from "considered accent."

## Aesthetic Direction

- **Philosophy**: Swiss/Editorial grid with data-viz motifs — a disciplined type-and-grid system (Massimo Vignelli / Swiss International Style structure) wearing the visual vocabulary of a BI tool (sparklines, tabular figures, monospace data labels, architecture diagrams) instead of generic marketing iconography.
- **Tone**: Authoritative but not cold; calm and precise rather than urgent or playful. Confident enough to use a bento grid and a live dashboard, restrained enough to never bounce, never overshoot, never use more than one accent hue at a time.
- **Reference points**: Apple.com (typographic restraint, generous whitespace, physically-plausible motion), Linear.app (dark-mode discipline, quiet borders, precise focus states), Vercel.com (grid rigor, monospace data accents). The existing v1's own architecture-rail and step-rated-skills pattern — these are already correct and should be extended, not replaced.
- **Anti-references**: Generic "AI startup landing page" — purple→cyan gradients, a rounded-square icon tile floating above every heading, gray text on dark or colored backgrounds, bouncy/elastic easing, cards nested inside cards, fabricated percentage skill bars, stock-photo hero illustrations, 3D/Three.js hero scenes.

## Existing Patterns

This design must extend the current token system in `src/app/globals.css`, not replace its structure — only its values.

- **Typography**: `Inter` is currently the sole `--font-sans` (self-hosted via `next/font`, `src/app/layout.tsx:16-20`), used for all body and heading text. `JetBrains Mono` is `--font-mono`, already correctly scoped to `.kicker` labels (`globals.css:270-277`) and `.tabular`/`.figure` numeric utilities (`globals.css:279-287`) — **this scoping is correct and should be kept as-is**. v2 replaces only the sans family: **Geist** for headings and body (revised from the initial General Sans pick — General Sans isn't a Google Font and would require downloading files from Fontshare; Geist is confirmed bundled in `next/font/google` and self-hosts with zero extra setup, exactly like Inter does today — see `.design/portfolio-v2/FUTURE_CONSIDERATIONS.md`), JetBrains Mono unchanged for data/labels.
- **Colors**: A five-plane surface scale (`--bg` → `--surface-3`), a three-step ink scale (`--ink`, `--ink-2`, `--ink-3`), and a single named accent (`--accent` #7c8fff dark / #3e52d9 light) already exist and are structurally sound — v2 keeps this exact token shape. What changes: `--violet` (#9085e9) and the `--accent-lo → --violet → --accent-hi` conic gradient (`globals.css:295-331`, used on the primary CTA ring) are retired in favor of a flat single-accent border/glow. `--aqua` (#2dd4a7) is kept but scope-restricted to status/success use only (already its actual usage — the "open to work" ping dot) — it must not become a second brand hue.
- **Spacing/radius**: `--radius-card: 16px` is the only explicit radius token; spacing is currently ad hoc Tailwind utility values rather than a defined scale. v2 should formalize a spacing scale during `/design-tokens` rather than inventing new ad hoc values per component.
- **Motion primitives**: `.drift` (24s ambient blob drift), `.marquee-track` (42s tech-strip scroll), `.ping-soft` (status-dot pulse), `.conic-ring` (spinning CTA border, to be replaced per above) — all already gated correctly under `prefers-reduced-motion: reduce` (`globals.css:384-398`). Keep this reduced-motion discipline for every new animation (count-up, scrollytelling, bento hover states).
- **Components to extend, not replace**: `Reveal.tsx` (scroll-triggered whileInView wrapper), `Section.tsx`, `StatTile.tsx`, `LevelMeter.tsx` (step-rated skills — do not regress to percentages), `PipelineDiagram.tsx` (architecture rail — extend into scrollytelling rather than rebuilding), `Pill.tsx`, `Button.tsx`, `Modal.tsx`.

## Component Inventory

| Component | Status | Notes |
| --- | --- | --- |
| `CommandPalette.tsx` | Modify | Portal to `document.body` via `createPortal`; mount once in root layout (`src/app/layout.tsx`), outside `<Header>`, so `Header`'s conditional `backdrop-blur-xl` (`Header.tsx:23-27`) can never isolate its scrim again. Fixes the confirmed §6.1 bug. |
| `Header.tsx` | Modify | Remove the command-palette instance from its tree once portaled; keep its own scroll-driven `backdrop-blur-xl`. |
| `Hero.tsx` | Modify → Rebuild layout | Remove `rise()`'s `opacity:0` initial state from the H1 and Avatar wrapper (render visible on first paint); keep it for secondary CTAs/chips only. Rework the empty right column into a bento cluster (headshot tile, "open to work" tile, live mini-KPI sparkline tile, "currently: MVR Cash & Carry" tile). Preload headshot, explicit width/height. |
| `GradientField.tsx` | Modify | Update to the flattened single-accent palette; drop the violet/aqua multi-hue blend. |
| `globals.css` conic-ring | Modify | Replace conic multi-hue gradient with a flat accent border/glow treatment. |
| `PipelineDiagram.tsx` | Modify → extend | Existing static/looping rail becomes the base for the scrollytelling version (stage-by-stage scroll-linked reveal + count-up metric per stage) on the flagship case-study page only; Hero strip and card-modal versions can stay as their current lightweight renders. |
| `StatTile.tsx` | Modify | Add count-up-on-scroll-into-view animation (respecting reduced motion), replacing the static text render. |
| `Skills.tsx` / `LevelMeter.tsx` | Exists, minor | Add the new compact skills strip placement right after the stat band; deep grid stays lower on the page, step-rated pattern unchanged. |
| `Contact.tsx` | Modify | Wire `NEXT_PUBLIC_FORM_ENDPOINT` to a live Web3Forms access key; keep the existing honeypot + copy-email affordance, keep the mailto fallback for when the key is absent. |
| Dashboard embed (case-study page) | New | New slot component on the flagship case-study page for a Power BI Publish-to-web iframe; ships v2 with the sanitized screenshot in that slot, live embed is a fast-follow once a sanitized dataset is published. |
| Sparkline / mini-KPI (bento hero tile) | New | Small `Recharts`-based sparkline component for the bento hero's live mini-KPI tile. |
| Micro-label contrast (`.kicker` usages) | Modify | Raise `--ink-3` or add an accent tint on dark so uppercase eyebrows (`SELECTED WORK`, `ABOUT`, etc.) clear WCAG AA. |
| `layout.tsx` font loading | Modify | Swap `Inter` for `Geist` (via `next/font/google`, confirmed present in Next's bundled font list), keep `JetBrains_Mono` unchanged. |

## Key Interactions

- **Command palette (⌘K / Ctrl+K / `/`)**: Opens as a portaled overlay from anywhere on the site, blurs the page behind it consistently on every route (home and every `/work/[slug]`), closes on click-outside/Esc, arrow keys + Enter navigate results. No behavior change beyond the portal fix — this is a rendering-layer correction, not a UX redesign.
- **Hero on load**: H1 and headshot are present and legible at first paint — no fade-in gate. Secondary elements (status chip, CTA buttons) animate in with a short `ease-out`, staggered, after the LCP content is already visible.
- **Bento hero tiles**: Static on load; a subtle hover lift/glow on pointer devices (reuse the existing `.spotlight` primitive), no animation required to convey their content — the live mini-KPI sparkline itself is the only genuinely "live-feeling" element.
- **Stat band count-up**: Numbers animate 0 → value once scrolled into view (`whileInView`, one-shot, not looping); disabled entirely under `prefers-reduced-motion`, showing the final value immediately instead.
- **Scrollytelling pipeline (flagship case study only)**: As the user scrolls through the case-study page, each of the six architecture-rail stages (Zendesk API → Python ETL → SQL staging → star schema → Power BI model → SQL Agent) activates in sequence — highlighting, revealing its detail copy, and counting up its associated metric — driven by scroll position, not autoplay. Falls back to the existing static/looping render under reduced motion.
- **Dashboard embed slot**: On the flagship case study, a bordered panel holds either the sanitized Power BI Publish-to-web iframe (once available) or, until then, the existing sanitized dashboard screenshot at the same dimensions — so swapping one for the other later is a drop-in, not a layout change.
- **Contact form**: Submits via `fetch` to the Web3Forms endpoint; on success shows inline confirmation, on failure/no-JS falls back to the existing mailto link; copy-email button remains independent of form state.

## Responsive Behavior

- **Mobile-first from 375px.** Bento hero cluster stacks to a single column below `md`; the "live mini-KPI" tile can be deprioritized (moved lower or hidden) on the smallest viewports if it forces excessive scroll before the H1's CTA.
- **Pipeline chip strip** (Hero's condensed strip, currently clipping "SQL Server Agent" off-screen) must either wrap or gain horizontal-scroll with a fade-mask affordance at every breakpoint — never clip silently.
- **Two-column case-study cards** (`Work.tsx` `FeaturedCard`) stack to one column below `md`, matching current behavior — preserve, don't regress.
- **Scrollytelling pipeline** on mobile: same stage-by-stage scroll-linked reveal, but stages likely need to stack full-width rather than the desktop's side-by-side rail layout — verify readability at 375–428px specifically since this is new.
- **Command palette** overlay is full-screen on mobile (already the pattern to preserve), centered modal on desktop.

## Accessibility Requirements

- WCAG 2.1 AA contrast for **all** text including micro-labels/eyebrows (the specific v1 regression called out in the brief) — verify `.kicker` usages and any text over the bento tiles' backgrounds or gradient washes.
- Visible focus states on every interactive element — the existing `:focus-visible` treatment (`globals.css:162-166`) is correct and must be preserved/extended to all new interactive components (bento tiles, dashboard embed slot, scrollytelling triggers).
- `prefers-reduced-motion: reduce` disables: hero secondary-element stagger, bento tile hover motion (keep the state change, drop the animation), stat count-up (show final value immediately), and scrollytelling stage transitions (show the existing static rail render instead).
- Command palette: full keyboard operability (open/close/navigate/select) — already implemented, must survive the portal refactor unchanged.
- Real semantic landmarks and labels throughout — no interactive `div`s where a `button`/`a` is correct; the dashboard embed iframe needs a descriptive `title` attribute.
- Explicit `width`/`height` (or aspect-ratio) on every image, including the headshot and any dashboard screenshot, to guarantee zero CLS.

## Out of Scope

- No MDX pipeline or `/writing` section content — only keep the content model from actively blocking that addition later (per resolved decision #4). No new routes, no new dependencies for this now.
- No live Power BI Publish-to-web embed in the first ship of this feature — build the slot only; the sanitized screenshot ships in its place until a dataset is published (resolved decision #3).
- No 3D/Three.js, no fabricated testimonials, revenue figures, patents, or invented skill percentages (brief §2, §9 — hard constraints, not open questions).
- No rework of the underlying IA/nav order beyond the two additions already specified in the source brief (compact skills strip after the stat band; future-proofed but unbuilt writing route) — this is a polish/differentiation pass on the existing structure, not a new information architecture.
- No changes to `ui-ux-pro-max` token generation path — this project uses `designer-skills`' `/design-tokens` exclusively as the token source.
