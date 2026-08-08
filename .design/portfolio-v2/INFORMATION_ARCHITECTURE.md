# Information Architecture: Portfolio v2

## Site Map

- Home `/`
  - Hero (identity, claim, proof) — anchor `#top`
  - Stat band — anchor `#proof` (nested inside hero region)
  - **Compact skills strip (NEW)** — no anchor/nav entry; a dense sub-section between the stat band and Work, not a navigable destination (see Navigation Model)
  - Work `#work`
    - Case study detail → `/work/[slug]` (see below)
  - About `#about`
  - Skills (deep grid) `#skills`
  - Experience `#experience`
  - Education & certifications `#education`
  - Contact `#contact`
- Case study `/work/[slug]`
  - Generated statically for all 4 projects (`generateStaticParams`)
  - One shared template, conditionally branched for the flagship (`project.featured === true` and `slug === 'it-support-analytics-pipeline'`) vs. the other 3 — see Component Reuse Map
- **Reserved, not built** `/writing` (or `/notes`) and `/writing/[slug]`
  - Real routes, not anchors — see Navigation Model and Content Growth Plan for how this slots in later without reworking the current nav

## Navigation Model

- **Primary navigation** (`Header.tsx` desktop nav): 6 items max, unchanged — Work, About, Skills, Experience, Education, Contact. The new compact skills strip does **not** get a 7th nav item; it's discovered by scrolling, not navigated to, keeping the nav at its current density and avoiding "which skills section?" ambiguity in the nav bar itself.
- **Two kinds of nav item, going forward** — today `navSections` is a flat array of same-shaped anchor entries (`{id, label}`), which is correct only because every entry today is an in-page anchor on the home route. A future `/writing` entry is a different kind (a real route, not an id on the current page) and must not be forced into the same shape. Recommendation: keep `navSections` exactly as-is for the anchor items, and when `/writing` is actually built, add it as a **separate, explicitly-typed entry** (e.g. a `kind: 'anchor' | 'route'` discriminant, or simply a second small array rendered after the anchor list) so `Header.tsx`'s scroll-spy logic (`useActiveSection(SECTION_IDS)`, which assumes every id exists in the current document) never has to special-case a route link. This is a rendering/typing decision for the future build, not something to implement now — noted here so it isn't discovered as a surprise mid-build.
- **Cross-page anchor correctness (found while grounding this IA — fixed same session):** `Header.tsx`'s desktop and mobile nav, and `Footer.tsx`'s section links, rendered bare `href="#work"` etc. — same-document fragment links that only resolved from `/`; from `/work/[slug]` they silently did nothing, since there was no matching `id` on the case-study page. The command palette's `goToSection()` had the identical gap (`document.getElementById(id)?.scrollIntoView(...)` with no home navigation first). **Fixed**: added `homeAnchor(id)` to `src/lib/utils.ts` (basePath-aware, returns `/#id`) for the three raw-`<a>` call sites, and `goToSection()` now checks `usePathname()` and does `router.push(`/#${id}`)` when not already on `/`. Verified in-browser from both a case-study page's header/footer nav and its command-palette "Navigate" actions — both now return home and land on the right section. This matters more once a future `/writing` route adds a third page type that also needs to reach home anchors.
- **Secondary navigation**: none — no sidebar or tabs. The case-study page's "Next" footer nav (cycles to the next project) and the "All work" back-link are the only secondary wayfinding, unchanged from v1.
- **Utility navigation**: command palette (⌘K), theme toggle, résumé download button — all in the header, unchanged placement.
- **Mobile navigation**: existing slide-down drawer (`Header.tsx` mobile nav), unchanged — same 6 anchor items plus résumé download.

## Content Hierarchy

### Home `/`
1. **Hero identity + claim** — who, what, proof-of-availability; the H1 is the LCP element and must answer "what does this person do" in one read (already fixed for LCP this session).
2. **Stat band** — the 6 headline metrics, immediately below the fold line; this is the "prove it fast" layer.
3. **Compact skills strip (NEW)** — "Power BI · T-SQL · Python · SQL Server" density, placed here specifically so the core stack lands in the *first* scroll, ahead of Work. This is a scan-speed optimization for a recruiter who reads only the hero + stat band + this strip before deciding whether to open a case study.
4. **Selected work** — the flagship + featured case studies; this is where "pipelines, not screenshots" gets proven.
5. **About** — the mechanical-engineer-turned-BI-developer narrative; context for someone who's already convinced by 1–4 and wants the story.
6. **Deep skills grid** — the full step-rated inventory (Core/Advanced/Working/Familiar), for a technical screener doing a capability checklist pass.
7. **Experience** — the role-by-role timeline, for someone verifying tenure/scope against a job requirement.
8. **Education & certifications** — credential verification, typically a late-stage check.
9. **Contact** — the conversion point once everything above has done its job.

### Case study `/work/[slug]`
1. **Header block** — title, kicker, period, and the outcome-oriented tagline; plus the "View code" / "Live demo" / "Resume" actions, kept high so a recruiter never has to hunt for the resume link.
2. **Outcome (metrics)** — placed before the narrative on purpose (existing v1 pattern, correct, unchanged): the numbers a hiring manager needs are visible before they commit to reading prose.
3. **Problem → What I built → Impact** (main column) + **Stack / Screens** (sticky aside) — the actual case-study narrative, two-column, unchanged structure.
4. **Dashboard section (NEW, flagship only)** — sits directly after the Problem/Approach/Impact block, before Architecture. Ships v2 with the sanitized screenshot in an embed-sized slot; becomes the live Power BI Publish-to-web iframe as a fast-follow, same slot, no layout change. Positioned here (not buried in the aside) because it's the single highest-credibility asset on the page and deserves full width and its own moment, immediately before the reader sees *how* it was built.
5. **Architecture** (full width) — for the flagship, this becomes the scroll-linked stage-by-stage scrollytelling version; for the other 3 projects, this stays exactly as today (the existing static/`whileInView` `PipelineDiagram`). Same heading, same position, branch is internal to the component, not the page structure.
6. **Next** — cycles to the next case study, unchanged.

## User Flows

### Recruiter 10-second scan (primary flow)
1. User lands on `/` (from LinkedIn, résumé link, or search).
2. User reads Hero H1 + identity line — visible immediately, no fade-gate (fixed this session).
3. User's eyes drop to the stat band, then the new compact skills strip.
4. Decision point:
   - If the stack/metrics match what they're hiring for → scrolls to Work or clicks a case study.
   - If not a fit → leaves; nothing below this point needed to load-bearingly justify the visit.
5. User arrives at a case study or Contact.

### Case-study deep dive
1. User clicks a featured card on `/` (or a command-palette "Case studies" result) → lands on `/work/[slug]`.
2. User reads Outcome (metrics) first, then Problem → What I built → Impact.
3. For the flagship: user scrolls into the Dashboard section (screenshot today, live embed later) and the scrollytelling Architecture rail — this is the "he says he builds dashboards" → "I just used one" moment the brief calls out as the highest-ROI move.
4. Decision point:
   - Convinced → clicks "View code" (GitHub) or navigates to Contact.
     - **Currently broken from this route** (see Navigation Model finding above) if they use the header nav or command palette to reach `#contact` — must resolve to `/#contact`, not `#contact`.
   - Wants to compare → clicks "Next" to cycle to another case study, or "All work" back to `/#work`.

### Contact conversion
1. User reaches `#contact` (from `/`) or `/#contact` (from a case study, once the cross-page fix lands).
2. User either copies the email, opens LinkedIn/GitHub, downloads the résumé, or fills the form.
3. Form submits to Web3Forms (`NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`, wired and verified this session); on success shows inline confirmation; on failure or if the key is unset, falls back to a pre-filled `mailto:`.

## Naming Conventions

| Concept | Label in UI | Notes |
|---|---|---|
| A project entry | "Case study" (in copy), `Project` (in code) | Keep "case study," not "project," in user-facing copy — matches the brief's "pipelines, not screenshots" positioning; a "project" sounds like coursework, a "case study" sounds like delivered work. |
| The featured/flagship project | "Selected work" (section), no separate UI label for "flagship" | `featured: boolean` on `Project` already distinguishes it in code; don't introduce a visible "Flagship" badge — the dashboard embed + scrollytelling treatment itself communicates the distinction without needing a label. |
| Skill proficiency | Core / Advanced / Working / Familiar | Existing `LEVEL_LABEL` — do not introduce percentages, do not rename these four terms. |
| A future long-form post | "Writing" (nav label, if/when built) | Not "Blog" — matches the site's overall register (BI analyst, not a lifestyle-blog tone); `/writing` route, not `/blog`. |

## Component Reuse Map

| Component | Used on | Behavior differences |
|---|---|---|
| `Header` / `CommandPalette` | Every route | Nav anchor hrefs need to become route-qualified (`/#id`) to work correctly from `/work/[slug]` — currently only correct from `/` (see finding above). |
| `Section` / `Container` (`src/components/ui/Section.tsx`) | Every home-page section, including the new compact skills strip | No change needed — the new strip is just another `Section`-shaped block; it deliberately does **not** get an `id` prop wired into `navSections`/scroll-spy. |
| `src/app/work/[slug]/page.tsx` (single shared template) | All 4 case studies | One file, one route pattern — no separate template or route needed for the flagship. Branches internally on `project.featured` (already exists in the type) to swap in (a) the Dashboard section and (b) the scrollytelling `PipelineDiagram` variant vs. today's static one. No new dynamic segment, no new file. |
| `PipelineDiagram` (`src/components/ui/PipelineDiagram.tsx`) | Hero strip (`PipelineStrip`), case-study Architecture section, (existing) card modal | Gains a new scroll-linked mode used only by the flagship's Architecture section; the Hero strip and other projects' Architecture sections keep the current looping/`whileInView` render unchanged. |
| `Template` (`src/app/template.tsx`) | Every route (fade-in page transition) | No change — already route-agnostic; will apply to `/writing` automatically whenever that's built. |

## Content Growth Plan

- **Case studies**: `projects` array in `profile.ts` already scales by just appending an entry + `generateStaticParams` picks it up — no IA change needed as this grows. `featured` stays boolean; if a second project ever earns the flagship treatment, the template's branch condition should move from a slug check to purely `project.featured` (currently both would coincide, but the code should key off `featured`, not the specific slug, to avoid hardcoding a specific case study into the template).
- **Skills**: `skillGroups` already an array of groups of skills — scales the same way, no IA impact.
- **Writing** (reserved, not built): when started, add as (a) a new typed content collection (either a parallel `Post[]` array matching today's plain-TypeScript-array pattern, or a real MDX pipeline if long-form formatting is needed — brief leaves this open, not decided here), (b) a new route-kind nav entry per the Navigation Model section above, and (c) `/writing` (index) + `/writing/[slug]` (detail) following the exact same `generateStaticParams` pattern already proven by `/work/[slug]`. No changes to the existing case-study or anchor-nav structure are required to add this later — that's the point of deferring it now.

## URL Strategy

- Pattern: flat, two route families — `/` (single page, anchor-addressed sections) and `/work/[slug]` (one static page per case study). Future: `/writing` and `/writing/[slug]` follow the identical shape.
- Dynamic segments: `[slug]` only, sourced from `Project.slug` in `profile.ts`, statically generated at build time (`generateStaticParams`) — matches the static-export constraint (`next.config.mjs output:'export'`).
- Query parameters: none today, none proposed — no filtering/sorting/pagination surface exists or is planned (4 case studies doesn't warrant one; revisit only if the case-study count grows enough to need filtering).
- Anchor fragments: `#work`, `#about`, `#skills`, `#experience`, `#education`, `#contact`, plus `#top` and `#proof` inside the hero — all home-page-only; must be referenced as `/#id` from any non-home route (see Navigation Model finding).
