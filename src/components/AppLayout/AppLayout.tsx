import * as React from "react";
import MuiBox from "@mui/material/Box";
import MuiLink from "@mui/material/Link";

export interface AppLayoutProps {
  /** Typically a `<Sidebar />` element. Rendered as-is at the left edge. */
  sidebar: React.ReactNode;
  /** Optional bar above the content, e.g. page title, search, account menu. */
  topbar?: React.ReactNode;
  children: React.ReactNode;
}

const MAIN_CONTENT_ID = "tbroker-app-layout-main";

/**
 * Tbroker's page shell: a fixed sidebar alongside a scrollable content
 * column with an optional topbar. Use with `Sidebar` for the nav drawer.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ sidebar, topbar, children }) => (
  <MuiBox sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
    <MuiLink
      href={`#${MAIN_CONTENT_ID}`}
      sx={{
        position: "absolute",
        left: -9999,
        top: 16,
        zIndex: (theme) => theme.zIndex.tooltip + 1,
        p: 1.5,
        bgcolor: "background.paper",
        borderRadius: 1,
        boxShadow: 3,
        "&:focus": { left: 16 },
      }}
    >
      Skip to content
    </MuiLink>
    {sidebar}
    <MuiBox
      component="main"
      id={MAIN_CONTENT_ID}
      tabIndex={-1}
      sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}
    >
      {topbar ? (
        <MuiBox
          sx={{
            display: "flex",
            alignItems: "center",
            minHeight: 64,
            px: 3,
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          {topbar}
        </MuiBox>
      ) : null}
      <MuiBox sx={{ flex: 1, overflow: "auto", p: 3 }}>{children}</MuiBox>
    </MuiBox>
  </MuiBox>
);

AppLayout.displayName = "AppLayout";
