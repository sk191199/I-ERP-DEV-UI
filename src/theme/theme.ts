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


// import { createTheme, alpha } from "@mui/material/styles";

// export type ThemeMode = "light" | "dark";

// export const PRIMARY = "#155DFC";
// export const ACCENT = "#FE2056";

// export const SUCCESS_BG = "#E6F9F2";
// export const DANGER_BG = "#FFE8EE";

// export const BG = "#F8FAFC";
// export const CARD = "#FFFFFF";

// export const TEXT = "#111827";
// export const TEXT_SECONDARY = "#64748B";

// export const BORDER = "#E7EDF5";

// export const NAVY = "#0F172A";
// export const NAVY_LIGHT = "#16213B";

// export const DRAWER_WIDTH_EXPANDED = 260;
// export const DRAWER_WIDTH_COLLAPSED = 72;
// export const DRAWER_TRANSITION_MS = 300;

// export function createAppTheme(mode: ThemeMode) {
//   const isDark = mode === "dark";

//   return createTheme({
//     shape: {
//       borderRadius: 24,
//     },

//     palette: isDark
//       ? {
//           mode: "dark",

//           primary: {
//             main: PRIMARY,
//           },

//           secondary: {
//             main: ACCENT,
//           },

//           background: {
//             default: "#08111F",
//             paper: "#111827",
//           },

//           text: {
//             primary: "#F8FAFC",
//             secondary: "#94A3B8",
//           },

//           divider: "#233247",

//           success: {
//             main: "#16A34A",
//           },

//           error: {
//             main: "#DC2626",
//           },

//           warning: {
//             main: "#D97706",
//           },

//           info: {
//             main: PRIMARY,
//           },
//         }
//       : {
//           mode: "light",

//           primary: {
//             main: PRIMARY,
//           },

//           secondary: {
//             main: ACCENT,
//           },

//           background: {
//             default: BG,
//             paper: CARD,
//           },

//           text: {
//             primary: TEXT,
//             secondary: TEXT_SECONDARY,
//           },

//           divider: BORDER,

//           success: {
//             main: "#16A34A",
//           },

//           error: {
//             main: "#DC2626",
//           },

//           warning: {
//             main: "#D97706",
//           },

//           info: {
//             main: PRIMARY,
//           },
//         },

//     typography: {
//       fontFamily: `"Inter", sans-serif`,

//       h1: {
//         fontSize: "2.6rem",
//         fontWeight: 700,
//         lineHeight: 1.15,
//       },

//       h2: {
//         fontSize: "2rem",
//         fontWeight: 700,
//         lineHeight: 1.2,
//       },

//       h3: {
//         fontSize: "1.25rem",
//         fontWeight: 700,
//       },

//       h4: {
//         fontSize: "1.05rem",
//         fontWeight: 700,
//       },

//       h5: {
//         fontSize: ".95rem",
//         fontWeight: 700,
//       },

//       subtitle1: {
//         fontSize: ".95rem",
//         fontWeight: 600,
//       },

//       subtitle2: {
//         fontSize: ".875rem",
//         fontWeight: 600,
//       },

//       body1: {
//         fontSize: ".95rem",
//       },

//       body2: {
//         fontSize: ".875rem",
//       },

//       caption: {
//         fontSize: ".75rem",
//         fontWeight: 600,
//         letterSpacing: ".08em",
//       },

//       button: {
//         fontWeight: 700,
//         textTransform: "none",
//       },
//     },

//     components: {
//       MuiCssBaseline: {
//         styleOverrides: {
//           body: {
//             backgroundColor: isDark ? "#08111F" : BG,
//             WebkitFontSmoothing: "antialiased",
//           },

//           "*": {
//             boxSizing: "border-box",
//           },

//           "::selection": {
//             background: alpha(PRIMARY, .18),
//           },
//         },
//       },

//       MuiPaper: {
//         styleOverrides: {
//           root: {
//             backgroundImage: "none",
//           },

//           outlined: {
//             borderColor: isDark ? "#243044" : BORDER,
//           },
//         },
//       },

//       MuiCard: {
//         styleOverrides: {
//           root: {
//             borderRadius: 24,
//             backgroundImage: "none",
//             border: `1px solid ${isDark ? "#233247" : BORDER}`,
//             boxShadow: isDark
//               ? "0 10px 40px rgba(0,0,0,.45)"
//               : "0 12px 40px rgba(15,23,42,.06)",
//             overflow: "hidden",
//             transition:
//               "all .25s cubic-bezier(.4,0,.2,1)",

//             "&:hover": {
//               transform: "translateY(-3px)",
//               boxShadow: isDark
//                 ? "0 18px 50px rgba(0,0,0,.55)"
//                 : "0 20px 55px rgba(15,23,42,.10)",
//             },
//           },
//         },
//       },

//       MuiButton: {
//         defaultProps: {
//           disableElevation: true,
//         },

//         styleOverrides: {
//           root: {
//             minHeight: 44,
//             borderRadius: 14,
//             fontWeight: 700,
//             paddingInline: 20,
//             transition: ".25s",

//             "&:hover": {
//               transform: "translateY(-1px)",
//             },
//           },

//           outlined: {
//             borderWidth: 1.5,

//             "&:hover": {
//               borderWidth: 1.5,
//             },
//           },
//         },

//         variants: [
//           {
//             props: { variant: "contained", color: "primary" },
//             style: {
//               background: PRIMARY,

//               "&:hover": {
//                 background: "#0F4DE5",
//               },
//             },
//           },
//         ],
//       },

//       MuiChip: {
//         styleOverrides: {
//           root: {
//             height: 28,
//             borderRadius: 999,
//             fontWeight: 700,
//           },
//         },

//         variants: [
//           {
//             props: { variant: "filled", color: "success" },
//             style: {
//               background: SUCCESS_BG,
//               color: "#16A34A",
//             },
//           },
//           {
//             props: { variant: "filled", color: "error" },
//             style: {
//               background: DANGER_BG,
//               color: ACCENT,
//             },
//           },
//         ],
//       },

//       MuiDivider: {
//         styleOverrides: {
//           root: {
//             borderColor: isDark ? "#243044" : BORDER,
//           },
//         },
//       },

//       MuiTableCell: {
//         styleOverrides: {
//           head: {
//             backgroundColor: isDark ? "#172033" : "#F8FAFC",
//             color: isDark ? "#CBD5E1" : TEXT_SECONDARY,
//             fontWeight: 700,
//             fontSize: ".75rem",
//             textTransform: "uppercase",
//             letterSpacing: ".08em",
//             borderBottom: `1px solid ${isDark ? "#243044" : BORDER}`,
//           },

//           root: {
//             borderColor: isDark ? "#243044" : BORDER,
//           },
//         },
//       },

//       MuiOutlinedInput: {
//         styleOverrides: {
//           root: {
//             borderRadius: 14,

//             "& .MuiOutlinedInput-notchedOutline": {
//               borderColor: isDark ? "#334155" : BORDER,
//             },

//             "&:hover .MuiOutlinedInput-notchedOutline": {
//               borderColor: PRIMARY,
//             },

//             "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
//               borderColor: PRIMARY,
//               borderWidth: 2,
//             },
//           },
//         },
//       },

//       MuiInputBase: {
//         styleOverrides: {
//           root: {
//             backgroundColor: isDark ? "#111827" : "#FFFFFF",
//           },
//         },
//       },

//       MuiMenu: {
//         styleOverrides: {
//           paper: {
//             borderRadius: 18,
//             backgroundImage: "none",
//             border: `1px solid ${isDark ? "#243044" : BORDER}`,
//             boxShadow: isDark
//               ? "0 18px 45px rgba(0,0,0,.45)"
//               : "0 18px 45px rgba(15,23,42,.08)",
//           },
//         },
//       },

//       MuiMenuItem: {
//         styleOverrides: {
//           root: {
//             borderRadius: 12,
//             margin: 4,

//             "&:hover": {
//               backgroundColor: isDark
//                 ? alpha("#FFFFFF", .06)
//                 : alpha(PRIMARY, .05),
//             },
//           },
//         },
//       },

//       MuiTooltip: {
//         styleOverrides: {
//           tooltip: {
//             backgroundColor: NAVY,
//             color: "#fff",
//             borderRadius: 10,
//             fontSize: ".75rem",
//           },

//           arrow: {
//             color: NAVY,
//           },
//         },
//       },

//       MuiIconButton: {
//         styleOverrides: {
//           root: {
//             borderRadius: 12,

//             "&:hover": {
//               backgroundColor: isDark
//                 ? alpha("#FFFFFF", .08)
//                 : alpha(PRIMARY, .06),
//             },
//           },
//         },
//       },

//       MuiLinearProgress: {
//         styleOverrides: {
//           root: {
//             height: 8,
//             borderRadius: 999,
//             backgroundColor: isDark ? "#1E293B" : "#EEF3F8",
//           },

//           bar: {
//             borderRadius: 999,
//             backgroundColor: PRIMARY,
//           },
//         },
//       },

//       MuiAvatar: {
//         styleOverrides: {
//           root: {
//             fontWeight: 700,
//           },
//         },
//       },
//     },
//   });
// }

// export const sidebarTokens = {
//   bg: NAVY,
//   bgElevated: NAVY_LIGHT,

//   text: alpha("#FFFFFF", 0.82),
//   textStrong: "#FFFFFF",
//   textMuted: alpha("#FFFFFF", 0.55),

//   divider: alpha("#FFFFFF", 0.08),

//   hover: alpha("#FFFFFF", 0.06),

//   activeBg: PRIMARY,

//   activeBgSoft: alpha(PRIMARY, 0.18),
// };