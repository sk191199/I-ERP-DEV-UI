// import { createTheme, alpha } from "@mui/material/styles";

// export const NAVY = "#0F172A";
// export const NAVY_LIGHT = "#16213B";
// export const BRAND_BLUE = "#2563EB";

// export const DRAWER_WIDTH_EXPANDED = 260;
// export const DRAWER_WIDTH_COLLAPSED = 72;
// export const DRAWER_TRANSITION_MS = 300;

// /**
//  * Single source of truth for the enterprise design system.
//  * Components must consume these tokens instead of hardcoding values.
//  */
// export const theme = createTheme({
//   shape: { borderRadius: 10 },
//   palette: {
//     mode: "light",
//     primary: { main: BRAND_BLUE, dark: "#1D4ED8", light: "#60A5FA" },
//     secondary: { main: "#0F766E" },
//     background: { default: "#F4F6FA", paper: "#FFFFFF" },
//     text: { primary: "#101828", secondary: "#5A6B87" },
//     divider: "#E4E9F2",
//     success: { main: "#15803D" },
//     warning: { main: "#B45309" },
//     error: { main: "#B42318" },
//     info: { main: BRAND_BLUE },
//   },
//   typography: {
//     fontFamily:
//       '"Inter var", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
//     h1: { fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em" },
//     h2: { fontSize: "1.375rem", fontWeight: 700, letterSpacing: "-0.015em" },
//     h3: { fontSize: "1.125rem", fontWeight: 700 },
//     subtitle2: { fontWeight: 600 },
//     body2: { fontSize: "0.875rem" },
//     button: { textTransform: "none", fontWeight: 600 },
//   },
//   components: {
//     MuiCssBaseline: {
//       styleOverrides: {
//         body: { WebkitFontSmoothing: "antialiased" },
//       },
//     },
//     MuiButton: {
//       defaultProps: { disableElevation: true },
//       styleOverrides: {
//         root: { borderRadius: 8, paddingInline: 14 },
//       },
//     },
//     MuiPaper: {
//       styleOverrides: {
//         outlined: { borderColor: "#E4E9F2" },
//       },
//     },
//     MuiTooltip: {
//       styleOverrides: {
//         tooltip: { backgroundColor: NAVY, fontSize: "0.75rem" },
//         arrow: { color: NAVY },
//       },
//     },
//     MuiTableCell: {
//       styleOverrides: {
//         head: {
//           fontWeight: 700,
//           fontSize: "0.75rem",
//           textTransform: "uppercase",
//           letterSpacing: "0.04em",
//           color: "#5A6B87",
//           backgroundColor: "#F7F9FC",
//         },
//       },
//     },
//   },
// });

// /** Sidebar-specific tokens (dark navy surface). */
// export const sidebarTokens = {
//   bg: NAVY,
//   bgElevated: NAVY_LIGHT,
//   text: alpha("#FFFFFF", 0.78),
//   textStrong: "#FFFFFF",
//   textMuted: alpha("#FFFFFF", 0.5),
//   divider: alpha("#FFFFFF", 0.08),
//   hover: alpha("#FFFFFF", 0.06),
//   activeBg: BRAND_BLUE,
//   activeBgSoft: alpha(BRAND_BLUE, 0.18),
// };


import { createTheme, alpha } from "@mui/material/styles";

export type ThemeMode = "light" | "dark";

export const NAVY = "#0F172A";
export const NAVY_LIGHT = "#16213B";
export const BRAND_BLUE = "#2563EB";

export const PRIMARY = BRAND_BLUE;
export const ACCENT = "#FE2056";
export const SUCCESS_BG = "#E6F9F2";
export const DANGER_BG = "#FFE8EE";
export const BORDER = "#E4E9F2";
export const TEXT_SECONDARY = "#5A6B87";

export const DRAWER_WIDTH_EXPANDED = 260;
export const DRAWER_WIDTH_COLLAPSED = 72;
export const DRAWER_TRANSITION_MS = 300;

/**
 * Creates the application theme for the selected color mode.
 *
 * Theme mode itself is controlled by AppThemeProvider.
 * This file only defines the visual design system.
 */
export function createAppTheme(mode: ThemeMode) {
  const isDark = mode === "dark";

  return createTheme({
    shape: {
      borderRadius: 10,
    },

    palette: isDark
      ? {
          mode: "dark",

          primary: {
            main: "#3B82F6",
            dark: "#2563EB",
            light: "#60A5FA",
          },

          secondary: {
            main: "#14B8A6",
          },

          background: {
            default: "#0B1120",
            paper: "#111827",
          },

          text: {
            primary: "#F8FAFC",
            secondary: "#94A3B8",
          },

          divider: "#243044",

          success: {
            main: "#22C55E",
          },

          warning: {
            main: "#F59E0B",
          },

          error: {
            main: "#EF4444",
          },

          info: {
            main: "#3B82F6",
          },
        }
      : {
          mode: "light",

          primary: {
            main: BRAND_BLUE,
            dark: "#1D4ED8",
            light: "#60A5FA",
          },

          secondary: {
            main: "#0F766E",
          },

          background: {
            default: "#F4F6FA",
            paper: "#FFFFFF",
          },

          text: {
            primary: "#101828",
            secondary: "#5A6B87",
          },

          divider: "#E4E9F2",

          success: {
            main: "#15803D",
          },

          warning: {
            main: "#B45309",
          },

          error: {
            main: "#B42318",
          },

          info: {
            main: BRAND_BLUE,
          },
        },

    typography: {
      fontFamily:
        '"Inter", "Inter var", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',

      h1: {
        fontSize: "1.75rem",
        fontWeight: 700,
        letterSpacing: "-0.02em",
      },

      h2: {
        fontSize: "1.375rem",
        fontWeight: 700,
        letterSpacing: "-0.015em",
      },

      h3: {
        fontSize: "1.125rem",
        fontWeight: 700,
      },

      subtitle2: {
        fontWeight: 600,
      },

      body2: {
        fontSize: "0.875rem",
      },

      button: {
        textTransform: "none",
        fontWeight: 600,
      },
    },

    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            WebkitFontSmoothing: "antialiased",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiButton: {
        defaultProps: {
          disableElevation: true,
        },

        styleOverrides: {
          root: {
            borderRadius: 8,
            paddingInline: 14,
          },
        },
      },

      MuiPaper: {
        styleOverrides: {
          outlined: {
            borderColor: isDark ? "#243044" : "#E4E9F2",
          },
        },
      },

      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },

      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#334155" : "#D5DCE8",
            },

            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "#475569" : "#B8C2D2",
            },

            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: BRAND_BLUE,
            },
          },
        },
      },

      MuiInputBase: {
        styleOverrides: {
          root: {
            backgroundColor: isDark ? "#111827" : "#FFFFFF",
          },
        },
      },

      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: NAVY,
            fontSize: "0.75rem",
          },

          arrow: {
            color: NAVY,
          },
        },
      },

      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: 700,
            fontSize: "0.75rem",
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            color: isDark ? "#94A3B8" : "#5A6B87",
            backgroundColor: isDark ? "#172033" : "#F7F9FC",
          },

          root: {
            borderColor: isDark ? "#243044" : "#E4E9F2",
          },
        },
      },

      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDark ? "#243044" : "#E4E9F2",
          },
        },
      },

      MuiMenu: {
        styleOverrides: {
          paper: {
            backgroundColor: isDark ? "#111827" : "#FFFFFF",
            border: `1px solid ${isDark ? "#243044" : "#E4E9F2"}`,
            backgroundImage: "none",
          },
        },
      },

      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            marginInline: 4,

            "&:hover": {
              backgroundColor: isDark ? "#1E293B" : "#F1F5F9",
            },
          },
        },
      },

      MuiIconButton: {
        styleOverrides: {
          root: {
            color: isDark ? "#CBD5E1" : "#667085",

            "&:hover": {
              backgroundColor: isDark
                ? alpha("#FFFFFF", 0.08)
                : alpha(BRAND_BLUE, 0.06),
            },
          },
        },
      },

      MuiChip: {
        styleOverrides: {
          root: {
            borderColor: isDark ? "#334155" : "#D5DCE8",
          },
        },
      },
    },
  });
}

/**
 * Sidebar-specific tokens.
 *
 * Sidebar intentionally stays dark in both light and dark application modes
 * so the navigation maintains the enterprise visual identity.
 */
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


