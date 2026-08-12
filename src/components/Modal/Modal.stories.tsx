import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import Typography from "@mui/material/Typography";
import { Modal } from "./Modal";
import { Button } from "../Button/Button";

const meta: Meta<typeof Modal> = {
  title: "Components/Modal",
  component: Modal,
  args: {
    title: "Confirm order",
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

function ModalDemo() {
  const [open, setOpen] = React.useState(true);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open modal</Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Confirm order"
        actions={
          <>
            <Button variant="text" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button tone="bull" onClick={() => setOpen(false)}>
              Confirm buy
            </Button>
          </>
        }
      >
        <Typography variant="body2">
          Buy 10 shares of AAPL at market price. This action cannot be undone.
        </Typography>
      </Modal>
    </>
  );
}

export const Default: Story = {
  render: () => <ModalDemo />,
};
