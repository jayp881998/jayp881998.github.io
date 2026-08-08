# Local Verification Checklist — Portfolio v2

Run the dev server (NOT `npm run build` — it crashes on Node v24 here; dev is fine):

```bash
npm run dev
```

Then open http://localhost:3000. Check each item below. These are the things that
couldn't be verified in the build environment because it pauses animations
(`requestAnimationFrame`) while its browser pane is hidden — everything static
(DOM, layout, types, asset loading, branching) was already verified.

## Hero (desktop, wide window)
- [ ] Right side shows a **4-tile bento**: headshot (top, wide), "Open to work", "Currently · MVR Cash & Carry", and an "Automated refresh · 45 min" tile.
- [ ] The KPI tile's **sparkline draws itself in** (a line sweeping left→right) once on load. Single accent color, no axis.
- [ ] The bento's bottom edge roughly lines up with the text column's bottom (not wildly taller/shorter).
- [ ] H1 and headshot are **visible immediately** on load — no fade-in from blank.

## Hero (mobile — narrow the window to ~375px or use dev tools device mode)
- [ ] Only a **small square headshot** shows at top; the 3 extra bento tiles are hidden.
- [ ] The **H1 ("I build the SQL-to-Power BI reporting…") is high up**, not pushed far down the page.

## Proof stat band (just below the hero)
- [ ] As it scrolls into view, the six numbers **count up from 0** to their values (20 hrs, 45 min, 15%, 1,000+, 100K+, 4.58).
- [ ] Final values are exactly right, **with units/suffixes** ("1,000+" not "1000", "100K+" not "100").

## Compact skills strip (right under the stat band)
- [ ] Desktop: a row of core-stack pills ("Power BI", "DAX", "T-SQL"…), wraps tidily.
- [ ] Mobile: pills become **one horizontally-scrolling row** with a fade at the right edge (not a ragged 3-row block).

## Flagship case study (/work/it-support-analytics-pipeline)
- [ ] Order top→bottom: The problem → What I built → Impact → **The dashboard** → Architecture.
- [ ] "The dashboard" section shows the **screenshot in a framed viewport** (top bar reads "Power BI · Executive overview" + "SYNTHETIC DATA" chip, caption below).
- [ ] Architecture is a **vertical rail**: as you scroll down through it, each stage **lights up in sequence** (icon goes accent-colored, card brightens) and the connector line between reached stages **fills with the accent color**.

## A non-flagship case study (/work/211-canada-datathon)
- [ ] Architecture is the **compact static grid** (cards in 2–3 columns), NOT the vertical scroll rail.
- [ ] There is **no "The dashboard" section**.

## Reduced motion (System Settings → enable "Reduce motion", then reload)
- [ ] Stat numbers show their **final value immediately** (no counting).
- [ ] Scroll rail shows **all stages active at once** (no scroll-linked lighting up).
- [ ] Sparkline is **static** (no draw-in).

## Themes
- [ ] Toggle the theme (top-right sun/moon). Both **light and dark** look right — no unreadable gray-on-dark labels, accent reads as a single blue in both.

## Cross-page nav (regression check — already verified here, quick to reconfirm)
- [ ] From a `/work/[slug]` page, clicking a header nav item (e.g. "Contact") **returns home and jumps to that section**. Same for the ⌘K palette's "Navigate" actions.
- [ ] Open ⌘K on a case-study page after scrolling — the background **blurs** (not just dims).

---

**If anything's off**, note which item + what you saw, and I'll fix it. If it all
passes, the remaining work is the a11y / SEO / de-slop review gate.
