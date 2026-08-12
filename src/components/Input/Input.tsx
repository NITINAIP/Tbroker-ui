import * as React from "react";
import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";

export type InputProps = MuiTextFieldProps;

/**
 * Tbroker's text input. A thin, opinionated wrapper around MUI's
 * `TextField` (outlined, small by default) so forms stay visually consistent.
 */
export const Input = React.forwardRef<HTMLDivElement, InputProps>(
  ({ variant = "outlined", size = "small", fullWidth = true, ...props }, ref) => (
    <MuiTextField
      ref={ref}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      {...props}
    />
  ),
);

Input.displayName = "Input";
