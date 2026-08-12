import * as React from "react";
import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import MuiCardHeader from "@mui/material/CardHeader";

export interface CardProps extends Omit<MuiCardProps, "title"> {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
}

/**
 * Tbroker's surface container. Wraps MUI's `Card` and renders an optional
 * header (title / subheader / action) above the content.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, subheader, action, variant = "outlined", children, ...props }, ref) => (
    <MuiCard ref={ref} variant={variant} {...props}>
      {title || subheader || action ? (
        <MuiCardHeader title={title} subheader={subheader} action={action} />
      ) : null}
      <MuiCardContent>{children}</MuiCardContent>
    </MuiCard>
  ),
);

Card.displayName = "Card";
