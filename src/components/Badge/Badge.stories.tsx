import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  argTypes: {
    status: { control: "select", options: ["bull", "bear", "neutral", "warning"] },
  },
  args: {
    label: "Filled",
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Bull: Story = {
  args: { status: "bull", label: "+1.82%" },
};

export const Bear: Story = {
  args: { status: "bear", label: "-0.94%" },
};

export const Neutral: Story = {
  args: { status: "neutral", label: "Pending" },
};

export const Warning: Story = {
  args: { status: "warning", label: "Margin call" },
};

export const Outlined: Story = {
  args: { status: "bull", variant: "outlined", label: "Filled" },
};

export const LicenseVerified: Story = {
  name: "License: Verified",
  args: { status: "bull", label: "Verified" },
};

export const LicenseExpired: Story = {
  name: "License: Expired",
  args: { status: "bear", label: "Expired" },
};

export const LicenseNotFound: Story = {
  name: "License: Not Found",
  args: { status: "neutral", label: "Not Found" },
};
