import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Autocomplete, type AutocompleteOption } from "./Autocomplete";

const symbols: AutocompleteOption[] = [
  { label: "AAPL — Apple Inc.", value: "AAPL" },
  { label: "MSFT — Microsoft Corp.", value: "MSFT" },
  { label: "NVDA — NVIDIA Corp.", value: "NVDA" },
  { label: "TSLA — Tesla Inc.", value: "TSLA" },
  { label: "GOOGL — Alphabet Inc.", value: "GOOGL", disabled: true },
];

const meta: Meta<typeof Autocomplete> = {
  title: "Components/Autocomplete",
  component: Autocomplete,
  args: {
    id: "symbol",
    label: "Symbol",
    options: symbols,
    placeholder: "Search symbol…",
  },
};

export default meta;
type Story = StoryObj<typeof Autocomplete>;

function AutocompleteDemo(props: React.ComponentProps<typeof Autocomplete>) {
  const [value, setValue] = React.useState(props.value ?? null);
  return <Autocomplete {...props} value={value} onChange={setValue} />;
}

export const Default: Story = {
  render: (args) => <AutocompleteDemo {...args} />,
};

export const Inline: Story = {
  render: (args) => <AutocompleteDemo {...args} layout="inline" />,
};

export const Multiple: Story = {
  render: (args) => <AutocompleteDemo {...args} multiple label="Watchlist symbols" value={[]} />,
};

export const WithHelperText: Story = {
  render: (args) => (
    <AutocompleteDemo {...args} helperText="Alphabet is temporarily unavailable for trading" />
  ),
};
