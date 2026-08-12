import type { Preview } from "@storybook/react-vite";
import React from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { tbrokerTheme } from "../src/theme";
import "../src/styles/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={tbrokerTheme}>
        <CssBaseline />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
