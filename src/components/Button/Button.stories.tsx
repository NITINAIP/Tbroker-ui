import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  argTypes: {
    tone: { control: "select", options: [undefined, "bull", "bear"] },
    variant: { control: "select", options: ["contained", "outlined", "text"] },
    size: { control: "select", options: ["small", "medium", "large"] },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Place order",
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Buy: Story = {
  args: { tone: "bull", children: "Buy" },
};

export const Sell: Story = {
  args: { tone: "bear", children: "Sell" },
};

export const Outlined: Story = {
  args: { variant: "outlined", children: "Cancel order" },
};

export const Disabled: Story = {
  args: { disabled: true },
};
