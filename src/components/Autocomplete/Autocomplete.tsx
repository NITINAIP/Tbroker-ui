import * as React from "react";
import MuiAutocomplete from "@mui/material/Autocomplete";
import MuiTextField from "@mui/material/TextField";
import { FormField, type FieldLayout } from "../FormField/FormField";

export interface AutocompleteOption<T = string> {
  label: string;
  value: T;
  disabled?: boolean;
}

export interface AutocompleteProps<T = string> {
  options: AutocompleteOption<T>[];
  value?: AutocompleteOption<T> | AutocompleteOption<T>[] | null;
  onChange?: (value: AutocompleteOption<T> | AutocompleteOption<T>[] | null) => void;
  multiple?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  helperText?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  /** `"block"` (default) stacks the label above the control; `"inline"` places it to the left. */
  layout?: FieldLayout;
  /** Label column width when `layout="inline"`. Defaults to 140px. */
  labelWidth?: number | string;
  required?: boolean;
  id?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
}

/**
 * Tbroker's autocomplete/combobox, e.g. for symbol search. Wraps MUI's
 * `Autocomplete` with an `options` array of `{ label, value }` pairs
 * instead of raw MUI render props, and supports single or multi-select.
 */
export function Autocomplete<T = string>({
  options,
  value,
  onChange,
  multiple = false,
  label,
  placeholder,
  helperText,
  error,
  disabled,
  layout = "block",
  labelWidth,
  required,
  id,
  size = "small",
  fullWidth = true,
}: AutocompleteProps<T>) {
  const field = (
    <MuiAutocomplete
      id={id}
      options={options}
      value={value ?? (multiple ? [] : null)}
      onChange={(_event, newValue) =>
        onChange?.(newValue as AutocompleteOption<T> | AutocompleteOption<T>[] | null)
      }
      multiple={multiple}
      disabled={disabled}
      size={size}
      fullWidth={fullWidth}
      getOptionLabel={(option) => option.label}
      isOptionEqualToValue={(option, selected) => option.value === selected.value}
      getOptionDisabled={(option) => Boolean(option.disabled)}
      renderInput={(params) => (
        <MuiTextField {...params} placeholder={placeholder} required={required} error={error} />
      )}
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
}
