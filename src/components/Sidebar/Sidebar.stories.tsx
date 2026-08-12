import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Sidebar, type SidebarNavGroup } from "./Sidebar";

const groups: SidebarNavGroup[] = [
  {
    key: "trading",
    title: "Trading",
    items: [
      { key: "dashboard", label: "Dashboard", icon: "📊" },
      { key: "watchlist", label: "Watchlist", icon: "⭐" },
      { key: "orders", label: "Orders", icon: "🧾", badge: 3 },
      { key: "positions", label: "Positions", icon: "📈" },
    ],
  },
  {
    key: "account",
    title: "Account",
    items: [
      { key: "wallet", label: "Wallet", icon: "💳" },
      { key: "settings", label: "Settings", icon: "⚙️" },
      { key: "support", label: "Support", icon: "💬", disabled: true },
    ],
  },
];

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
  args: {
    groups,
    activeKey: "dashboard",
    header: (
      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
        Tbroker
      </Typography>
    ),
    footer: (
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
        <Box sx={{ minWidth: 0 }}>
          <Typography variant="body2" noWrap>
            Nitinai K.
          </Typography>
          <Typography variant="caption" color="text.secondary" noWrap>
            Premium account
          </Typography>
        </Box>
      </Box>
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

function SidebarDemo() {
  const [activeKey, setActiveKey] = React.useState("dashboard");
  const [collapsed, setCollapsed] = React.useState(false);

  const interactiveGroups = groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item, onClick: () => setActiveKey(item.key) })),
  }));

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Sidebar
        groups={interactiveGroups}
        activeKey={activeKey}
        collapsed={collapsed}
        onCollapsedChange={setCollapsed}
        header={
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            Tbroker
          </Typography>
        }
        footer={
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Avatar sx={{ width: 32, height: 32 }}>N</Avatar>
            {!collapsed ? (
              <Box sx={{ minWidth: 0 }}>
                <Typography variant="body2" noWrap>
                  Nitinai K.
                </Typography>
                <Typography variant="caption" color="text.secondary" noWrap>
                  Premium account
                </Typography>
              </Box>
            ) : null}
          </Box>
        }
      />
      <Box sx={{ flex: 1, p: 3 }}>
        <Typography variant="h6">Active: {activeKey}</Typography>
      </Box>
    </Box>
  );
}

export const Default: Story = {
  render: () => <SidebarDemo />,
};

export const Collapsed: Story = {
  render: () => {
    const [activeKey, setActiveKey] = React.useState("dashboard");
    const interactiveGroups = groups.map((group) => ({
      ...group,
      items: group.items.map((item) => ({ ...item, onClick: () => setActiveKey(item.key) })),
    }));
    return (
      <Box sx={{ display: "flex", height: "100vh" }}>
        <Sidebar groups={interactiveGroups} activeKey={activeKey} collapsed />
        <Box sx={{ flex: 1, p: 3 }}>
          <Typography variant="h6">Active: {activeKey}</Typography>
        </Box>
      </Box>
    );
  },
};
