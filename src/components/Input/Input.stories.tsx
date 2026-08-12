import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  args: {
    label: "Quantity",
    placeholder: "0",
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {};

export const WithHelperText: Story = {
  args: {
    label: "Limit price",
    helperText: "Enter a price above the current bid",
  },
};

export const Error: Story = {
  args: {
    label: "Limit price",
    error: true,
    helperText: "Price must be greater than 0",
    defaultValue: "-1",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "100" },
};
