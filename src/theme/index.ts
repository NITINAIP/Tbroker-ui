import { createTheme } from "@mui/material/styles";

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

export const tbrokerTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a56db",
      dark: "#0b1f3a",
      light: "#5b8def",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#0f9d8c",
      contrastText: "#ffffff",
    },
    error: {
      main: "#d92d20",
    },
    warning: {
      main: "#f79009",
    },
    success: {
      main: "#0f9d8c",
    },
    bull: {
      main: "#0f9d8c",
      contrastText: "#ffffff",
    },
    bear: {
      main: "#d92d20",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Helvetica Neue",
      "Arial",
      "sans-serif",
    ].join(","),
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
        },
      },
    },
  },
});
