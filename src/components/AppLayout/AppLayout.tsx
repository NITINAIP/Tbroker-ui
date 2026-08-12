import * as React from "react";
import MuiBox from "@mui/material/Box";

export interface AppLayoutProps {
  /** Typically a `<Sidebar />` element. Rendered as-is at the left edge. */
  sidebar: React.ReactNode;
  /** Optional bar above the content, e.g. page title, search, account menu. */
  topbar?: React.ReactNode;
  children: React.ReactNode;
}

/**
 * Tbroker's page shell: a fixed sidebar alongside a scrollable content
 * column with an optional topbar. Use with `Sidebar` for the nav drawer.
 */
export const AppLayout: React.FC<AppLayoutProps> = ({ sidebar, topbar, children }) => (
  <MuiBox sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
    {sidebar}
    <MuiBox component="main" sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
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
