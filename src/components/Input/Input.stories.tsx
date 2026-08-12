import type { Meta, StoryObj } from "@storybook/react-vite";
import Stack from "@mui/material/Stack";
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

export const Inline: Story = {
  args: { layout: "inline", label: "Quantity" },
};

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

export const Required: Story = {
  args: { label: "Account number", required: true },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "100" },
};

export const Multiline: Story = {
  args: {
    label: "Order note",
    multiline: true,
    minRows: 3,
    placeholder: "Optional note for this order…",
  },
};

/** `Input` accepts any native HTML input `type` — this covers the common ones. */
export const Types: Story = {
  render: () => (
    <Stack spacing={2} sx={{ width: 320 }}>
      <Input label="Text" type="text" placeholder="AAPL" />
      <Input label="Email" type="email" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="••••••••" />
      <Input label="Phone" type="tel" placeholder="+66 81 234 5678" />
      <Input label="Number" type="number" placeholder="10" />
      <Input label="URL" type="url" placeholder="https://example.com" />
      <Input label="Date" type="date" />
      <Input label="Time" type="time" />
      <Input label="Date & time" type="datetime-local" />
      <Input label="Search" type="search" placeholder="Search symbol…" />
    </Stack>
  ),
};
