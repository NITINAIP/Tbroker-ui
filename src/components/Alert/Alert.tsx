import * as React from "react";
import MuiAlert, { type AlertProps as MuiAlertProps } from "@mui/material/Alert";
import MuiAlertTitle from "@mui/material/AlertTitle";

export interface AlertProps extends Omit<MuiAlertProps, "title"> {
  title?: React.ReactNode;
}

/**
 * Tbroker's inline alert/banner, e.g. for market status, order errors, or
 * risk warnings. Wraps MUI's `Alert` with an optional bold title line.
 */
export const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ title, severity = "info", variant = "standard", children, ...props }, ref) => (
    <MuiAlert ref={ref} severity={severity} variant={variant} {...props}>
      {title ? <MuiAlertTitle>{title}</MuiAlertTitle> : null}
      {children}
    </MuiAlert>
  ),
);

Alert.displayName = "Alert";
