import * as React from "react";
import MuiChip, { type ChipProps as MuiChipProps } from "@mui/material/Chip";

export type BadgeStatus = "bull" | "bear" | "neutral" | "warning";

export interface BadgeProps extends Omit<MuiChipProps, "color"> {
  /** Semantic status this badge represents (e.g. price direction, order state). */
  status?: BadgeStatus;
}

const statusColor: Record<BadgeStatus, MuiChipProps["color"]> = {
  bull: "bull" as MuiChipProps["color"],
  bear: "bear" as MuiChipProps["color"],
  neutral: "default",
  warning: "warning",
};

/**
 * Tbroker's status indicator, e.g. for order state (filled/pending/rejected)
 * or price direction (up/down). Built on MUI's `Chip`.
 */
export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ status = "neutral", size = "small", variant = "filled", ...props }, ref) => (
    <MuiChip ref={ref} color={statusColor[status]} size={size} variant={variant} {...props} />
  ),
);

Badge.displayName = "Badge";
