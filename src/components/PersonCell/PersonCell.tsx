import * as React from "react";
import MuiAvatar from "@mui/material/Avatar";
import MuiBox from "@mui/material/Box";
import MuiStack from "@mui/material/Stack";
import MuiTypography from "@mui/material/Typography";

export interface PersonCellProps {
  name: React.ReactNode;
  secondary?: React.ReactNode;
  avatarSrc?: string;
  /** Fallback shown in the avatar when `avatarSrc` is absent, e.g. initials. */
  avatarText?: string;
  size?: number;
}

/**
 * Tbroker's avatar + name cell, for table rows and lists that reference a
 * person (participants, staff, customers) — an avatar with a primary name
 * and optional secondary line.
 */
export const PersonCell: React.FC<PersonCellProps> = ({
  name,
  secondary,
  avatarSrc,
  avatarText,
  size = 32,
}) => (
  <MuiStack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
    <MuiAvatar
      src={avatarSrc}
      alt={typeof name === "string" ? name : avatarText}
      sx={{ width: size, height: size, fontSize: size * 0.4 }}
    >
      {avatarText}
    </MuiAvatar>
    <MuiBox sx={{ minWidth: 0 }}>
      <MuiTypography variant="body2" noWrap>
        {name}
      </MuiTypography>
      {secondary ? (
        <MuiTypography variant="caption" color="text.secondary" noWrap sx={{ display: "block" }}>
          {secondary}
        </MuiTypography>
      ) : null}
    </MuiBox>
  </MuiStack>
);

PersonCell.displayName = "PersonCell";
