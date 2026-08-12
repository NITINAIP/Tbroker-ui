import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "@mui/material/Typography";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/Card",
  component: Card,
  args: {
    title: "AAPL — Apple Inc.",
    subheader: "NASDAQ",
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  render: (args) => (
    <Card {...args} sx={{ width: 320 }}>
      <Typography variant="h4" component="p">
        $231.14
      </Typography>
      <Typography variant="body2" color="success.main">
        +1.82 (0.79%) today
      </Typography>
    </Card>
  ),
};

export const NoHeader: Story = {
  args: { title: undefined, subheader: undefined },
  render: (args) => (
    <Card {...args} sx={{ width: 320 }}>
      <Typography variant="body1">Plain content, no header row.</Typography>
    </Card>
  ),
};
