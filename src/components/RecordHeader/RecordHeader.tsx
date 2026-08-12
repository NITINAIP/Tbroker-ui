import * as React from "react";
import MuiBox from "@mui/material/Box";
import MuiIconButton from "@mui/material/IconButton";
import MuiStack from "@mui/material/Stack";
import MuiTypography from "@mui/material/Typography";

export interface RecordHeaderMetaItem {
  label: string;
  value: React.ReactNode;
}

export interface RecordHeaderProps {
  /** e.g. "Appointments / Thursday" */
  breadcrumb?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Shows an edit affordance next to the description when provided. */
  onEditDescription?: () => void;
  /** Key/value pairs shown in a row below the description, e.g. Date, Room, Capacity. */
  meta?: RecordHeaderMetaItem[];
  /** Right-aligned controls, e.g. a status selector and a primary action button. */
  actions?: React.ReactNode;
}

/**
 * Tbroker's record detail header: breadcrumb, title, an editable
 * description, a row of key/value meta, and right-aligned actions. Used at
 * the top of a detail view — an appointment, an order, a client record.
 */
export const RecordHeader: React.FC<RecordHeaderProps> = ({
  breadcrumb,
  title,
  description,
  onEditDescription,
  meta,
  actions,
}) => (
  <MuiBox>
    <MuiStack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between", gap: 2 }}>
      <MuiBox sx={{ minWidth: 0 }}>
        {breadcrumb ? (
          <MuiTypography variant="caption" color="text.disabled">
            {breadcrumb}
          </MuiTypography>
        ) : null}
        <MuiTypography variant="h3" color="primary.main" sx={{ mt: breadcrumb ? 0.5 : 0 }}>
          {title}
        </MuiTypography>
      </MuiBox>
      {actions ? (
        <MuiStack direction="row" spacing={1} sx={{ alignItems: "center", flexShrink: 0 }}>
          {actions}
        </MuiStack>
      ) : null}
    </MuiStack>

    {description ? (
      <MuiStack
        direction="row"
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1,
          mt: 1.5,
          px: 1.5,
          py: 1,
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
        }}
      >
        <MuiTypography variant="body2" color="text.secondary">
          {description}
        </MuiTypography>
        {onEditDescription ? (
          <MuiIconButton size="small" aria-label="Edit description" onClick={onEditDescription}>
            ✎
          </MuiIconButton>
        ) : null}
      </MuiStack>
    ) : null}

    {meta && meta.length > 0 ? (
      <MuiStack direction="row" spacing={4} sx={{ mt: 2.5, flexWrap: "wrap", rowGap: 1.5 }}>
        {meta.map((item) => (
          <MuiBox key={item.label}>
            <MuiTypography variant="caption" color="text.disabled" sx={{ display: "block" }}>
              {item.label}
            </MuiTypography>
            <MuiTypography variant="body2" sx={{ fontWeight: 600 }}>
              {item.value}
            </MuiTypography>
          </MuiBox>
        ))}
      </MuiStack>
    ) : null}
  </MuiBox>
);

RecordHeader.displayName = "RecordHeader";
