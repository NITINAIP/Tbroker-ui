import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppLayout } from "./AppLayout";
import { Sidebar, type SidebarNavGroup } from "../Sidebar/Sidebar";
import { Card } from "../Card/Card";
import { Badge } from "../Badge/Badge";
import { Input } from "../Input/Input";

const groups: SidebarNavGroup[] = [
  {
    key: "trading",
    title: "Trading",
    items: [
      { key: "dashboard", label: "Dashboard", icon: "📊" },
      { key: "watchlist", label: "Watchlist", icon: "⭐" },
      { key: "orders", label: "Orders", icon: "🧾", badge: 3 },
    ],
  },
  {
    key: "account",
    title: "Account",
    items: [
      { key: "wallet", label: "Wallet", icon: "💳" },
      { key: "settings", label: "Settings", icon: "⚙️" },
    ],
  },
];

const meta: Meta<typeof AppLayout> = {
  title: "Components/AppLayout",
  component: AppLayout,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof AppLayout>;

function DashboardDemo() {
  const [activeKey, setActiveKey] = React.useState("dashboard");
  const interactiveGroups = groups.map((group) => ({
    ...group,
    items: group.items.map((item) => ({ ...item, onClick: () => setActiveKey(item.key) })),
  }));

  return (
    <AppLayout
      sidebar={
        <Sidebar
          groups={interactiveGroups}
          activeKey={activeKey}
          header={
            <Typography variant="subtitle1" fontWeight={700}>
              Tbroker
            </Typography>
          }
        />
      }
      topbar={
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: "100%" }}>
          <Typography variant="h6">Dashboard</Typography>
          <Input placeholder="Search symbol…" size="small" sx={{ width: 240 }} />
        </Stack>
      }
    >
      <Stack spacing={2}>
        <Stack direction="row" spacing={2}>
          <Card title="AAPL" sx={{ flex: 1 }}>
            <Typography variant="h5">$231.14</Typography>
            <Badge status="bull" label="+1.82%" size="small" />
          </Card>
          <Card title="TSLA" sx={{ flex: 1 }}>
            <Typography variant="h5">$248.09</Typography>
            <Badge status="bear" label="-0.94%" size="small" />
          </Card>
          <Card title="NVDA" sx={{ flex: 1 }}>
            <Typography variant="h5">$132.77</Typography>
            <Badge status="bull" label="+3.11%" size="small" />
          </Card>
        </Stack>
        <Card title="Recent activity">
          <Box sx={{ color: "text.secondary" }}>
            <Typography variant="body2">Buy 10 AAPL @ $230.50 — filled</Typography>
            <Typography variant="body2">Sell 4 MSFT @ $402.10 — filled</Typography>
          </Box>
        </Card>
      </Stack>
    </AppLayout>
  );
}

export const Dashboard: Story = {
  render: () => <DashboardDemo />,
};
