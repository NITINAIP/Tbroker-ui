import * as React from "react";
import MuiButton, { type ButtonProps as MuiButtonProps } from "@mui/material/Button";

export type ButtonTone = "bull" | "bear";

export interface ButtonProps extends Omit<MuiButtonProps, "color"> {
  /** Trading-specific tone. Overrides `color` with the theme's bull (buy) / bear (sell) palette. */
  tone?: ButtonTone;
  color?: MuiButtonProps["color"];
}

/**
 * Tbroker's primary action button. Behaves like MUI's `Button`, with an
 * added `tone` shortcut for buy/sell style actions common in trading UIs.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ tone, color, variant = "contained", ...props }, ref) => {
    const resolvedColor = tone ?? color;
    return (
      <MuiButton
        ref={ref}
        variant={variant}
        color={resolvedColor as MuiButtonProps["color"]}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
