import * as React from "react";
import MuiBadge from "@mui/material/Badge";
import MuiBox from "@mui/material/Box";
import MuiDivider from "@mui/material/Divider";
import MuiDrawer from "@mui/material/Drawer";
import MuiIconButton from "@mui/material/IconButton";
import MuiList from "@mui/material/List";
import MuiListItemButton from "@mui/material/ListItemButton";
import MuiListItemIcon from "@mui/material/ListItemIcon";
import MuiListItemText from "@mui/material/ListItemText";
import MuiTooltip from "@mui/material/Tooltip";
import MuiTypography from "@mui/material/Typography";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export interface SidebarNavItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

export interface SidebarNavGroup {
  key: string;
  title?: string;
  items: SidebarNavItem[];
}

export interface SidebarProps {
  groups: SidebarNavGroup[];
  activeKey: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
  width?: number;
  collapsedWidth?: number;
}

const DEFAULT_WIDTH = 248;
const DEFAULT_COLLAPSED_WIDTH = 72;

/**
 * Tbroker's app navigation drawer: grouped nav items with optional icons,
 * badges (e.g. unread alerts), a header (brand/logo) and footer (account)
 * slot, and an optional collapse-to-icons mode.
 */
export const Sidebar: React.FC<SidebarProps> = ({
  groups,
  activeKey,
  header,
  footer,
  collapsed = false,
  onCollapsedChange,
  width = DEFAULT_WIDTH,
  collapsedWidth = DEFAULT_COLLAPSED_WIDTH,
}) => {
  const currentWidth = collapsed ? collapsedWidth : width;

  return (
    <MuiDrawer
      variant="permanent"
      sx={{
        width: currentWidth,
        flexShrink: 0,
        whiteSpace: "nowrap",
        transition: (theme) => theme.transitions.create("width", { duration: theme.transitions.duration.shortest }),
        "& .MuiDrawer-paper": {
          width: currentWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          borderRight: "1px solid",
          borderColor: "divider",
          transition: (theme) => theme.transitions.create("width", { duration: theme.transitions.duration.shortest }),
        },
      }}
    >
      <MuiBox
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          minHeight: 64,
          px: collapsed ? 0 : 2,
        }}
      >
        {!collapsed ? header : null}
        {onCollapsedChange ? (
          <MuiIconButton
            size="small"
            onClick={() => onCollapsedChange(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRightIcon fontSize="small" /> : <ChevronLeftIcon fontSize="small" />}
          </MuiIconButton>
        ) : null}
      </MuiBox>
      <MuiDivider />
      <MuiBox sx={{ flex: 1, overflowY: "auto", overscrollBehavior: "contain", py: 1 }}>
        {groups.map((group) => (
          <MuiBox key={group.key} sx={{ mb: 1 }}>
            {group.title && !collapsed ? (
              <MuiTypography variant="overline" sx={{ display: "block", px: 2, py: 1, color: "text.secondary" }}>
                {group.title}
              </MuiTypography>
            ) : null}
            <MuiList disablePadding>
              {group.items.map((item) => {
                const icon = item.badge ? (
                  <MuiBadge badgeContent={item.badge} color="error">
                    {item.icon}
                  </MuiBadge>
                ) : (
                  item.icon
                );

                const button = (
                  <MuiListItemButton
                    key={item.key}
                    selected={item.key === activeKey}
                    disabled={item.disabled}
                    onClick={item.onClick}
                    aria-label={collapsed ? item.label : undefined}
                    sx={{ mx: 1, borderRadius: 1, justifyContent: collapsed ? "center" : "flex-start" }}
                  >
                    {item.icon ? (
                      <MuiListItemIcon sx={{ minWidth: collapsed ? "auto" : 40, justifyContent: "center" }}>
                        {icon}
                      </MuiListItemIcon>
                    ) : null}
                    {!collapsed ? <MuiListItemText primary={item.label} /> : null}
                  </MuiListItemButton>
                );

                return collapsed ? (
                  <MuiTooltip key={item.key} title={item.label} placement="right">
                    <span>{button}</span>
                  </MuiTooltip>
                ) : (
                  button
                );
              })}
            </MuiList>
          </MuiBox>
        ))}
      </MuiBox>
      {footer ? (
        <>
          <MuiDivider />
          <MuiBox sx={{ p: collapsed ? 1 : 2 }}>{footer}</MuiBox>
        </>
      ) : null}
    </MuiDrawer>
  );
};

Sidebar.displayName = "Sidebar";
