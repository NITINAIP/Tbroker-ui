import { createTheme } from "@mui/material/styles";
import { tbrokerTokens } from "./tokens";

export { tbrokerTokens } from "./tokens";
export type { TbrokerTokens } from "./tokens";

declare module "@mui/material/styles" {
  interface Palette {
    bull: Palette["success"];
    bear: Palette["error"];
  }
  interface PaletteOptions {
    bull?: PaletteOptions["success"];
    bear?: PaletteOptions["error"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    bull: true;
    bear: true;
  }
}

declare module "@mui/material/Chip" {
  interface ChipPropsColorOverrides {
    bull: true;
    bear: true;
  }
}

const { color, typography: type, shape, layout, motion } = tbrokerTokens;

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: color.primary,
      dark: color.primaryDark,
      contrastText: "#ffffff",
    },
    secondary: {
      main: color.primaryDark,
      contrastText: "#ffffff",
    },
    error: {
      main: color.error,
    },
    success: {
      main: color.success,
    },
    warning: {
      main: "#f79009",
    },
    bull: {
      main: color.success,
      contrastText: "#ffffff",
    },
    bear: {
      main: color.error,
      contrastText: "#ffffff",
    },
    divider: color.border,
    background: {
      default: color.background,
      paper: color.background,
    },
    text: {
      primary: color.text,
      secondary: color.textMuted,
      disabled: color.textFaint,
    },
  },
  shape: {
    borderRadius: shape.radius.card,
  },
  typography: {
    fontFamily: type.fontFamily,
    h1: { fontWeight: type.weight.bold, fontSize: `${type.size.h1.desktop}px`, lineHeight: 1.2, textWrap: "pretty" },
    h2: { fontWeight: type.weight.bold, fontSize: `${type.size.h2.desktop}px`, lineHeight: 1.25, textWrap: "pretty" },
    h3: { fontWeight: type.weight.semibold, fontSize: `${type.size.h3.desktop}px`, lineHeight: 1.3, textWrap: "pretty" },
    body1: { fontSize: `${type.size.body.desktop}px`, lineHeight: type.bodyLineHeight },
    body2: { fontSize: `${type.size.body.desktop - 1}px`, lineHeight: type.bodyLineHeight },
    caption: { fontSize: `${type.size.meta.desktop}px`, color: color.textFaint },
    button: { textTransform: "none", fontWeight: type.weight.semibold },
  },
});

// Desktop sizes above are the theme defaults; scale down under the `sm`
// breakpoint to match the mockup's mobile sizes (390px reference viewport).
theme.typography.h1 = {
  ...theme.typography.h1,
  [theme.breakpoints.down("sm")]: { fontSize: `${type.size.h1.mobile}px` },
};
theme.typography.h2 = {
  ...theme.typography.h2,
  [theme.breakpoints.down("sm")]: { fontSize: `${type.size.h2.mobile}px` },
};
theme.typography.h3 = {
  ...theme.typography.h3,
  [theme.breakpoints.down("sm")]: { fontSize: `${type.size.h3.mobile}px` },
};
theme.typography.body1 = {
  ...theme.typography.body1,
  [theme.breakpoints.down("sm")]: { fontSize: `${type.size.body.mobile}px` },
};
theme.typography.body2 = {
  ...theme.typography.body2,
  [theme.breakpoints.down("sm")]: { fontSize: `${type.size.body.mobile - 1}px` },
};

theme.components = {
  ...theme.components,
  MuiButton: {
    defaultProps: { disableElevation: true },
    styleOverrides: {
      root: {
        borderRadius: shape.radius.button,
        transition: `background-color ${motion.duration.base}ms ${motion.easing}, box-shadow ${motion.duration.base}ms ${motion.easing}`,
      },
    },
    variants: [
      {
        props: { variant: "contained", color: "primary" },
        style: {
          backgroundColor: color.primary,
          "&:hover": {
            backgroundColor: color.primaryDark,
            boxShadow: shape.shadow.hover,
          },
        },
      },
    ],
  },
  MuiCard: {
    styleOverrides: {
      root: { borderRadius: shape.radius.card, boxShadow: shape.shadow.card },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: shape.radius.badge },
    },
  },
  MuiOutlinedInput: {
    styleOverrides: {
      notchedOutline: { borderColor: color.borderInput },
    },
  },
  MuiAlert: {
    variants: [
      {
        props: { variant: "standard", severity: "success" },
        style: { backgroundColor: color.successBg, color: color.success },
      },
      {
        props: { variant: "standard", severity: "error" },
        style: { backgroundColor: color.errorBg, color: color.error },
      },
    ],
  },
  // MUI's default `lg` breakpoint is already 1200px, matching the design's
  // container max-width, so only the side padding needs overriding.
  MuiContainer: {
    styleOverrides: {
      root: {
        paddingLeft: layout.containerPadding,
        paddingRight: layout.containerPadding,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: { fontWeight: type.weight.semibold },
    },
  },
};

export const tbrokerTheme = theme;
