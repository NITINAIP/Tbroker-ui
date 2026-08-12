import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "@mui/material/Typography";
import { Tabs, type TabItem } from "./Tabs";

const items: TabItem[] = [
  { value: "positions", label: "Positions", content: <Typography>Your open positions.</Typography> },
  { value: "orders", label: "Orders", content: <Typography>Your open orders.</Typography> },
  { value: "history", label: "History", content: <Typography>Trade history.</Typography> },
];

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  args: { items },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

function TabsDemo() {
  const [value, setValue] = React.useState("positions");
  return <Tabs items={items} value={value} onChange={setValue} />;
}

export const Default: Story = {
  render: () => <TabsDemo />,
};
