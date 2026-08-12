import * as React from "react";
import MuiFormControl from "@mui/material/FormControl";
import MuiFormHelperText from "@mui/material/FormHelperText";
import MuiInputLabel from "@mui/material/InputLabel";
import MuiMenuItem from "@mui/material/MenuItem";
import MuiSelect, { type SelectProps as MuiSelectProps } from "@mui/material/Select";

export interface SelectOption<T extends string | number = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface SelectProps<T extends string | number = string>
  extends Omit<MuiSelectProps<T>, "children"> {
  label?: string;
  options: SelectOption<T>[];
  helperText?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * Tbroker's dropdown select. Wraps MUI's `Select` with a label and an
 * `options` array so call sites don't hand-roll `MenuItem`s.
 */
export function Select<T extends string | number = string>({
  label,
  options,
  helperText,
  fullWidth = true,
  size = "small",
  id,
  ...props
}: SelectProps<T>) {
  const labelId = id ? `${id}-label` : undefined;

  return (
    <MuiFormControl fullWidth={fullWidth} size={size}>
      {label ? <MuiInputLabel id={labelId}>{label}</MuiInputLabel> : null}
      <MuiSelect<T> labelId={labelId} id={id} label={label} {...props}>
        {options.map((option) => (
          <MuiMenuItem key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </MuiMenuItem>
        ))}
      </MuiSelect>
      {helperText ? (
        <MuiFormHelperText error={props.error}>{helperText}</MuiFormHelperText>
      ) : null}
    </MuiFormControl>
  );
}
