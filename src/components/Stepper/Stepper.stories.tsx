import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stepper, type StepItem } from "./Stepper";

const steps: StepItem[] = [
  { value: "info", label: "Company Info" },
  { value: "license", label: "License Verification" },
  { value: "documents", label: "Documents", optional: "Optional" },
  { value: "review", label: "Review & Submit" },
];

const meta: Meta<typeof Stepper> = {
  title: "Components/Stepper",
  component: Stepper,
  args: { steps, activeStep: "license" },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {};

export const FirstStep: Story = {
  args: { activeStep: "info" },
};

export const LastStep: Story = {
  args: { activeStep: "review" },
};
