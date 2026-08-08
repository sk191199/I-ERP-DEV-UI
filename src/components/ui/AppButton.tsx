import Button, { type ButtonProps } from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import { forwardRef } from "react";

export type AppButtonTone = "primary" | "neutral" | "danger" | "ghost";

export interface AppButtonProps extends Omit<ButtonProps, "color" | "variant"> {
  /** Visual intent within the design system. */
  tone?: AppButtonTone;
  /** primary = filled, secondary = outlined, tertiary = text */
  emphasis?: "primary" | "secondary" | "tertiary";
  loading?: boolean;
}

const variantByEmphasis = {
  primary: "contained",
  secondary: "outlined",
  tertiary: "text",
} as const;

const colorByTone = {
  primary: "primary",
  neutral: "inherit",
  danger: "error",
  ghost: "inherit",
} as const;

/**
 * The only button allowed in the app. Never use MUI <Button> directly.
 */
export const AppButton = forwardRef<HTMLButtonElement, AppButtonProps>(
  function AppButton(
    { tone = "primary", emphasis = "primary", loading = false, disabled, children, ...rest },
    ref,
  ) {
    return (
      <Button
        ref={ref}
        variant={variantByEmphasis[emphasis]}
        color={colorByTone[tone]}
        disabled={disabled || loading}
        startIcon={
          loading ? <CircularProgress size={16} color="inherit" /> : rest.startIcon
        }
        {...rest}
      >
        {children}
      </Button>
    );
  },
);
