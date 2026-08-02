# Handoff: Personal site — Muhammed Ali Khan

## Overview
A single-page, GitHub-Pages-hosted personal site for an engineer. No navigation: one vertical
scroll through hero → domains → selected work → open source → now → footer. Three outbound links
only (email, GitHub, LinkedIn). Light/dark toggle. The signature element is a live, animated
architecture diagram — it stands in for a photo or a marketing hero.

Aesthetic target: premium product-engineering (Linear / Vercel / Stripe / Raycast register).
Explicitly NOT: resume site, recruiter funnel, consulting brochure, generic dev-portfolio template.
Copy voice: first person, warm, curious, terse. No exclamation marks, no emoji, no buzzwords.

## About the Design Files
Everything in `reference/` is a **design reference written in HTML**, not production code.
It is a prototype demonstrating intended look, spacing, motion, and behavior.

**Your task is to recreate these designs in the target codebase's own environment** — pick the
framework that fits the deployment target (this ships to GitHub Pages, so a static build:
Astro, Next.js static export, Eleventy, or hand-written HTML + CSS are all reasonable; Astro is
the best default) and implement with that stack's idioms. Do not lift the prototype's markup
wholesale: the prototype uses inline styles because of the tool it was authored in. **In the real
implementation, use a stylesheet with the tokens in `tokens.css` and normal CSS classes.**

The `.dc.html` files require the sibling `support.js` runtime to render; open them in a browser
from the `reference/` folder to see the design live.

## Fidelity
**High fidelity.** Colors, type scale, spacing, radii, shadows, and motion timings are final —
match them exactly. Content is placeholder in three places (projects, open source repos, and the
"now" entries); keep the placeholder copy in place so the owner can swap it.

## Content model
All page content comes from a single config module — `reference/site-config.js`. This is a hard
requirement from the owner: **adding a project must mean adding one config entry, never touching
layout.** Port it as-is (a TS module, a JSON file, or a content collection — whatever the chosen
framework prefers), preserving these shapes:

- `profile`: { name, role, statement, intro, links: [{ label, href }] }
- `domains`: [{ name, note }]                      → numbered 01..NN at render time
- `projects`: [{ kind, year, title, blurb, tags[], href }]
- `openSource`: [{ name, desc, lang, stars, href }]
- `now`: [{ title, body, live }]                    → `live: true` gets the accent-2 dot + glow

The grids must absorb any length: `repeat(auto-fit, minmax(310px, 1fr))` for work cards.

## Screens / Views

There is one page. **Hero A is the chosen treatment — build that one.** The prototype also
contains heroes B and C behind a floating A/B/C switcher; ignore both and drop the switcher.
Keep the theme toggle.

See `screenshots/hero-a-light.png` and `screenshots/hero-a-dark.png` for the target rendering.

### Hero A — "grid field + diagram slab" (prototype default)
- Full-bleed `<header>`, bottom border `1px solid var(--line)`.
- Background: two 1px linear-gradients forming a 52×52px grid in `var(--grid-line)`.
- Cursor-aware: on `mousemove` the header gets
  `background-image: radial-gradient(420px circle at Xpx Ypx, var(--accent-soft), transparent 70%)`
  where X/Y are cursor coords relative to the element; cleared on `mouseleave`.
  (This replaces the grid image while hovering — if you want both, layer them in one shorthand.)
- Inner column: `max-width: 1120px`, `padding: clamp(72px,11vw,120px) clamp(20px,5vw,40px) 0`.
- Eyebrow: `MUHAMMED ALI KHAN · ENGINEER` — mono, 11px, `letter-spacing:.16em`, uppercase,
  `var(--accent)`, `margin-bottom:26px`.
- H1: "I build systems that stay up." — `clamp(38px,7.4vw,76px)`, weight 600,
  `line-height:1.0`, `letter-spacing:-.04em`, `max-width:15ch`, `margin-bottom:26px`.
- Intro paragraph: 19px / 1.65, `var(--ink-2)`, `max-width:56ch`.
- Diagram panel below, same max-width, `padding: 0 clamp(20px,5vw,40px) 72px`:
  card with `1px solid var(--line)`, `radius 14px`, `background var(--surface)`,
  `padding: 26px 22px 18px`, `box-shadow var(--shadow-1)`.
  Footer strip inside the card, separated by a hairline: two mono legend items
  ("request path" / "event path", 8px dots in `--accent` / `--accent-2`) and a right-aligned
  mono note "the shape of most things I work on".

### Hero B — "typographic index" (NOT BUILDING — reference only)
- Two-column grid, `repeat(auto-fit, minmax(min(340px,100%),1fr))`, `gap clamp(36px,5vw,64px)`,
  `align-items:end`, `padding clamp(80px,12vw,140px) clamp(20px,5vw,40px) clamp(56px,8vw,96px)`.
- Left: eyebrow (name only), then H1 `clamp(42px,8.6vw,92px)` / `line-height:.96` /
  `letter-spacing:-.045em`, with "stay up" in `var(--accent-2)`, explicit `<br>` after
  "I build systems". Then the intro paragraph, `max-width:52ch`.
- Right: an "INDEX" mono label over a hairline, then the domain list — 6 rows, each
  `padding:11px 0`, bottom hairline, mono 10px ordinal (`01`…) + 14px name.
- No diagram in this hero.

### Hero C — "split slab" (NOT BUILDING — reference only)
- Background `var(--surface-2)`, `max-width:1220px`, two columns
  `repeat(auto-fit, minmax(min(340px,100%),1fr))`, `gap clamp(36px,5vw,56px)`, `align-items:center`,
  `padding clamp(72px,10vw,112px) clamp(20px,5vw,40px) clamp(64px,9vw,104px)`.
- Left: eyebrow, H1 `clamp(36px,5.6vw,62px)`, intro (`max-width:46ch`), then the three social
  links as secondary buttons (36px tall, `radius 8px`, `1px solid var(--line-strong)`,
  `background var(--surface)`, mono 12px, label + `↗`; hover → border and text `var(--accent)`).
- Right: the diagram in a `radius 14px` card with `var(--shadow-2)`, cursor-aware, compact legend.

### Section 01 — "What I work on"
- Section: `padding: 88px 0`, bottom hairline. Header row = mono ordinal `01` +
  H2 `30px / weight 600 / letter-spacing -.025em`, gap 16px, `align-items:baseline`.
- Two-column grid `repeat(auto-fit, minmax(min(380px,100%),1fr))`, `gap: 0 56px`.
- Each row: `padding:15px 0`, bottom hairline, baseline-aligned flex —
  26px mono ordinal (`var(--ink-3)`) · 16px/500 name · flexible 1px `var(--line)` leader rule ·
  right-aligned mono 11px note in `var(--ink-3)`.

### Section 02 — "Selected work"
- Header row as above, plus a right-aligned mono count ("3 entries").
- Sub-paragraph: "A few things worth describing. Each one had a part that didn't work the first time."
- Grid `repeat(auto-fit, minmax(310px,1fr))`, `gap:16px`.
- Card: `<a>`, `background var(--surface)`, `1px solid var(--line)`, `radius 12px`, `padding:24px`,
  `overflow:hidden`, `position:relative`, cursor-aware accent field on hover.
  - Top row: mono 11px uppercase `kind` in `var(--accent)` ⟷ mono 11px `year` in `var(--ink-3)`.
  - Title 18px/600, `letter-spacing:-.018em`.
  - Blurb 14px/1.6 `var(--ink-2)`, `margin-bottom:20px`.
  - Tags: 22px tall, `radius 5px`, `background var(--surface-2)`, `1px solid var(--line)`,
    mono 10px `var(--ink-3)`, 6px gap.
  - Hover (200ms ease): `border-color var(--line-strong)`, `translateY(-2px)`, `var(--shadow-2)`.
  - All inner content needs `position:relative` so it sits above the cursor gradient.

### Section 03 — "Open source"
- One bordered card, `radius 12px`, rows separated by hairlines.
- Row (`<a>`): `display:flex; flex-wrap:wrap; gap:10px 20px; padding:18px 22px` —
  mono 14px/500 repo name in `var(--accent)` · 14px description `var(--ink-2)` (`flex:1 1 200px`) ·
  mono 11px language · mono 11px `★ stars` (34px wide, right-aligned), both `var(--ink-3)`.
- Hover: `background var(--surface-2)` over 160ms.

### Section 04 — "Now"
- Sub-paragraph: "What has my attention this month."
- Grid `repeat(auto-fit, minmax(280px,1fr))`, `gap:28px`.
- Entry: 8px dot (`margin-top:7px`) + text. Live entries → dot `var(--accent-2)` with
  `box-shadow: 0 0 0 4px var(--accent-2-soft)` and title in `var(--ink)`; past entries → dot
  `var(--line-strong)`, title in `var(--ink-2)`. Title 16px/600, body 14px/1.62 `var(--ink-2)`.

### Footer
- `padding: 88px 0 96px`, flex, `space-between`, `align-items:flex-end`, wraps.
- Left: "Say hello." 26px/600 `letter-spacing:-.025em`; below, 15px `var(--ink-2)`, `max-width:44ch`:
  "Always up for a conversation about hard systems problems, or something you're building that
  nobody asked for yet."
- Right: three mono 13px links (`email ↗`, `github ↗`, `linkedin ↗`), `gap:26px`,
  `border-bottom:1px solid var(--line-strong)`, `padding-bottom:3px`;
  hover → text and border `var(--accent)`.

## The signature diagram
An inline SVG, `viewBox="0 0 1022 260"`, `width:100%; height:auto`. Render it from data — do not
hand-place duplicated markup.

**Nodes** (`x, y, w`, all `height:40`, `rx:8`, `fill var(--surface-2)`, `stroke var(--line-strong)`):

| label      | sub        |   x |   y |   w |
|------------|------------|----:|----:|----:|
| client     | web        |  40 | 110 |  96 |
| edge       | cdn / auth | 190 | 110 | 104 |
| gateway    | routing    | 348 | 110 | 112 |
| service a  | commands   | 520 |  44 | 116 |
| service b  | queries    | 520 | 176 | 116 |
| event bus  | streams    | 696 | 110 | 116 |
| store      | postgres   | 870 |  44 | 112 |
| telemetry  | otel       | 870 | 176 | 112 |

Inside each node: a status dot at `(x+13, y+20)`, `r:3.2` — `var(--accent)` for the first five
nodes, `var(--accent-2)` for the rest — animated `pulseNode` over `2.4 + (i%4)*0.35` seconds with
a `0.2 * i` second delay and `transform-origin` set to the dot's own coordinates. Label text at
`(x+24, y+17)`, mono 500 11px `letter-spacing:.04em`, `var(--ink)`; sub-label at `(x+24, y+30)`,
mono 400 9.5px, `var(--ink-3)`.

**Edges** — each drawn twice: a static rail (`stroke var(--line-strong)`, width 1.25) and a
traveling pulse on top (width 1.8, `stroke-linecap:round`, `stroke-dasharray:"26 220"`,
`animation: dash Ns linear (0.28*i)s infinite` where `N = 5 + (i % 3)`). Paths, in order —
first four use `var(--accent)` (request path), last four `var(--accent-2)` (event path):

```
M136 130 L190 130
M294 130 L348 130
M460 130 C490 130 490 64 520 64
M460 130 C490 130 490 196 520 196
M636 64  C670 64  666 130 696 130
M636 196 C670 196 666 130 696 130
M812 130 C842 130 840 64  870 64
M812 130 C842 130 840 196 870 196
```

`@keyframes dash { to { stroke-dashoffset: -1000; } }` and
`@keyframes pulseNode { 0%,100%{opacity:.35;transform:scale(1)} 50%{opacity:.9;transform:scale(1.35)} }`.
Everything pauses under `prefers-reduced-motion: reduce`.

## Interactions & Behavior
- **Theme toggle** — pill control, bottom-right, fixed, `backdrop-filter: blur(12px)`,
  `background: color-mix(in oklch, var(--surface) 88%, transparent)`, `radius 12px`,
  `var(--shadow-2)`. Sets `data-theme="light"|"dark"` on `<html>`.
  **Improve on the prototype:** initialize from `localStorage` first, then
  `prefers-color-scheme`, and persist the user's choice. Apply the attribute in a tiny inline
  script in `<head>` to avoid a flash on load.
- **Scroll reveal** — an `IntersectionObserver` with `rootMargin: "0px 0px -8% 0px"`. Sections
  start at `opacity:0; translateY(16px)` and transition to `opacity:1; none` over
  `560ms cubic-bezier(.22,1,.36,1)`; unobserve after firing. Skip entirely under reduced motion
  (never leave content invisible if JS fails — apply the initial hidden state from JS, not CSS).
- **Cursor-aware surfaces** — hero header and each work card only. Never on body text.
- **Hover** — 160ms for state changes, 200ms for card lift. No hover effects on touch devices.
- **Links** — all outbound; add `rel="noopener"` and `target="_blank"` for github/linkedin.

## Responsive behavior
No media queries needed; the prototype is fluid by construction:
- Display type and section padding use `clamp()` (values listed per hero above).
- Every multi-column grid is `repeat(auto-fit, minmax(min(<N>px,100%), 1fr))` so it collapses to
  one column below its breakpoint.
- The open-source row wraps (`flex-wrap:wrap`).
- The diagram scales with its viewBox; below ~520px it becomes small — acceptable, but if you
  prefer, allow horizontal scroll on its container rather than shrinking the labels further.
- Verify at 390px: nothing should exceed the viewport width.

## State
Three pieces only: `theme` ('light' | 'dark', persisted), `hero` variant (drop once chosen), and
the config content (static, build-time). No data fetching. Optionally fetch GitHub stars at build
time to fill `openSource[].stars`.

## Accessibility
- Theme toggle is a real `<button>` with `aria-label` and `aria-pressed`.
- The diagram gets `role="img"` and an `aria-label` describing the flow
  ("client → edge → gateway → services → event bus → store and telemetry").
- Focus-visible rings: 2px `var(--accent)` outline, 2px offset — the prototype omits these; add them.
- Check `--ink-3` on `--surface` for the smallest mono text; bump to `--ink-2` if it fails AA.
- Section headings are `<h2>`; the ordinal numbers are decorative (`aria-hidden`).

## Design Tokens
See `tokens.css` — copy it verbatim. Type scale used on the page:

| Role        | Size                  | Weight | Tracking | Family |
|-------------|-----------------------|--------|----------|--------|
| Display A   | clamp(38px,7.4vw,76px)| 600    | -.040em  | sans   |
| Display B   | clamp(42px,8.6vw,92px)| 600    | -.045em  | sans   |
| Display C   | clamp(36px,5.6vw,62px)| 600    | -.038em  | sans   |
| H2          | 30px                  | 600    | -.025em  | sans   |
| Footer lead | 26px                  | 600    | -.025em  | sans   |
| Lead        | 19px / 1.65           | 400    | 0        | sans   |
| Card title  | 18px                  | 600    | -.018em  | sans   |
| Body        | 15px / 1.6            | 400    | 0        | sans   |
| Small body  | 14px / 1.6            | 400    | 0        | sans   |
| Mono label  | 11px uppercase        | 500    | .10–.16em| mono   |
| Mono meta   | 10–11px               | 400    | 0        | mono   |

Fonts: **Instrument Sans** (400–700) and **JetBrains Mono** (400/500/700), both Google Fonts.
Self-host them for GitHub Pages if you want to avoid the third-party request.

## Assets
None. No images, no icon library. The only glyph used is `↗` (U+2197) on outbound links, and
the diagram is generated from the data table above. If the owner later adds project imagery,
follow the card's 12px radius and `var(--line)` border.

## Files
- `reference/Site.dc.html` — the page, all three heroes, theme toggle, diagram, reveals.
- `reference/Design System.dc.html` — the spec page: color tokens, type scale, spacing, radii,
  elevation, component inventory, motion table. Read this for anything the page doesn't show.
- `reference/site-config.js` — the content model to port.
- `reference/support.js` — runtime required to open the two `.dc.html` files in a browser.
- `tokens.css` — production-ready token stylesheet.
- `screenshots/hero-a-light.png`, `screenshots/hero-a-dark.png` — the target hero, both themes.

## Definition of done
1. Hero A only; heroes B/C and the switcher removed.
2. Content 100% driven by the ported config; adding a project touches only that file.
3. Theme persists across reloads with no flash.
4. Nothing overflows at 390px; nothing animates under reduced motion.
5. Lighthouse: 100 accessibility, no layout shift, fonts preloaded.
6. Deploys to GitHub Pages from a build step in CI.
