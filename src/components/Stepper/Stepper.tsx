import * as React from "react";
import MuiStep from "@mui/material/Step";
import MuiStepLabel from "@mui/material/StepLabel";
import MuiStepper, { type StepperProps as MuiStepperProps } from "@mui/material/Stepper";

export interface StepItem {
  value: string;
  label: React.ReactNode;
  /** Shown as a smaller line under the label, e.g. "Optional". */
  optional?: React.ReactNode;
}

export interface StepperProps extends Omit<MuiStepperProps, "children" | "activeStep"> {
  steps: StepItem[];
  /** Value of the currently active step (matches a `StepItem.value`), not an index. */
  activeStep: string;
}

/**
 * Tbroker's step indicator for multi-step flows — broker registration,
 * quote requests, license verification. Wraps MUI's `Stepper` with a
 * `steps` array of `{ value, label }` pairs, driven by `activeStep` value
 * instead of index.
 */
export const Stepper: React.FC<StepperProps> = ({ steps, activeStep, alternativeLabel = true, ...props }) => {
  const activeIndex = steps.findIndex((step) => step.value === activeStep);

  return (
    <MuiStepper activeStep={activeIndex} alternativeLabel={alternativeLabel} {...props}>
      {steps.map((step) => (
        <MuiStep key={step.value}>
          <MuiStepLabel optional={step.optional}>{step.label}</MuiStepLabel>
        </MuiStep>
      ))}
    </MuiStepper>
  );
};

Stepper.displayName = "Stepper";
