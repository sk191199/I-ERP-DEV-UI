import TextField, { type TextFieldProps } from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import { forwardRef } from "react";

export interface AppInputOption {
  value: string | number;
  label: string;
}

export type AppInputProps = Omit<TextFieldProps, "variant" | "select"> & {
  /** Renders a select when options are provided. */
  options?: AppInputOption[];
};

/**
 * The only text/select input allowed in the app.
 */
export const AppInput = forwardRef<HTMLDivElement, AppInputProps>(function AppInput(
  { options, size = "small", fullWidth = true, ...rest },
  ref,
) {
  return (
    <TextField
      ref={ref}
      variant="outlined"
      size={size}
      fullWidth={fullWidth}
      select={Boolean(options)}
      {...rest}
    >
      {options?.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
});
