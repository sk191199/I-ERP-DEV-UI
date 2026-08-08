import { createTheme, alpha } from "@mui/material/styles";

export const NAVY = "#0F172A";
export const NAVY_LIGHT = "#16213B";
export const BRAND_BLUE = "#2563EB";

export const DRAWER_WIDTH_EXPANDED = 260;
export const DRAWER_WIDTH_COLLAPSED = 72;
export const DRAWER_TRANSITION_MS = 300;

/**
 * Single source of truth for the enterprise design system.
 * Components must consume these tokens instead of hardcoding values.
 */
export const theme = createTheme({
  shape: { borderRadius: 10 },
  palette: {
    mode: "light",
    primary: { main: BRAND_BLUE, dark: "#1D4ED8", light: "#60A5FA" },
    secondary: { main: "#0F766E" },
    background: { default: "#F4F6FA", paper: "#FFFFFF" },
    text: { primary: "#101828", secondary: "#5A6B87" },
    divider: "#E4E9F2",
    success: { main: "#15803D" },
    warning: { main: "#B45309" },
    error: { main: "#B42318" },
    info: { main: BRAND_BLUE },
  },
  typography: {
    fontFamily:
      '"Inter var", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em" },
    h2: { fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.015em" },
    h3: { fontSize: "1.125rem", fontWeight: 700 },
    subtitle2: { fontWeight: 600 },
    body2: { fontSize: "0.875rem" },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: { WebkitFontSmoothing: "antialiased" },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: { borderRadius: 8, paddingInline: 14 },
      },
    },
    MuiPaper: {
      styleOverrides: {
        outlined: { borderColor: "#E4E9F2" },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: NAVY, fontSize: "0.75rem" },
        arrow: { color: NAVY },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 700,
          fontSize: "0.75rem",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          color: "#5A6B87",
          backgroundColor: "#F7F9FC",
        },
      },
    },
  },
});

/** Sidebar-specific tokens (dark navy surface). */
export const sidebarTokens = {
  bg: NAVY,
  bgElevated: NAVY_LIGHT,
  text: alpha("#FFFFFF", 0.78),
  textStrong: "#FFFFFF",
  textMuted: alpha("#FFFFFF", 0.5),
  divider: alpha("#FFFFFF", 0.08),
  hover: alpha("#FFFFFF", 0.06),
  activeBg: BRAND_BLUE,
  activeBgSoft: alpha(BRAND_BLUE, 0.18),
};
