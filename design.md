# Design Tokens

Source: `docs new/Design.md` (mockup deliverable, "T Broker — Website Mockup Style 1: Corporate Conversion", updated 2026-08-06). Only the tokens below are treated as settled — the mockup's page-by-page behavior (routes, forms, tools list, etc.) is reference material for whoever builds each page, not locked-in scope.

Implemented in `src/theme/tokens.ts` (raw values, exported as `tbrokerTokens`) and compiled into an MUI theme in `src/theme/index.ts` (exported as `tbrokerTheme`).

## Colors

| Token | Value | Used for |
|---|---|---|
| Primary | `#F47B20` | Primary buttons, icons, accent lines, active dots |
| Primary Dark | `#C8340F` | Emphasis text, badges, primary button hover |
| Primary gradient | `linear-gradient(135deg,#F8A45C 0%,#F47B20 45%,#D4470F 100%)` | All CTA buttons |
| Primary gradient hover | `linear-gradient(135deg,#C8340F 0%,#9A2A08 100%)` | CTA button hover |
| Text | `#2A2A2A` | Headings and body text |
| Text muted | `#5A5248` | Descriptions |
| Text faint | `#8A8178` / `#A9A29A` | Breadcrumb, meta, placeholder |
| Border | `#E7E4DD` (`#DDD8CF` for inputs) | General borders |
| ⚠️ Contrast note | — | `Text faint` (~3.8:1 on white) and `Text faint` light variant (~2.5:1 on white) both fall short of WCAG AA (4.5:1) for normal text. Fine for decorative/meta use; never use either as the sole carrier of status, error, or license-verification meaning — pair with color/icon redundancy or use `Text muted`/`Error`/`Success` instead. |
| Background | `#FFFFFF` | Page background |
| Background alt | `#FDF3EA` · `#FFF8F2` | Alternating section backgrounds |
| Hero gradient | `linear-gradient(160deg,#FFF5EC 0%,#FDE6D3 100%)` | All hero sections |
| Footer | `#3B342C` bg (text `#EFE7DC` / `#BDB6AD`) | Footer |
| Success | `#2F6B3D` on `#EAF4EC` | Success states / valid license |
| Error | `#C8340F` on `#FDF0EC` | Form errors |

## Typography

- Font: **Sarabun**, weights 400/600/700, for both headings and body
- Desktop sizes: h1 40px · h2 32px · h3 25px · body 15–17px · meta 12.5–13.5px
- Mobile sizes: h1 27px · h2 23px · h3 20px · body 14–15px
- Body line-height: 1.75–1.95 · `text-wrap: pretty` for long headings

## Spacing & Shape

- Container `max-width: 1200px`, side padding 24px
- Section padding: desktop `88px 0` · mobile `50px 0`
- Radius: cards 10–12px · buttons 9–10px · badges 6px
- Shadow: card `0 2px 8px rgba(0,0,0,.06)`; news card hover `0 6px 18px rgba(0,0,0,.10)`
- Breakpoints: desktop 1440px / mobile 390px

## Layout primitives

Reference only — not built as components yet:

- **Utility bar** (desktop only): Call Center left · Verify Broker / FAQ / Contact right
- **Navbar**: logo · 6 nav items (Home, Register as Broker, Products, Broker Tools, News & Events, About) · Login + Register buttons · active item gets an orange underline · collapses to hamburger + register button on mobile
- **Footer**: address + Call Center with extensions + LINE QR + 4 policy links

## Mapping to code

| Token | Where it lives | Notes |
|---|---|---|
| Primary / Primary Dark | `tbrokerTheme.palette.primary.main` / `.dark` | |
| Primary gradient / hover | `MuiButton` `variants` (contained + primary) in `theme/index.ts` | Applies automatically to `<Button>` (default `variant="contained"`, no `tone`) |
| Text / Text muted / Text faint | `palette.text.primary` / `.secondary` / `.disabled` | The second faint tone (`#A9A29A`) has no MUI slot — read it from `tbrokerTokens.color.textFaintLight` |
| Border / input border | `palette.divider` / `MuiOutlinedInput` `notchedOutline` override | |
| Background / alt backgrounds | `palette.background.default/.paper` / `tbrokerTokens.color.backgroundAltWarm` `.backgroundAltLight` | Alt backgrounds have no MUI palette slot; use the raw token for section stripes |
| Hero gradient | `tbrokerTokens.gradient.hero` | No MUI component for hero sections yet — apply as a raw `sx={{ background: tbrokerTokens.gradient.hero }}` |
| Footer colors | `tbrokerTokens.color.footerBackground` `.footerText` `.footerTextMuted` | No `Footer` component yet |
| Success / Error | `palette.success.main` / `palette.error.main`, plus `MuiAlert` `variants` for the tinted backgrounds | `Alert severity="success"` / `"error"` renders the exact bg+fg pair from the spec |
| Font family / weights | `typography.fontFamily`, `typography.button.fontWeight`, etc. | Sarabun is **not bundled** — load it yourself, e.g. `<link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700&display=swap" rel="stylesheet">`, or self-host. Storybook loads it via `.storybook/preview-head.html`. |
| Desktop/mobile type sizes | `typography.h1/h2/h3/body1/body2`, scaled down under `theme.breakpoints.down("sm")` (600px) | The spec's 390px mobile reference is treated as "below `sm`" rather than a custom breakpoint, so the shared component kit keeps MUI's standard breakpoint values |
| Container max-width / padding | `MuiContainer` override in `theme/index.ts` | MUI's default `lg` breakpoint is already 1200px, matching the spec exactly — only the 24px side padding needed overriding |
| Section padding | `tbrokerTokens.layout.sectionPadding` | No page-section component yet; apply directly where a page builds its own sections |
| Radius (card/button/badge) | `shape.borderRadius` (card, theme base) + `MuiButton`/`MuiChip` overrides | |
| Shadows | `MuiCard` override (`shape.shadow.card`); `shape.shadow.hover` exported for hover states not yet wired to a component | |
