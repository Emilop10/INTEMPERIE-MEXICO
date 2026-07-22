# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/intemperie-mexico/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

> **Status:** Approved direction (v3, motion) — checkpoint-confirmed by the client in chat.
> This replaces the tool's first `--design-system` auto-match (Vibrant & Block-based / EB Garamond+Lato),
> which was reviewed and rejected as a poor fit for this catalog. The rules below were synthesized by hand
> from targeted `--domain style/color/typography` searches plus explicit client direction ("estilo Apple,
> enfocado al outdoor, con mucho movimiento en pantalla"), not a single literal database match.

---

**Project:** Intemperie México
**Updated:** 2026-07-22
**Category:** E-commerce (outdoor/tactical retail — fishing, optics, air rifle ammo, air rifles/pistols)

---

## Direction

Apple-style minimalism applied to an outdoor/technical retail catalog: generous white space, one
type family carrying both display and body roles at varying weight/size (not a mixed display+body
pairing), a single contained accent color, and confident full-viewport motion on scroll — large
"kinetic" statement text that resolves from blurred/scaled-down to sharp/full-size as it centers in
the viewport, plus staggered reveal-on-scroll for product cards. No tactical/HUD/reticle motifs, no
multi-color badges, no SKU or stock-count clutter on marketing surfaces.

**Do not mention** that inventory is currently shared with the physical Alcampo Cuernavaca store —
this is a temporary operational arrangement, not part of the brand story. Copy should never reference
"misma tienda física" or similar; frame everything around product selection/verification instead.

## Global Rules

### Color Palette

| Role | Light | Dark | CSS Variable |
|------|-------|------|--------------|
| Background | `#FBFBFD` | `#000000` | `--bg` |
| Surface | `#FFFFFF` | `#1C1C1E` | `--surface` |
| Surface (secondary) | `#F5F5F7` | `#2C2C2E` | `--surface-2` |
| Foreground | `#1D1D1F` | `#F5F5F7` | `--fg` |
| Foreground (muted) | `#6E6E73` | `#98989D` | `--fg-muted` |
| Border | `#D2D2D7` | `#38383A` | `--border` |
| Accent — Bosque (forest green) | `#234D3B` | `#57B58A` | `--accent` |
| On Accent | `#FFFFFF` | `#06120D` | `--accent-fg` |
| Nav background (blurred) | `rgba(251,251,253,0.75)` | `rgba(0,0,0,0.65)` | `--nav-bg` |
| Hero background | `#F5F5F7` | `#111113` | `--hero-bg` |

Single accent only — do not introduce a second "urgency" color (no orange/red CTA). Semantic states
(destructive/error) may use a separate red, kept out of marketing surfaces.

Both themes must be implemented: `@media (prefers-color-scheme: dark)` as the default signal, plus
`:root[data-theme="dark"]` / `:root[data-theme="light"]` overrides for the manual toggle.

### Typography

- **All roles (display + body):** Instrument Sans — weight 400/500 body, 600–800 for headings/display.
  One family, varying weight/size/tracking, in the Apple tradition — do not introduce a second display
  face.
- **Italic:** Instrument Sans Italic, used sparingly for emphasis within body copy.
- **Data/mono role (prices, specs):** Geist Mono — used only for numeric/price values, never for
  headings or body prose.
- **Mood:** confident, quiet, minimal — no legal/traditional serif pairing (the tool's auto-match of
  EB Garamond + Lato was rejected for this reason).

Google Fonts equivalents (the live build uses the locally embedded `.ttf` files from
`.claude/skills/ui-styling/canvas-fonts/`, not a CDN import — Shopify theme assets should bundle these
as local font files, same as the artifact mockups did):
- Instrument Sans: https://fonts.googleapis.com/css2?family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap
- Geist Mono: not on Google Fonts — bundle the local `.ttf` as a theme asset.

Type scale (approx, desktop):
- Hero H1: `clamp(40px, 6.4vw, 76px)`, weight 600, letter-spacing `-0.03em`, line-height `1.03`
- Kinetic statement text: `clamp(32px, 6vw, 68px)`, weight 600, letter-spacing `-0.025em`
- Chapter H2: `clamp(28px, 4vw, 44px)`, weight 600, letter-spacing `-0.02em`
- Body: `16–19px`, line-height `1.55–1.6`
- Eyebrow/label: `12px`, weight 600, uppercase, letter-spacing `0.12em`

### Spacing & Shape

- Section padding: generous — `56–90px` vertical between blocks, `82–92vh` min-height for hero and
  kinetic statement sections.
- Border radius: `14–24px` on cards and hero panels, `980px` (pill) on buttons and chips — Apple's
  continuous-corner language, not `rounded-lg`-everywhere defaults.
- Product grid: 3–4 columns desktop, 2 columns mobile, `18–22px` gap.

### Motion

- **Hero:** content fades + translates up on load (`opacity/translateY`, ~1s `cubic-bezier(.16,1,.3,1)`);
  background has a slow ambient gradient drift (~22s loop), not a static flat fill.
- **Kinetic statement blocks:** scroll-scrubbed (not just on/off) — interpolate blur (`10px → 0`),
  opacity (`0 → 1`), and scale (`0.9 → 1`) continuously based on distance from viewport center as the
  user scrolls, via a `--kp` (0–1) custom property read in `requestAnimationFrame`.
- **Chapter reveals:** `IntersectionObserver`-driven fade+translateY on chapter headings and category
  chip collages; product cards reveal staggered (~90ms delay increments) with a slight scale-in.
- **Micro-interactions:** buttons scale ~1.035 on hover; product card media scales ~1.03–1.06 on hover;
  link arrows (`→`) nudge right on hover. Keep durations in the 150–500ms range with
  `cubic-bezier(.16,1,.3,1)` easing.
- **Always respect `prefers-reduced-motion: reduce`** — disable the ambient background animation and
  scroll-scrubbing, and show all reveal states as already-visible/final.

### Navigation

- Sticky header, transparent over the hero, gains a blurred background (`backdrop-filter: blur(20px)`)
  and a bottom border once scrolled past ~40px.
- Plain text nav links (no numbering, no monospace index badges — that was part of the earlier
  "tactical HUD" direction and was dropped in favor of Apple's plainer nav).
- Active/current section indicated by a small dot beneath the label, not an underline bar.

### Product Cards (marketing/grid context)

- Image (large, `border-radius: 20–22px`), category label (small, muted), product title (15px, weight
  600), price only — in Geist Mono. **No SKU, no stock-count badges, no vendor tags** on grid cards;
  that level of detail belongs on the PDP, not the browse grid.

---

## Anti-Patterns (Do NOT Use)

- ❌ Tactical/HUD/reticle chrome — corner brackets, scanning-line motifs, monospace index numbers in nav
  (this was an earlier direction, explicitly superseded)
- ❌ Second "urgency" accent color (orange/red CTA) — one accent only
- ❌ Mixed display+body font pairing — Instrument Sans carries both roles
- ❌ SKU/stock badges cluttering marketing product cards
- ❌ Any copy referencing the physical Alcampo Cuernavaca store or shared-inventory arrangement
- ❌ Emojis as icons — use SVG
- ❌ Binary on/off scroll reveals where a scrubbed/continuous effect better fits the Apple feel
  (specifically: kinetic statement text)
- ❌ Ignoring `prefers-reduced-motion`

## Pre-Delivery Checklist

- [ ] No emojis used as icons (SVG only)
- [ ] `cursor: pointer` on all clickable elements
- [ ] Hover/focus states with smooth transitions (150–500ms)
- [ ] Light mode text contrast ≥ 4.5:1; dark mode re-checked independently (not just inverted)
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected everywhere motion is used
- [ ] Responsive: 375px, 768px, 1024px, 1440px — no horizontal scroll
- [ ] Both `@media (prefers-color-scheme)` and `data-theme` overrides implemented, not just one
- [ ] No mention of the physical store / shared inventory anywhere in copy
- [ ] Product cards on grids show image + category + title + price only
