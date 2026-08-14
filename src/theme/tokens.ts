/**
 * Raw design tokens from "T Broker — Website Mockup Style 1: Corporate
 * Conversion" (docs new/Design.md, 2026-08-06). `tbrokerTheme` (./index.ts)
 * is built from these; anything MUI's theme shape has no slot for
 * (gradients, footer colors, section spacing, breakpoint reference widths)
 * is exposed here directly for consumers who need the raw value.
 */
export const tbrokerTokens = {
  color: {
    primary: "#F47B20",
    primaryDark: "#C8340F",
    text: "#2A2A2A",
    textMuted: "#5A5248",
    /** ~3.8:1 on white — below the 4.5:1 AA threshold for normal-size text. Meta/caption use only, never for text that alone conveys meaning (status, errors). */
    textFaint: "#8A8178",
    /** ~2.5:1 on white — fails WCAG AA even for large text. Decorative/placeholder use only; never for status text or anything meaningful on its own. */
    textFaintLight: "#A9A29A",
    border: "#E7E4DD",
    borderInput: "#DDD8CF",
    background: "#FFFFFF",
    backgroundAltWarm: "#FDF3EA",
    backgroundAltLight: "#FFF8F2",
    success: "#2F6B3D",
    successBg: "#EAF4EC",
    error: "#C8340F",
    errorBg: "#FDF0EC",
    footerBackground: "#3B342C",
    footerText: "#EFE7DC",
    footerTextMuted: "#BDB6AD",
  },
  gradient: {
    primary: "linear-gradient(135deg, #F8A45C 0%, #F47B20 45%, #D4470F 100%)",
    primaryHover: "linear-gradient(135deg, #C8340F 0%, #9A2A08 100%)",
    hero: "linear-gradient(160deg, #FFF5EC 0%, #FDE6D3 100%)",
  },
  typography: {
    fontFamily: '"Sarabun", "Helvetica Neue", Arial, sans-serif',
    weight: { regular: 400, semibold: 600, bold: 700 },
    size: {
      h1: { desktop: 40, mobile: 27 },
      h2: { desktop: 32, mobile: 23 },
      h3: { desktop: 25, mobile: 20 },
      /** Mobile matches desktop — 16px is the minimum readable body size on mobile; only headings scale down. */
      body: { desktop: 16, mobile: 16 },
      meta: { desktop: 13, mobile: 13 },
    },
    bodyLineHeight: 1.85,
  },
  shape: {
    radius: { card: 12, button: 10, badge: 6 },
    shadow: {
      card: "0 2px 8px rgba(0,0,0,.06)",
      hover: "0 6px 18px rgba(0,0,0,.10)",
    },
  },
  motion: {
    /** Micro-interaction durations in ms — hover/focus/pressed state changes. */
    duration: { fast: 120, base: 200, slow: 320 },
    /** Material's standard ease-in-out curve, paired with the durations above. */
    easing: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
  layout: {
    containerMaxWidth: 1200,
    containerPadding: 24,
    sectionPadding: { desktop: "88px 0", mobile: "50px 0" },
    referenceViewport: { desktop: 1440, mobile: 390 },
  },
} as const;

export type TbrokerTokens = typeof tbrokerTokens;
