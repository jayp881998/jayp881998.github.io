# Build Tasks: Portfolio v2

Generated from: `.design/portfolio-v2/DESIGN_BRIEF.md`, `.design/portfolio-v2/INFORMATION_ARCHITECTURE.md`
Date: 2026-08-05

**Aesthetic philosophy** (applies to every task below): Swiss/Editorial grid + data-viz motifs, dark-by-default, Apple/Linear/Vercel restraint. One confident accent hue, flat over gradient, motion spent deliberately.

**Already shipped, not re-tasked here** (committed on `v2-redesign`): command-palette portal fix, hero LCP fix, `--ink-kicker` contrast token, Web3Forms contact wiring, cross-page anchor nav fix, Geist typeface, `--violet`/`.grid-plane`/`.conic-ring` retirement, named spacing-scale tokens.

**Decided, not tasked**: shadcn/ui adoption — the brief recommended it mainly for the command palette's Dialog/Command primitives, but that bug is already fixed by hand (portal + `document.body`) with no shadcn dependency. `Modal.tsx` has no reported issues. Adopting shadcn now would replace working code with no functional gain — skipped. Logged to `FUTURE_CONSIDERATIONS.md` as a rejected-but-viable alternative if `Modal.tsx` accessibility gaps surface later.

**Found while grounding this task list**: the brief's §6.5 "hero pipeline chip strip clips" bug appears already fixed in the current code — `PipelineStrip` (`src/components/ui/PipelineDiagram.tsx:93-94`) already has `overflow-x-auto` plus a `marquee-mask` fade-edge. No task needed; flagging in case a visual check during Task 1 shows otherwise.

## Foundation

- [x] **Apply the spacing scale to existing components** — DONE (commit ef74b73). Section rhythm (`py-section-y`/`-lg`, `mb-header-gap`/`-lg`) applied to the canonical `Section.tsx`; consistent 44px control height (`h-control`) applied across buttons/inputs. Card paddings left as raw values on purpose — they carry intentional per-component responsive variation (`p-5 sm:p-6`, `p-6 sm:p-7`, `p-6 sm:p-8`) a single token would flatten. Pixel-identical, verified in-browser.

## Core UI

- [x] **Bento hero cluster** — DONE (commit 0126763). Four-tile bento on lg+ (headshot, open-to-work, current role, 45-min-refresh KPI tile). Below lg only the small headshot shows so the H1 stays first. Sparkline built as a dependency-free inline-SVG component (`ui/Sparkline.tsx`) instead of Recharts — see the Recharts decision in `FUTURE_CONSIDERATIONS.md`. Also fixed `Avatar` img fill (absolute inset-0) for non-square tiles. Verified desktop + mobile.

- [x] **Compact skills strip** — DONE (commit c515970). Static strip between the proof band and Work, driven by a new curated `coreStack` export in `profile.ts`. Wraps on desktop; single horizontally-scrolling row with fade-mask on mobile. No nav/anchor entry. Built static (not marquee) per the "motion spent deliberately" principle. Verified 375px + 1280px.

- [x] **Dashboard embed slot (flagship case study)** — DONE (commit 047a858). New "The dashboard" section (Impact → **dashboard** → Architecture), driven by an optional `Project.dashboard` field (flagship-only, no slug check). `DashboardPanel` shows the sanitized screenshot in a framed 16:10 viewport now; setting `dashboard.embedUrl` swaps in a live Power BI iframe in the identical box (data-only, zero CLS). Moved the dashboard image out of the aside gallery to avoid duplication. Verified present on flagship / absent on datathon, asset 200, correct ordering.

- [x] **Scrollytelling architecture pipeline (flagship case study only)** — DONE (commit 46ace21). New `ScrollyPipeline` vertical rail; stages activate in sequence tied to scroll position, connector fills with accent. Branches on a new `Project.flagship` flag (NOT `featured` — two projects are featured; only one is flagship) instead of a slug. Reduced-motion shows all stages active. **No per-stage count-up** — stages carry no measured per-node figure and fabricating one each would break the no-invented-numbers rule (§9); the sequential reveal is the effect. **Verification note:** DOM/branch/type/static-state all verified; the live scroll-linked *advance* could not be exercised because this environment's hidden Browser pane pauses `requestAnimationFrame` globally (proven: 0 rAF ticks, `document.hidden=true`) — same limitation hit the count-up. Needs the real-display verification pass below.

## Interactions & States

- [x] **Count-up stat band animations** — DONE (commit baf981e). New `CountUp` component wired into `StatTile`; animates only the numeric token, preserves units/suffixes/commas/decimals (all 7 formats round-trip verified). SSR/no-JS render the real value; reduced-motion shows it immediately. Applies to hero proof band + case-study outcome grids.

## Responsive & Polish

- [x] **Responsive + reduced-motion verification pass** — DONE (user verified locally). Reported all bento/skills-strip/dashboard/scroll-rail states good at desktop + mobile; local checklist at `LOCAL_VERIFICATION_CHECKLIST.md`. (This environment pauses rAF while its pane is hidden, so live motion was verified on the user's real display.)
- [x] **SEO/perf verification pass** — DONE (commit 036768b). Verified title/description/OG/Twitter/JSON-LD (Person, 49 skills, links) all render correctly after the Geist/token changes; sitemap + robots unchanged (no new routes). Fixed: OG card's retired-violet second hue → single accent; gallery image given intrinsic width/height (no CLS).
- [x] **Accessibility pass** — DONE (commit dcabc2e). Measured contrast of all new text in-browser: found `--ink-3` failing AA (~4.3:1) site-wide → bumped both themes to clear 4.5:1 on base + card surfaces (all now pass, verified). Icons are `aria-hidden`/`focusable=false` (decorative, text-paired); bento tiles are presentational divs (no fake-button focus issues); dashboard `<img>` has descriptive alt + `<iframe>` gets a `title`; sparkline `aria-hidden`; CLS handled (gallery dims + dashboard aspect box + sized avatar). Scrolly dim resolves to full contrast and is disabled under reduced-motion.

## Review

- [x] **De-slop + a11y gate** — DONE (commits dcabc2e, 78c5048). Ran `npx impeccable detect`: 145 → 11 findings. Fixed the genuine tells (colored CTA glow, radial hazes, neon `--aqua` → muted `#5ea48d`, ink-3 AA, ⌘K/copy size+contrast, worst line-lengths). Recorded the brief's deliberate choices as accepted detector deviations (mono data-label motif, section eyebrows, Geist — user-confirmed). Remaining 11: soft line-length 90–112ch (acceptable prose width) + 2 false positives (backdrop-filter contrast sample; non-existent nested card). Animation correctness (count-up, scrolly, reduced-motion, no opacity-0 on LCP) was verified inline during each build task.
