import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./Alert";

const meta: Meta<typeof Alert> = {
  title: "Components/Alert",
  component: Alert,
  argTypes: {
    severity: { control: "select", options: ["success", "info", "warning", "error"] },
  },
  args: {
    children: "Markets close in 15 minutes.",
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = {
  args: { severity: "info" },
};

export const Warning: Story = {
  args: {
    severity: "warning",
    title: "Margin call",
    children: "Your account equity is below the maintenance margin requirement.",
  },
};

export const Error: Story = {
  args: {
    severity: "error",
    title: "Order rejected",
    children: "Insufficient buying power to place this order.",
  },
};

export const Success: Story = {
  args: {
    severity: "success",
    children: "Order filled: 10 shares of AAPL at $231.14.",
  },
};
