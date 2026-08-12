import * as React from "react";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiSelect, { type SelectProps as MuiSelectProps } from "@mui/material/Select";
import { FormField, type FieldLayout } from "../FormField/FormField";

export interface SelectOption<T extends string | number = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface SelectProps<T extends string | number = string>
  extends Omit<MuiSelectProps<T>, "children" | "label"> {
  label?: React.ReactNode;
  options: SelectOption<T>[];
  helperText?: React.ReactNode;
  /** `"block"` (default) stacks the label above the select; `"inline"` places it to the left. */
  layout?: FieldLayout;
  /** Label column width when `layout="inline"`. Defaults to 140px. */
  labelWidth?: number | string;
}

/**
 * Tbroker's dropdown select. Wraps MUI's `Select` with a label and an
 * `options` array so call sites don't hand-roll `MenuItem`s.
 */
export function Select<T extends string | number = string>({
  label,
  options,
  helperText,
  layout = "block",
  labelWidth,
  fullWidth = true,
  size = "small",
  variant = "outlined",
  required,
  error,
  id,
  ...props
}: SelectProps<T>) {
  const field = (
    <MuiSelect<T>
      id={id}
      fullWidth={fullWidth}
      size={size}
      variant={variant}
      required={required}
      error={error}
      {...props}
    >
      {options.map((option) => (
        <MuiMenuItem key={option.value} value={option.value} disabled={option.disabled}>
          {option.label}
        </MuiMenuItem>
      ))}
    </MuiSelect>
  );

  if (!label && !helperText) return field;

  return (
    <FormField
      label={label}
      htmlFor={id}
      required={required}
      layout={layout}
      labelWidth={labelWidth}
      helperText={helperText}
      error={error}
    >
      {field}
    </FormField>
  );
}
