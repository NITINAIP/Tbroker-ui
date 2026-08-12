# @tbroker/ui

Tbroker's shared UI component set — built on [MUI v9](https://mui.com/) and styled with [Tailwind CSS v4](https://tailwindcss.com/) for layout utilities.

Live component docs: **Storybook**, deployed automatically to GitHub Pages from `main` (see [Deployment](#deployment)).

## Stack

- **React 19** + **TypeScript**
- **MUI v9** (`@mui/material`, Emotion) — component primitives, theming
- **Tailwind CSS v4** (`@tailwindcss/vite`) — layout/spacing utilities only; MUI owns component look & feel (see [`src/styles/tailwind.css`](./src/styles/tailwind.css))
- **Vite** (library mode) — package build, with `vite-plugin-dts` for type declarations
- **Storybook** — component catalog and visual docs

## Components

| Component | Description |
| --- | --- |
| `Button` | Action button with `bull`/`bear` tone shortcuts for buy/sell actions |
| `Input` | Text field (outlined, small by default) |
| `Select` | Dropdown built from an `options` array |
| `Card` | Surface container with optional title/subheader/action header |
| `Modal` | Dialog with title bar, close button, and actions row |
| `Table` | Generic, column-driven data table |
| `Badge` | Status chip with `bull`/`bear`/`neutral`/`warning` states |
| `Tabs` | Tab strip with built-in panel rendering |
| `Alert` | Inline alert/banner with optional title |
| `Sidebar` | Collapsible nav drawer with grouped items, badges, header/footer slots |
| `AppLayout` | Page shell composing a sidebar, optional topbar, and scrollable content |

All components are re-exported from the package root, along with `tbrokerTheme` (an MUI theme preconfigured with Tbroker's palette and typography).

## Installation

```bash
npm install @tbroker/ui @mui/material @emotion/react @emotion/styled react react-dom
```

`@mui/material`, `@emotion/react`, `@emotion/styled`, `react`, and `react-dom` are peer dependencies — install them alongside the package.

## Usage

```tsx
import { ThemeProvider, CssBaseline } from "@mui/material";
import { tbrokerTheme, Button, Card, Badge } from "@tbroker/ui";
import "@tbroker/ui/styles.css";

export function App() {
  return (
    <ThemeProvider theme={tbrokerTheme}>
      <CssBaseline />
      <Card title="AAPL">
        <Badge status="bull" label="+1.82%" />
        <Button tone="bull">Buy</Button>
      </Card>
    </ThemeProvider>
  );
}
```

## Development

```bash
npm install       # install dependencies
npm run dev       # start Storybook at http://localhost:6006
```

Each component lives under `src/components/<Name>/` with its implementation (`<Name>.tsx`), its Storybook stories (`<Name>.stories.tsx`), and a barrel export (`index.ts`).

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` / `npm run storybook` | Run Storybook locally |
| `npm run typecheck` | Type-check the library source |
| `npm run build` | Build the distributable package (`dist/`) |
| `npm run build-storybook` | Build the static Storybook site (`storybook-static/`) |

## Deployment

Two GitHub Actions workflows are included:

- **`ci.yml`** — runs typecheck + library build + Storybook build on every push/PR to branches other than `main`.
- **`deploy-storybook.yml`** — on push to `main`, builds Storybook and publishes it to **GitHub Pages** via `actions/deploy-pages`.

To enable Pages deployment on this repo: **Settings → Pages → Source → GitHub Actions**. Once enabled, merging to `main` publishes the latest component docs automatically.

## Publishing the package

The package builds to `dist/` (ESM + CJS + type declarations + a single CSS file) via `npm run build`. Publish with `npm publish` once you've configured a registry/scope for the `@tbroker` npm org.
