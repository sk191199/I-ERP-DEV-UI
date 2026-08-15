// // import AppBar from "@mui/material/AppBar";
// // import Toolbar from "@mui/material/Toolbar";
// // import IconButton from "@mui/material/IconButton";
// // import Stack from "@mui/material/Stack";
// // import Box from "@mui/material/Box";
// // import Badge from "@mui/material/Badge";
// // import Tooltip from "@mui/material/Tooltip";
// // import InputAdornment from "@mui/material/InputAdornment";
// // import MenuIcon from "@mui/icons-material/Menu";
// // import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// // import SearchIcon from "@mui/icons-material/SearchOutlined";
// // import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";
// // import HelpIcon from "@mui/icons-material/HelpOutlineOutlined";
// // import AppsIcon from "@mui/icons-material/AppsOutlined";
// // import { AppInput } from "@/components/ui/AppInput";
// // import { AppBreadcrumbs } from "./AppBreadcrumbs";
// // import {
// //   DRAWER_WIDTH_COLLAPSED,
// //   DRAWER_WIDTH_EXPANDED,
// //   DRAWER_TRANSITION_MS,
// // } from "@/theme/theme";

// // interface AppTopBarProps {
// //   isPermanent: boolean;
// //   expanded: boolean;
// //   onToggleDrawer: () => void;
// // }

// // /** Responsive AppBar that resizes with the drawer. */
// // export function AppTopBar({ isPermanent, expanded, onToggleDrawer }: AppTopBarProps) {
// //   const drawerWidth = expanded ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED;

// //   return (
// //     <AppBar
// //       position="fixed"
// //       elevation={0}
// //       color="inherit"
// //       sx={{
// //         borderBottom: 1,
// //         borderColor: "divider",
// //         backgroundColor: "background.paper",
// //         width: isPermanent ? `calc(100% - ${drawerWidth}px)` : "100%",
// //         left: isPermanent ? `${drawerWidth}px` : 0,
// //         right: 0,
// //         transition: `width ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), left ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
// //       }}
// //     >
// //       <Toolbar sx={{ gap: 1.5, minHeight: { xs: 60, md: 64 } }}>
// //         <IconButton
// //           onClick={onToggleDrawer}
// //           edge="start"
// //           aria-label="Toggle navigation"
// //           size="small"
// //         >
// //           {isPermanent && expanded ? <MenuOpenIcon /> : <MenuIcon />}
// //         </IconButton>

// //         <Box sx={{ display: { xs: "none", md: "block" } }}>
// //           <AppBreadcrumbs />
// //         </Box>

// //         <Box sx={{ flex: 1 }} />

// //         <Box sx={{ width: { xs: 0, sm: 200, lg: 320 }, display: { xs: "none", sm: "block" } }}>
// //           <AppInput
// //             placeholder="Search records, documents, people…"
// //             slotProps={{
// //               input: {
// //                 startAdornment: (
// //                   <InputAdornment position="start">
// //                     <SearchIcon fontSize="small" />
// //                   </InputAdornment>
// //                 ),
// //               },
// //             }}
// //           />
// //         </Box>

// //         <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
// //           <Tooltip title="Search" arrow>
// //             <IconButton size="small" sx={{ display: { xs: "inline-flex", sm: "none" } }}>
// //               <SearchIcon fontSize="small" />
// //             </IconButton>
// //           </Tooltip>
// //           <Tooltip title="App switcher" arrow>
// //             <IconButton size="small" sx={{ display: { xs: "none", md: "inline-flex" } }}>
// //               <AppsIcon fontSize="small" />
// //             </IconButton>
// //           </Tooltip>
// //           <Tooltip title="Notifications" arrow>
// //             <IconButton size="small">
// //               <Badge color="error" variant="dot">
// //                 <NotificationsIcon fontSize="small" />
// //               </Badge>
// //             </IconButton>
// //           </Tooltip>
// //           <Tooltip title="Help" arrow>
// //             <IconButton size="small" sx={{ display: { xs: "none", md: "inline-flex" } }}>
// //               <HelpIcon fontSize="small" />
// //             </IconButton>
// //           </Tooltip>
// //         </Stack>
// //       </Toolbar>
// //     </AppBar>
// //   );
// // }

// import { useState } from "react";

// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import IconButton from "@mui/material/IconButton";
// import Stack from "@mui/material/Stack";
// import Box from "@mui/material/Box";
// import Badge from "@mui/material/Badge";
// import Tooltip from "@mui/material/Tooltip";
// import InputAdornment from "@mui/material/InputAdornment";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import Chip from "@mui/material/Chip";

// import MenuIcon from "@mui/icons-material/Menu";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
// import SearchIcon from "@mui/icons-material/SearchOutlined";
// import CloseIcon from "@mui/icons-material/Close";
// import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
// import LightModeIcon from "@mui/icons-material/LightModeOutlined";
// import ExpandMoreIcon from "@mui/icons-material/KeyboardArrowDown";
// import MemoryIcon from "@mui/icons-material/MemoryOutlined";
// import MonitorHeartIcon from "@mui/icons-material/MonitorHeartOutlined";

// import { AppInput } from "@/components/ui/AppInput";
// // import { AppBreadcrumbs } from "./AppBreadcrumbs";

// import {
//   DRAWER_WIDTH_COLLAPSED,
//   DRAWER_WIDTH_EXPANDED,
//   DRAWER_TRANSITION_MS,
// } from "@/theme/theme";

// import { useAppTheme } from "@/theme/AppThemeProvider";

// interface AppTopBarProps {
//   isPermanent: boolean;
//   expanded: boolean;
//   onToggleDrawer: () => void;
// }

// /**
//  * Responsive application top bar.
//  *
//  * Desktop / Laptop:
//  * - Sidebar toggle
//  * - Breadcrumbs
//  * - Global search
//  * - Live Neural Monitor
//  * - Theme toggle
//  * - Notifications
//  * - HQ Terminal
//  *
//  * Tablet / Mobile:
//  * - Sidebar toggle
//  * - I-ERP logo
//  * - Search icon
//  * - Neural Monitor icon
//  * - Theme toggle
//  * - Notifications
//  */
// export function AppTopBar({
//   isPermanent,
//   expanded,
//   onToggleDrawer,
// }: AppTopBarProps) {
//   const drawerWidth = expanded
//     ? DRAWER_WIDTH_EXPANDED
//     : DRAWER_WIDTH_COLLAPSED;

//   const { mode, toggleTheme } = useAppTheme();

//   const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
//   const [neuralAnchorEl, setNeuralAnchorEl] =
//     useState<null | HTMLElement>(null);

//   const neuralOpen = Boolean(neuralAnchorEl);

//   const handleNeuralOpen = (
//     event: React.MouseEvent<HTMLElement>,
//   ) => {
//     setNeuralAnchorEl(event.currentTarget);
//   };

//   const handleNeuralClose = () => {
//     setNeuralAnchorEl(null);
//   };

//   const handleMobileSearchOpen = () => {
//     setMobileSearchOpen(true);
//   };

//   const handleMobileSearchClose = () => {
//     setMobileSearchOpen(false);
//   };

//   const isDark = mode === "dark";

//   return (
//     <AppBar
//       position="fixed"
//       elevation={0}
//       color="inherit"
//       sx={{
//         borderBottom: 1,
//         borderColor: "divider",
//         backgroundColor: "background.paper",

//         width: isPermanent
//           ? `calc(100% - ${drawerWidth}px)`
//           : "100%",

//         left: isPermanent ? `${drawerWidth}px` : 0,
//         right: 0,

//         transition: `
//           width ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1),
//           left ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)
//         `,

//         zIndex: (theme) => theme.zIndex.drawer + 1,
//       }}
//     >
//       <Toolbar
//         sx={{
//           minHeight: {
//             xs: 60,
//             md: 64,
//           },

//           px: {
//             xs: 1.5,
//             sm: 2,
//             md: 2.5,
//             lg: 3,
//           },

//           gap: {
//             xs: 0.5,
//             sm: 1,
//             md: 1.5,
//           },
//         }}
//       >
//         {/* =========================================================
//             MENU BUTTON
//            ========================================================= */}
//         <Tooltip title="Navigation" arrow>
//           <IconButton
//             onClick={onToggleDrawer}
//             edge="start"
//             aria-label="Toggle navigation"
//             size="small"
//             sx={{
//               flexShrink: 0,
//             }}
//           >
//             {isPermanent && expanded ? (
//               <MenuOpenIcon />
//             ) : (
//               <MenuIcon />
//             )}
//           </IconButton>
//         </Tooltip>

//         {/* =========================================================
//             MOBILE / TABLET LOGO
//            ========================================================= */}
//         <Box
//           sx={{
//             display: {
//               xs: mobileSearchOpen ? "none" : "flex",
//               md: "none",
//             },

//             alignItems: "center",
//             minWidth: 0,
//             flexShrink: 0,
//             ml: 0.5,
//           }}
//         >
//           <Typography
//             sx={{
//               fontSize: {
//                 xs: "0.95rem",
//                 sm: "1rem",
//               },
//               fontWeight: 800,
//               letterSpacing: "-0.02em",
//               color: "text.primary",
//               whiteSpace: "nowrap",
//             }}
//           >
//             I-ERP
//           </Typography>
//         </Box>

//         {/* =========================================================
//             DESKTOP BREADCRUMBS
//            ========================================================= */}
//         {/* <Box
//           sx={{
//             display: {
//               xs: "none",
//               md: "block",
//             },

//             minWidth: 0,
//           }}
//         >
//           <AppBreadcrumbs />
//         </Box> */}

//         {/* =========================================================
//             MOBILE SEARCH INPUT
//            ========================================================= */}
//         {mobileSearchOpen && (
//           <Box
//             sx={{
//               display: {
//                 xs: "block",
//                 md: "none",
//               },

//               flex: 1,
//               minWidth: 0,
//               ml: 0.5,
//             }}
//           >
//             <AppInput
//               autoFocus
//               placeholder="Search records, documents, people…"
//               size="small"
//               slotProps={{
//                 input: {
//                   startAdornment: (
//                     <InputAdornment position="start">
//                       <SearchIcon fontSize="small" />
//                     </InputAdornment>
//                   ),

//                   endAdornment: (
//                     <InputAdornment position="end">
//                       <IconButton
//                         size="small"
//                         onClick={handleMobileSearchClose}
//                         edge="end"
//                         aria-label="Close search"
//                       >
//                         <CloseIcon fontSize="small" />
//                       </IconButton>
//                     </InputAdornment>
//                   ),
//                 },
//               }}
//             />
//           </Box>
//         )}

//         {/* =========================================================
//             DESKTOP GLOBAL SEARCH
//            ========================================================= */}
//         <Box
//           sx={{
//             display: {
//               xs: "none",
//               md: "block",
//             },

//             ml: "auto",

//             width: {
//               md: 240,
//               lg: 360,
//               xl: 480,
//             },

//             maxWidth: "100%",
//           }}
//         >
//           <AppInput
//             placeholder="Search records, documents, people…"
//             size="small"
//             slotProps={{
//               input: {
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <SearchIcon fontSize="small" />
//                   </InputAdornment>
//                 ),
//               },
//             }}
//           />
//         </Box>

//         {/* Spacer only on mobile when search is closed */}
//         <Box
//           sx={{
//             flex: 1,
//             display: {
//               xs: mobileSearchOpen ? "none" : "block",
//               md: "none",
//             },
//           }}
//         />

//         {/* =========================================================
//             ACTIONS
//            ========================================================= */}
//         <Stack
//           direction="row"
//           spacing={{
//             xs: 0.25,
//             sm: 0.5,
//             md: 0.75,
//           }}
//           sx={{
//             alignItems: "center",
//             flexShrink: 0,
//           }}
//         >
//           {/* =======================================================
//               MOBILE SEARCH ICON
//              ======================================================= */}
//           <Tooltip title="Search" arrow>
//             <IconButton
//               size="small"
//               onClick={handleMobileSearchOpen}
//               sx={{
//                 display: {
//                   xs: mobileSearchOpen ? "none" : "inline-flex",
//                   md: "none",
//                 },
//               }}
//               aria-label="Open search"
//             >
//               <SearchIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           {/* =======================================================
//               DESKTOP LIVE NEURAL MONITOR
//              ======================================================= */}
//           <Box
//             sx={{
//               display: {
//                 xs: "none",
//                 md: "block",
//               },
//             }}
//           >
//             <Tooltip title="Live Neural Monitor" arrow>
//               <Box
//                 component="button"
//                 type="button"
//                 onClick={handleNeuralOpen}
//                 sx={{
//                   height: 42,
//                   minWidth: {
//                     md: 210,
//                     lg: 260,
//                   },

//                   px: 1.5,

//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "space-between",
//                   gap: 1,

//                   border: "1px solid",
//                   borderColor: "divider",
//                   borderRadius: 2,

//                   backgroundColor: "background.paper",
//                   color: "text.primary",

//                   cursor: "pointer",

//                   "&:hover": {
//                     backgroundColor: "action.hover",
//                   },
//                 }}
//               >
//                 <Stack
//                   direction="row"
//                   spacing={0.75}
//                   sx={{
//                     alignItems: "center",
//                     minWidth: 0,
//                   }}
//                 >
//                   {/* Neural status circles */}
//                   <Stack
//                     direction="row"
//                     spacing={-0.45}
//                     sx={{
//                       flexShrink: 0,
//                     }}
//                   >
//                     <Box
//                       sx={{
//                         width: 20,
//                         height: 20,
//                         borderRadius: "50%",
//                         backgroundColor: "#2563EB",
//                         color: "#FFFFFF",
//                         display: "grid",
//                         placeItems: "center",
//                         fontSize: 9,
//                         fontWeight: 800,
//                         border: "2px solid",
//                         borderColor: "background.paper",
//                       }}
//                     >
//                       A
//                     </Box>

//                     <Box
//                       sx={{
//                         width: 20,
//                         height: 20,
//                         borderRadius: "50%",
//                         backgroundColor: "#14B8A6",
//                         color: "#FFFFFF",
//                         display: "grid",
//                         placeItems: "center",
//                         fontSize: 9,
//                         fontWeight: 800,
//                         border: "2px solid",
//                         borderColor: "background.paper",
//                       }}
//                     >
//                       I
//                     </Box>

//                     <Box
//                       sx={{
//                         width: 20,
//                         height: 20,
//                         borderRadius: "50%",
//                         backgroundColor: "#F59E0B",
//                         color: "#FFFFFF",
//                         display: "grid",
//                         placeItems: "center",
//                         fontSize: 9,
//                         fontWeight: 800,
//                         border: "2px solid",
//                         borderColor: "background.paper",
//                       }}
//                     >
//                       R
//                     </Box>
//                   </Stack>

//                   <Typography
//                     variant="caption"
//                     sx={{
//                       fontWeight: 800,
//                       letterSpacing: "0.04em",
//                       whiteSpace: "nowrap",
//                     }}
//                   >
//                     LIVE NEURAL MONITOR
//                   </Typography>
//                 </Stack>

//                 <ExpandMoreIcon
//                   sx={{
//                     fontSize: 18,
//                     transform: neuralOpen
//                       ? "rotate(180deg)"
//                       : "none",
//                     transition: "transform 150ms ease",
//                   }}
//                 />
//               </Box>
//             </Tooltip>
//           </Box>

//           {/* =======================================================
//               MOBILE NEURAL MONITOR ICON
//              ======================================================= */}
//           <Tooltip title="Live Neural Monitor" arrow>
//             <IconButton
//               size="small"
//               onClick={handleNeuralOpen}
//               sx={{
//                 display: {
//                   xs: "inline-flex",
//                   md: "none",
//                 },
//               }}
//               aria-label="Open neural monitor"
//             >
//               <MemoryIcon fontSize="small" />
//             </IconButton>
//           </Tooltip>

//           {/* =======================================================
//               THEME TOGGLE
//              ======================================================= */}
//           <Tooltip
//             title={isDark ? "Switch to light mode" : "Switch to dark mode"}
//             arrow
//           >
//             <IconButton
//               size="small"
//               onClick={toggleTheme}
//               aria-label={
//                 isDark
//                   ? "Switch to light mode"
//                   : "Switch to dark mode"
//               }
//             >
//               {isDark ? (
//                 <LightModeIcon fontSize="small" />
//               ) : (
//                 <DarkModeIcon fontSize="small" />
//               )}
//             </IconButton>
//           </Tooltip>

//           {/* =======================================================
//               NOTIFICATIONS
//              ======================================================= */}
//           <Tooltip title="Notifications" arrow>
//             <IconButton
//               size="small"
//               aria-label="Notifications"
//             >
//               <Badge
//                 color="error"
//                 variant="dot"
//                 overlap="circular"
//               >
//                 <NotificationsIcon fontSize="small" />
//               </Badge>
//             </IconButton>
//           </Tooltip>

//           {/* =======================================================
//               HQ TERMINAL
//              ======================================================= */}
//           <Box
//             sx={{
//               display: {
//                 xs: "none",
//                 md: "flex",
//               },

//               alignItems: "center",

//               ml: {
//                 md: 0.75,
//                 lg: 1,
//               },

//               pl: {
//                 md: 1.5,
//                 lg: 2,
//               },

//               borderLeft: "1px solid",
//               borderColor: "divider",
//             }}
//           >
//             <Stack
//               direction="row"
//               spacing={1}
//               sx={{ alignItems: "center" }}
//             >
//               <Stack
//                 spacing={0}
//                 sx={{
//                   display: {
//                     md: "none",
//                     lg: "flex",
//                   },
//                   textAlign: "right",
//                 }}
//               >
//                 <Typography
//                   sx={{
//                     fontSize: 11,
//                     lineHeight: 1.1,
//                     fontWeight: 800,
//                     color: "text.primary",
//                   }}
//                 >
//                   HQ TERMINAL
//                 </Typography>

//                 <Typography
//                   sx={{
//                     fontSize: 8,
//                     lineHeight: 1.2,
//                     fontWeight: 800,
//                     color: "primary.main",
//                     letterSpacing: "0.05em",
//                   }}
//                 >
//                   SECURE NODE 401
//                 </Typography>
//               </Stack>

//               <Box
//                 sx={{
//                   width: {
//                     md: 36,
//                     lg: 44,
//                   },

//                   height: {
//                     md: 36,
//                     lg: 44,
//                   },

//                   borderRadius: 1.5,

//                   backgroundColor: "primary.main",
//                   color: "#FFFFFF",

//                   display: "grid",
//                   placeItems: "center",

//                   boxShadow: (theme) =>
//                     `0 4px 12px ${theme.palette.primary.main}40`,
//                 }}
//               >
//                 <MonitorHeartIcon
//                   sx={{
//                     fontSize: {
//                       md: 20,
//                       lg: 24,
//                     },
//                   }}
//                 />
//               </Box>
//             </Stack>
//           </Box>
//         </Stack>
//       </Toolbar>

//       {/* ===========================================================
//           NEURAL MONITOR DROPDOWN
//          =========================================================== */}
//       <Menu
//         anchorEl={neuralAnchorEl}
//         open={neuralOpen}
//         onClose={handleNeuralClose}
//         anchorOrigin={{
//           vertical: "bottom",
//           horizontal: "right",
//         }}
//         transformOrigin={{
//           vertical: "top",
//           horizontal: "right",
//         }}
//         slotProps={{
//           paper: {
//             sx: {
//               mt: 1,
//               width: {
//                 xs: 280,
//                 sm: 320,
//               },

//               borderRadius: 2,
//               p: 1,
//             },
//           },
//         }}
//       >
//         <Box sx={{ px: 1.5, py: 1 }}>
//           <Stack
//             direction="row"
//             sx={{ alignItems: "center", justifyContent: "space-between" }}
//           >
//             <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
//               <MemoryIcon
//                 fontSize="small"
//                 color="primary"
//               />

//               <Typography
//                 variant="subtitle2"
//                 sx={{ fontWeight: 700 }}
//               >
//                 Neural Monitor
//               </Typography>
//             </Stack>

//             <Chip
//               label="LIVE"
//               size="small"
//               color="success"
//               variant="outlined"
//               sx={{
//                 height: 22,
//                 fontSize: 10,
//                 fontWeight: 800,
//               }}
//             />
//           </Stack>
//         </Box>

//         <Divider />

//         <MenuItem onClick={handleNeuralClose}>
//           <Stack spacing={0.25}>
//             <Typography variant="body2" sx={{ fontWeight: 600 }}>
//               AI inference engine
//             </Typography>

//             <Typography variant="caption" color="text.secondary">
//               Operational · 98.7% availability
//             </Typography>
//           </Stack>
//         </MenuItem>

//         <MenuItem onClick={handleNeuralClose}>
//           <Stack spacing={0.25}>
//             <Typography variant="body2" sx={{ fontWeight: 600 }}>
//               Document intelligence
//             </Typography>

//             <Typography variant="caption" color="text.secondary">
//               Processing normally
//             </Typography>
//           </Stack>
//         </MenuItem>

//         <MenuItem onClick={handleNeuralClose}>
//           <Stack spacing={0.25}>
//             <Typography variant="body2" sx={{ fontWeight: 600 }}>
//               Workflow intelligence
//             </Typography>

//             <Typography variant="caption" color="text.secondary">
//               4 active neural tasks
//             </Typography>
//           </Stack>
//         </MenuItem>
//       </Menu>
//     </AppBar>
//   );
// }

import { useState } from "react";
import type { MouseEvent } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import CloseIcon from "@mui/icons-material/Close";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";
import DarkModeIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeIcon from "@mui/icons-material/LightModeOutlined";
import ExpandMoreIcon from "@mui/icons-material/KeyboardArrowDown";
import MemoryIcon from "@mui/icons-material/MemoryOutlined";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeartOutlined";

import { AppInput } from "@/components/ui/AppInput";

import { DRAWER_WIDTH_COLLAPSED, DRAWER_WIDTH_EXPANDED, DRAWER_TRANSITION_MS } from "@/theme/theme";

import { useAppTheme } from "@/theme/AppThemeProvider";

interface AppTopBarProps {
  isPermanent: boolean;
  expanded: boolean;
  onToggleDrawer: () => void;
}

/**
 * Responsive application top bar.
 *
 * Desktop / Laptop:
 * - Sidebar collapse / expand button attached to sidebar edge
 * - Global search aligned to the left
 * - Right-side application actions
 * - Live Neural Monitor
 * - Theme toggle
 * - Notifications
 * - HQ Terminal
 *
 * Tablet / Mobile:
 * - Hamburger navigation button
 * - I-ERP logo
 * - Search
 * - Neural Monitor
 * - Theme toggle
 * - Notifications
 */
export function AppTopBar({ isPermanent, expanded, onToggleDrawer }: AppTopBarProps) {
  const drawerWidth = expanded ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED;

  const { mode, toggleTheme } = useAppTheme();

  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const [neuralAnchorEl, setNeuralAnchorEl] = useState<null | HTMLElement>(null);

  const neuralOpen = Boolean(neuralAnchorEl);

  const handleNeuralOpen = (event: MouseEvent<HTMLElement>) => {
    setNeuralAnchorEl(event.currentTarget);
  };

  const handleNeuralClose = () => {
    setNeuralAnchorEl(null);
  };

  const handleMobileSearchOpen = () => {
    setMobileSearchOpen(true);
  };

  const handleMobileSearchClose = () => {
    setMobileSearchOpen(false);
  };

  const isDark = mode === "dark";

  return (
    <>
      {/* =========================================================
          DESKTOP / LAPTOP SIDEBAR TOGGLE
          Attached directly to sidebar right edge
         ========================================================= */}
      {isPermanent && (
        <Box
          component="button"
          type="button"
          onClick={onToggleDrawer}
          aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
          sx={{
            position: "fixed",

            top: 30,

            left: expanded ? DRAWER_WIDTH_EXPANDED - 12 : DRAWER_WIDTH_COLLAPSED - 12,

            width: 24,
            height: 24,

            padding: 0,
            margin: 0,

            display: "flex",
            alignItems: "center",
            justifyContent: "center",

            borderRadius: "50%",

            border: "2px solid",
            borderColor: "background.paper",

            backgroundColor: "primary.main",
            color: "#FFFFFF",

            cursor: "pointer",

            zIndex: (theme) => theme.zIndex.drawer + 3,

            boxShadow: (theme) => `0 2px 8px ${theme.palette.primary.main}45`,

            transition: `
              left ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1),
              background-color 150ms ease,
              transform 150ms ease,
              box-shadow 150ms ease
            `,

            "&:hover": {
              backgroundColor: "primary.dark",

              transform: "scale(1.08)",

              boxShadow: (theme) => `0 3px 12px ${theme.palette.primary.main}60`,
            },

            "&:active": {
              transform: "scale(0.96)",
            },

            "&:focus-visible": {
              outline: "2px solid",
              outlineColor: "primary.light",
              outlineOffset: 2,
            },
          }}
        >
          {expanded ? (
            <ChevronLeftIcon
              sx={{
                fontSize: 17,
              }}
            />
          ) : (
            <ChevronRightIcon
              sx={{
                fontSize: 17,
              }}
            />
          )}
        </Box>
      )}

      {/* =========================================================
          APPLICATION TOP BAR
         ========================================================= */}
      <AppBar
        position="fixed"
        elevation={0}
        color="inherit"
        sx={{
          borderBottom: 1,
          borderColor: "divider",

          backgroundColor: "background.paper",

          width: isPermanent ? `calc(100% - ${drawerWidth}px)` : "100%",

          left: isPermanent ? `${drawerWidth}px` : 0,

          right: 0,

          transition: `
            width ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1),
            left ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)
          `,

          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar
          sx={{
            minHeight: {
              xs: 60,
              md: 64,
            },

            px: {
              xs: 1.5,
              sm: 2,
              md: 2.5,
              lg: 3,
            },

            gap: {
              xs: 0.5,
              sm: 1,
              md: 1.5,
            },
          }}
        >
          {/* =====================================================
              MOBILE / TABLET MENU BUTTON
             ===================================================== */}
          {!isPermanent && (
            <Tooltip title="Navigation" arrow>
              <IconButton
                onClick={onToggleDrawer}
                edge="start"
                aria-label="Open navigation"
                size="small"
                sx={{
                  flexShrink: 0,
                }}
              >
                <MenuIcon />
              </IconButton>
            </Tooltip>
          )}

          {/* =====================================================
              MOBILE / TABLET LOGO
             ===================================================== */}
          <Box
            sx={{
              display: {
                xs: mobileSearchOpen ? "none" : "flex",
                md: "none",
              },

              alignItems: "center",

              minWidth: 0,

              flexShrink: 0,

              ml: 0.5,
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  xs: "0.95rem",
                  sm: "1rem",
                },

                fontWeight: 800,

                letterSpacing: "-0.02em",

                color: "text.primary",

                whiteSpace: "nowrap",
              }}
            >
              I-ERP
            </Typography>
          </Box>

          {/* =====================================================
              MOBILE SEARCH INPUT
             ===================================================== */}
          {mobileSearchOpen && (
            <Box
              sx={{
                display: {
                  xs: "block",
                  md: "none",
                },

                flex: 1,

                minWidth: 0,

                ml: 0.5,
              }}
            >
              <AppInput
                autoFocus
                placeholder="Search records, documents, people…"
                size="small"

                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),

                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          size="small"
                          onClick={handleMobileSearchClose}
                          edge="end"
                          aria-label="Close search"
                        >
                          <CloseIcon fontSize="small" />
                        </IconButton>
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          )}

          {/* =====================================================
              DESKTOP SEARCH + RIGHT ACTIONS WRAPPER

              Search:
              - Starts immediately after left-side content
              - Uses available horizontal space
              - Automatically resizes when sidebar expands/collapses

              Actions:
              - Remain pinned to the right
              - Never shrink
             ===================================================== */}
          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },

              alignItems: "center",

              flex: 1,

              minWidth: 0,

              gap: {
                md: 1,
                lg: 1.5,
              },
            }}
          >
            {/* ===================================================
                DESKTOP GLOBAL SEARCH

                IMPORTANT:
                No ml:auto
                No fixed width

                Search automatically consumes available space
                between the left edge and right-side actions.
               =================================================== */}
            <Box
              sx={{
                flex: 1,
                minWidth: 0,
                maxWidth: {
                  md: 520,
                  lg: 650,
                  xl: 760,
                },
              }}
            >
              <AppInput
                fullWidth
                placeholder="Search records, documents, people…"
                size="small"
                sx={{
                  "& .MuiInputBase-root": {
                    minHeight: 38,
                    display: "flex",
                    alignItems: "center",
                  },

                  "& .MuiInputAdornment-root": {
                    display: "flex",
                    alignItems: "center",
                    marginTop: "0 !important",
                  },

                  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                    fontSize: 18,
                  },

                  "& input": {
                    fontFamily: '"Inter", "Segoe UI", sans-serif',
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    lineHeight: 1,
                    paddingTop: 0,
                    paddingBottom: 0,
                    height: "38px",
                    boxSizing: "border-box",
                    display: "flex",
                    alignItems: "center",
                  },

                  "& input::placeholder": {
                    fontFamily: '"Inter", "Segoe UI", sans-serif',
                    fontSize: "11px",
                    fontWeight: 700,
                    color: "#64748B",
                    textTransform: "uppercase",
                    opacity: 1,
                  },
                }}
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>

            {/* ===================================================
                RIGHT SIDE ACTIONS
               =================================================== */}
            <Stack
              direction="row"
              spacing={{
                xs: 0.25,
                sm: 0.5,
                md: 0.75,
              }}
              sx={{
                alignItems: "center",

                flexShrink: 0,

                ml: "auto",
              }}
            >
              {/* ===============================================
                  DESKTOP LIVE NEURAL MONITOR
                 =============================================== */}
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                  },
                }}
              >
                <Tooltip title="Live Neural Monitor" arrow>
                  <Box
                    component="button"
                    type="button"
                    onClick={handleNeuralOpen}
                    sx={{
                      height: 42,

                      minWidth: {
                        md: 210,
                        lg: 260,
                      },

                      px: 1.5,

                      display: "flex",

                      alignItems: "center",

                      justifyContent: "space-between",

                      gap: 1,

                      border: "1px solid",

                      borderColor: "divider",

                      borderRadius: 2,

                      backgroundColor: "background.paper",

                      color: "text.primary",

                      cursor: "pointer",

                      "&:hover": {
                        backgroundColor: "action.hover",
                      },
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={0.75}
                      sx={{
                        alignItems: "center",

                        minWidth: 0,
                      }}
                    >
                      {/* Neural status circles */}
                      <Stack
                        direction="row"
                        spacing={-0.45}
                        sx={{
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          sx={{
                            width: 20,
                            height: 20,

                            borderRadius: "50%",

                            backgroundColor: "#2563EB",

                            color: "#FFFFFF",

                            display: "grid",

                            placeItems: "center",

                            fontSize: 9,

                            fontWeight: 800,

                            border: "2px solid",

                            borderColor: "background.paper",
                          }}
                        >
                          A
                        </Box>

                        <Box
                          sx={{
                            width: 20,
                            height: 20,

                            borderRadius: "50%",

                            backgroundColor: "#14B8A6",

                            color: "#FFFFFF",

                            display: "grid",

                            placeItems: "center",

                            fontSize: 9,

                            fontWeight: 800,

                            border: "2px solid",

                            borderColor: "background.paper",
                          }}
                        >
                          I
                        </Box>

                        <Box
                          sx={{
                            width: 20,
                            height: 20,

                            borderRadius: "50%",

                            backgroundColor: "#F59E0B",

                            color: "#FFFFFF",

                            display: "grid",

                            placeItems: "center",

                            fontSize: 9,

                            fontWeight: 800,

                            border: "2px solid",

                            borderColor: "background.paper",
                          }}
                        >
                          R
                        </Box>
                      </Stack>

                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 800,
                          fontSize: "10px",
                          fontFamily: "Inter",

                          letterSpacing: "0.04em",

                          whiteSpace: "nowrap",
                        }}
                      >
                        LIVE NEURAL MONITOR
                      </Typography>
                    </Stack>

                    <ExpandMoreIcon
                      sx={{
                        fontSize: 18,

                        transform: neuralOpen ? "rotate(180deg)" : "none",

                        transition: "transform 150ms ease",
                      }}
                    />
                  </Box>
                </Tooltip>
              </Box>

              {/* ===============================================
                  MOBILE NEURAL MONITOR
                 =============================================== */}
              <Tooltip title="Live Neural Monitor" arrow>
                <IconButton
                  size="small"
                  onClick={handleNeuralOpen}
                  sx={{
                    display: {
                      xs: "inline-flex",
                      md: "none",
                    },
                  }}
                  aria-label="Open neural monitor"
                >
                  <MemoryIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              {/* ===============================================
                  THEME TOGGLE
                 =============================================== */}
              <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"} arrow>
                <IconButton
                  size="small"
                  onClick={toggleTheme}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
                </IconButton>
              </Tooltip>

              {/* ===============================================
                  NOTIFICATIONS
                 =============================================== */}
              <Tooltip title="Notifications" arrow>
                <IconButton size="small" aria-label="Notifications">
                  <Badge color="error" variant="dot" overlap="circular">
                    <NotificationsIcon fontSize="small" />
                  </Badge>
                </IconButton>
              </Tooltip>

              {/* ===============================================
                  HQ TERMINAL
                 =============================================== */}
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },

                  alignItems: "center",

                  ml: {
                    md: 0.75,
                    lg: 1,
                  },

                  pl: {
                    md: 1.5,
                    lg: 2,
                  },

                  borderLeft: "1px solid",

                  borderColor: "divider",
                }}
              >
                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    alignItems: "center",
                  }}
                >
                  {/* Terminal text */}
                  <Stack
                    spacing={0}
                    sx={{
                      display: {
                        md: "none",
                        lg: "flex",
                      },

                      textAlign: "right",
                    }}
                  >
                    <Typography
                      sx={{
                        fontSize: 11,

                        lineHeight: 1.1,

                        fontWeight: 800,

                        color: "text.primary",
                      }}
                    >
                      HQ TERMINAL
                    </Typography>

                    <Typography
                      sx={{
                        fontSize: 8,

                        lineHeight: 1.2,

                        fontWeight: 800,

                        color: "primary.main",

                        letterSpacing: "0.05em",
                      }}
                    >
                      SECURE NODE 401
                    </Typography>
                  </Stack>

                  {/* Terminal icon */}
                  <Box
                    sx={{
                      width: {
                        md: 36,
                        lg: 44,
                      },

                      height: {
                        md: 36,
                        lg: 44,
                      },

                      borderRadius: 1.5,

                      backgroundColor: "primary.main",

                      color: "#FFFFFF",

                      display: "grid",

                      placeItems: "center",

                      boxShadow: (theme) => `0 4px 12px ${theme.palette.primary.main}40`,
                    }}
                  >
                    <MonitorHeartIcon
                      sx={{
                        fontSize: {
                          md: 20,
                          lg: 24,
                        },
                      }}
                    />
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Box>

          {/* =====================================================
              MOBILE SPACER
             ===================================================== */}
          <Box
            sx={{
              flex: 1,

              display: {
                xs: mobileSearchOpen ? "none" : "block",
                md: "none",
              },
            }}
          />

          {/* =====================================================
              MOBILE ACTIONS
             ===================================================== */}
          <Stack
            direction="row"
            spacing={{
              xs: 0.25,
              sm: 0.5,
            }}
            sx={{
              alignItems: "center",

              flexShrink: 0,

              display: {
                xs: "flex",
                md: "none",
              },
            }}
          >
            {/* Mobile Search */}
            <Tooltip title="Search" arrow>
              <IconButton
                size="small"
                onClick={handleMobileSearchOpen}
                sx={{
                  display: {
                    xs: mobileSearchOpen ? "none" : "inline-flex",
                    md: "none",
                  },
                }}
                aria-label="Open search"
              >
                <SearchIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Mobile Neural Monitor */}
            <Tooltip title="Live Neural Monitor" arrow>
              <IconButton
                size="small"
                onClick={handleNeuralOpen}
                sx={{
                  display: {
                    xs: "inline-flex",
                    md: "none",
                  },
                }}
                aria-label="Open neural monitor"
              >
                <MemoryIcon fontSize="small" />
              </IconButton>
            </Tooltip>

            {/* Mobile Theme Toggle */}
            <Tooltip title={isDark ? "Switch to light mode" : "Switch to dark mode"} arrow>
              <IconButton
                size="small"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              >
                {isDark ? <LightModeIcon fontSize="small" /> : <DarkModeIcon fontSize="small" />}
              </IconButton>
            </Tooltip>

            {/* Mobile Notifications */}
            <Tooltip title="Notifications" arrow>
              <IconButton size="small" aria-label="Notifications">
                <Badge color="error" variant="dot" overlap="circular">
                  <NotificationsIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>

        {/* =========================================================
            NEURAL MONITOR DROPDOWN
           ========================================================= */}
        <Menu
          anchorEl={neuralAnchorEl}
          open={neuralOpen}
          onClose={handleNeuralClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          slotProps={{
            paper: {
              sx: {
                mt: 1,

                width: {
                  xs: 280,
                  sm: 320,
                },

                borderRadius: 2,

                p: 1,
              },
            },
          }}
        >
          {/* =====================================================
              DROPDOWN HEADER
             ===================================================== */}
          <Box
            sx={{
              px: 1.5,
              py: 1,
            }}
          >
            <Stack
              direction="row"
              sx={{
                alignItems: "center",

                justifyContent: "space-between",
              }}
            >
              <Stack
                direction="row"
                spacing={1}
                sx={{
                  alignItems: "center",
                }}
              >
                <MemoryIcon fontSize="small" color="primary" />

                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Neural Monitor
                </Typography>
              </Stack>

              <Chip
                label="LIVE"
                size="small"
                color="success"
                variant="outlined"
                sx={{
                  height: 22,

                  fontSize: 10,

                  fontWeight: 800,
                }}
              />
            </Stack>
          </Box>

          <Divider />

          {/* =====================================================
              AI INFERENCE ENGINE
             ===================================================== */}
          <MenuItem onClick={handleNeuralClose}>
            <Stack spacing={0.25}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                }}
              >
                AI inference engine
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Operational · 98.7% availability
              </Typography>
            </Stack>
          </MenuItem>

          {/* =====================================================
              DOCUMENT INTELLIGENCE
             ===================================================== */}
          <MenuItem onClick={handleNeuralClose}>
            <Stack spacing={0.25}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                }}
              >
                Document intelligence
              </Typography>

              <Typography variant="caption" color="text.secondary">
                Processing normally
              </Typography>
            </Stack>
          </MenuItem>

          {/* =====================================================
              WORKFLOW INTELLIGENCE
             ===================================================== */}
          <MenuItem onClick={handleNeuralClose}>
            <Stack spacing={0.25}>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                }}
              >
                Workflow intelligence
              </Typography>

              <Typography variant="caption" color="text.secondary">
                4 active neural tasks
              </Typography>
            </Stack>
          </MenuItem>
        </Menu>
      </AppBar>
    </>
  );
}
