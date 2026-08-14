import * as React from "react";
import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
import MuiCardContent from "@mui/material/CardContent";
import MuiCardHeader from "@mui/material/CardHeader";
import { tbrokerTokens } from "../../theme/tokens";

export interface CardProps extends Omit<MuiCardProps, "title"> {
  title?: React.ReactNode;
  subheader?: React.ReactNode;
  action?: React.ReactNode;
  /** Adds a pointer cursor and a hover elevation lift — use when the whole card is a click target (e.g. links to a detail view). */
  interactive?: boolean;
}

/**
 * Tbroker's surface container. Wraps MUI's `Card` and renders an optional
 * header (title / subheader / action) above the content.
 */
export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, subheader, action, variant = "outlined", interactive = false, sx, children, ...props }, ref) => (
    <MuiCard
      ref={ref}
      variant={variant}
      sx={[
        interactive
          ? {
              cursor: "pointer",
              transition: (theme) =>
                theme.transitions.create("box-shadow", {
                  duration: tbrokerTokens.motion.duration.base,
                }),
              "&:hover": { boxShadow: tbrokerTokens.shape.shadow.hover },
            }
          : false,
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...props}
    >
      {title || subheader || action ? (
        <MuiCardHeader title={title} subheader={subheader} action={action} />
      ) : null}
      <MuiCardContent>{children}</MuiCardContent>
    </MuiCard>
  ),
);

Card.displayName = "Card";
