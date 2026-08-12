import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "./Select";

const orderTypeOptions = [
  { label: "Market", value: "market" },
  { label: "Limit", value: "limit" },
  { label: "Stop", value: "stop" },
  { label: "Stop limit", value: "stop_limit", disabled: true },
];

const meta: Meta<typeof Select> = {
  title: "Components/Select",
  component: Select,
  args: {
    id: "order-type",
    label: "Order type",
    options: orderTypeOptions,
    defaultValue: "market",
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    helperText: "Stop limit orders are temporarily unavailable",
  },
};
