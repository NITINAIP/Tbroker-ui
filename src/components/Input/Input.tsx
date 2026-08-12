import * as React from "react";
import MuiTextField, { type TextFieldProps as MuiTextFieldProps } from "@mui/material/TextField";
import { FormField, type FieldLayout } from "../FormField/FormField";

export type InputProps = Omit<MuiTextFieldProps, "label"> & {
  label?: React.ReactNode;
  /** `"block"` (default) stacks the label above the input; `"inline"` places it to the left. */
  layout?: FieldLayout;
  /** Label column width when `layout="inline"`. Defaults to 140px. */
  labelWidth?: number | string;
};

/**
 * Tbroker's text input. Wraps MUI's `TextField` (outlined, small by
 * default) and covers any native input type — text, email, password, tel,
 * number, url, date, time, datetime-local, month, week, search — via the
 * standard `type` prop, plus `multiline` for a textarea.
 */
export const Input = React.forwardRef<HTMLDivElement, InputProps>(
  (
    {
      label,
      layout = "block",
      labelWidth,
      variant = "outlined",
      size = "small",
      fullWidth = true,
      required,
      id,
      helperText,
      error,
      ...props
    },
    ref,
  ) => {
    const field = (
      <MuiTextField
        ref={ref}
        variant={variant}
        size={size}
        fullWidth={fullWidth}
        required={required}
        id={id}
        error={error}
        {...props}
      />
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
  },
);

Input.displayName = "Input";
