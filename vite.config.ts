import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

const externalPackages = [
  "react",
  "react-dom",
  "@mui/material",
  "@mui/icons-material",
  "@emotion/react",
  "@emotion/styled",
];
const isExternal = (id: string) => externalPackages.some((pkg) => id === pkg || id.startsWith(`${pkg}/`));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      include: ["src"],
      exclude: ["src/**/*.stories.tsx"],
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: new URL("src/index.ts", import.meta.url).pathname,
      name: "TbrokerUI",
      fileName: (format) => `tbroker-ui.${format === "es" ? "js" : "cjs"}`,
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: isExternal,
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "@mui/material": "MaterialUI",
        },
        assetFileNames: (assetInfo) =>
          assetInfo.names?.[0]?.endsWith(".css") ? "tbroker-ui.css" : "assets/[name]-[hash][extname]",
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
