import * as React from "react";
import MuiBox from "@mui/material/Box";
import MuiFormHelperText from "@mui/material/FormHelperText";
import MuiTypography from "@mui/material/Typography";

export type FieldLayout = "block" | "inline";

export interface FormFieldProps {
  label?: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  /** `"block"` (default) stacks the label above the control; `"inline"` places it to the left. */
  layout?: FieldLayout;
  /** Label column width when `layout="inline"`. Defaults to 140px. */
  labelWidth?: number | string;
  helperText?: React.ReactNode;
  error?: boolean;
  children: React.ReactNode;
}

const DEFAULT_LABEL_WIDTH = 140;

/**
 * Tbroker's label/control layout, shared by `Input`, `Select`, and
 * `Autocomplete`. Renders a static label outside the control (unlike MUI's
 * built-in floating label) so both stacked and side-by-side forms are
 * possible.
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  layout = "block",
  labelWidth = DEFAULT_LABEL_WIDTH,
  helperText,
  error,
  children,
}) => {
  const isInline = layout === "inline";

  return (
    <MuiBox sx={{ display: isInline ? "flex" : "block", alignItems: isInline ? "flex-start" : undefined, gap: isInline ? 2 : 0 }}>
      {label ? (
        <MuiTypography
          component="label"
          htmlFor={htmlFor}
          variant="body2"
          sx={{
            fontWeight: 600,
            color: "text.primary",
            display: "block",
            flexShrink: 0,
            width: isInline ? labelWidth : "auto",
            pt: isInline ? 1 : 0,
            pb: isInline ? 0 : 0.5,
          }}
        >
          {label}
          {required ? <MuiTypography component="span" sx={{ color: "error.main" }}>&nbsp;*</MuiTypography> : null}
        </MuiTypography>
      ) : null}
      <MuiBox sx={{ flex: isInline ? 1 : undefined, minWidth: 0 }}>
        {children}
        {helperText ? <MuiFormHelperText error={error}>{helperText}</MuiFormHelperText> : null}
      </MuiBox>
    </MuiBox>
  );
};

FormField.displayName = "FormField";
