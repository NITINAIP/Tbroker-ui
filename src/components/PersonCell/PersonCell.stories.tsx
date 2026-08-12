import type { Meta, StoryObj } from "@storybook/react-vite";
import { PersonCell } from "./PersonCell";

const meta: Meta<typeof PersonCell> = {
  title: "Components/PersonCell",
  component: PersonCell,
  args: {
    name: "Stella Cooper",
    avatarText: "S",
  },
};

export default meta;
type Story = StoryObj<typeof PersonCell>;

export const Default: Story = {};

export const WithSecondaryLine: Story = {
  args: { name: "Amelia Rhodes", secondary: "Senior Master", avatarText: "A" },
};
