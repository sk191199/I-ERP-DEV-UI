import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Badge from "@mui/material/Badge";
import Tooltip from "@mui/material/Tooltip";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import SearchIcon from "@mui/icons-material/SearchOutlined";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";
import HelpIcon from "@mui/icons-material/HelpOutlineOutlined";
import AppsIcon from "@mui/icons-material/AppsOutlined";
import { AppInput } from "@/components/ui/AppInput";
import { AppBreadcrumbs } from "./AppBreadcrumbs";
import {
  DRAWER_WIDTH_COLLAPSED,
  DRAWER_WIDTH_EXPANDED,
  DRAWER_TRANSITION_MS,
} from "@/theme/theme";

interface AppTopBarProps {
  isPermanent: boolean;
  expanded: boolean;
  onToggleDrawer: () => void;
}

/** Responsive AppBar that resizes with the drawer. */
export function AppTopBar({ isPermanent, expanded, onToggleDrawer }: AppTopBarProps) {
  const drawerWidth = expanded ? DRAWER_WIDTH_EXPANDED : DRAWER_WIDTH_COLLAPSED;

  return (
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
        transition: `width ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), left ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
      }}
    >
      <Toolbar sx={{ gap: 1.5, minHeight: { xs: 60, md: 64 } }}>
        <IconButton
          onClick={onToggleDrawer}
          edge="start"
          aria-label="Toggle navigation"
          size="small"
        >
          {isPermanent && expanded ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>

        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <AppBreadcrumbs />
        </Box>

        <Box sx={{ flex: 1 }} />

        <Box sx={{ width: { xs: 0, sm: 200, lg: 320 }, display: { xs: "none", sm: "block" } }}>
          <AppInput
            placeholder="Search records, documents, people…"
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

        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
          <Tooltip title="Search" arrow>
            <IconButton size="small" sx={{ display: { xs: "inline-flex", sm: "none" } }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="App switcher" arrow>
            <IconButton size="small" sx={{ display: { xs: "none", md: "inline-flex" } }}>
              <AppsIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Notifications" arrow>
            <IconButton size="small">
              <Badge color="error" variant="dot">
                <NotificationsIcon fontSize="small" />
              </Badge>
            </IconButton>
          </Tooltip>
          <Tooltip title="Help" arrow>
            <IconButton size="small" sx={{ display: { xs: "none", md: "inline-flex" } }}>
              <HelpIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
