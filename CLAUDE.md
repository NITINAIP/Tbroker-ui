# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@tbroker/ui` — Tbroker's shared React component library, built on **MUI v9** and styled with **Tailwind CSS v4** for layout utilities only. It publishes as an npm package (ESM + CJS + type declarations + a single CSS file) and documents itself via Storybook, auto-deployed to GitHub Pages from `main`.

## Commands

```bash
npm install              # install dependencies
npm run dev               # Storybook dev server at http://localhost:6006 (alias: npm run storybook)
npm run typecheck         # tsc -p tsconfig.build.json --noEmit
npm run build             # typecheck + vite build -> dist/ (ESM, CJS, .d.ts, tbroker-ui.css)
npm run build-storybook   # static Storybook site -> storybook-static/
```

There is no test suite and no lint script configured — `typecheck` + `build` (+ `build-storybook`) is what CI runs and is the bar for a change to be considered good. There is no single-test-runner command since there are no tests.

CI (`.github/workflows/ci.yml`) runs `typecheck`, `build`, and `build-storybook` on every push/PR to non-`main` branches. `deploy-storybook.yml` runs the same build on push to `main` and publishes `storybook-static/` to GitHub Pages.

## Architecture

**Component convention** — every component lives in `src/components/<Name>/` as three files, and this pattern is expected for any new component:
- `<Name>.tsx` — implementation
- `<Name>.stories.tsx` — Storybook stories (excluded from the type-declaration build via `vite.config.ts`)
- `index.ts` — barrel re-export

All components are then re-exported from `src/index.ts` alongside `tbrokerTheme` and `tbrokerTokens`. **Any new component or exported type must be added to `src/index.ts`** or it isn't part of the public package API.

**MUI wrapper pattern** — most components are thin wrappers around an MUI primitive (e.g. `Input` wraps `MuiTextField`, `Button` wraps `MuiButton`), forwarding refs and re-exporting/extending the MUI props type rather than redefining it. Trading-domain semantics are layered on top via a `tone` prop (`"bull" | "bear"`, mapped to buy/sell colors) instead of MUI's generic `color`, e.g. `Button`'s `tone` overrides `color` before passing through to `MuiButton`. Follow this pattern (extend `Mui*Props`, forward `ref`, set `displayName`) for new components rather than building from scratch.

**Shared layout primitive** — `FormField` (`src/components/FormField/`) is the label/control layout wrapper used internally by `Input`, `Select`, and `Autocomplete` for their `layout="block"` (label above) / `"inline"` (label beside) behavior. Reuse it for any new field-style component instead of duplicating label/helperText/error layout.

**Theming pipeline** (`src/theme/`):
- `tokens.ts` — raw design tokens (colors, gradients, type scale, spacing/shape) exported as `tbrokerTokens`. Source of truth is the mockup spec summarized in `design.md`.
- `index.ts` — compiles `tbrokerTokens` into an MUI theme (`createTheme`), exported as `tbrokerTheme`. This is also where MUI's module augmentation lives (adding the `bull`/`bear` palette entries and their `ButtonPropsColorOverrides`/`ChipPropsColorOverrides`), and where component-level style overrides/variants (e.g. the primary gradient on contained buttons, card shadow/radius, alert severity backgrounds, container padding) are defined.
- Not every token has an MUI palette/theme slot (e.g. the second "faint" text tone, alt section backgrounds, hero gradient, footer colors, section padding). When there's no slot, read the raw value from `tbrokerTokens` directly and apply it via `sx`. **`design.md` documents the full token list and, in its "Mapping to code" table, exactly where each token does or doesn't have a home in `tbrokerTheme`** — consult it before adding a new token or theme override.
- Sarabun (the theme's font family) is **not bundled** with the package; consumers must load it themselves (Storybook does so via `.storybook/preview-head.html`).

**Tailwind's role is intentionally narrow**: `src/styles/tailwind.css` scopes Tailwind to layout/spacing utilities (flex, grid, gap, padding, margin) because MUI injects its own Emotion-based styles that are unaware of Tailwind's cascade layers. MUI owns component look & feel — don't reach for Tailwind utilities to style component internals (colors, borders, shadows, typography); use the theme/tokens instead.

**Build target**: `vite.config.ts` builds `src/index.ts` in library mode to ESM + CJS, with `react`, `react-dom`, `@mui/material`, `@emotion/react`, `@emotion/styled` externalized as peer dependencies (not bundled). All component CSS is emitted as a single `tbroker-ui.css` (`cssCodeSplit: false`), exposed via the package's `./styles.css` export — consumers must import it explicitly (see README's Usage section).
