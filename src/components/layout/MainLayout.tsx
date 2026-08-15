import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import type { ReactNode } from "react";
import { SidebarContent } from "./SidebarContent";
import { AppTopBar } from "./AppTopBar";
import { AppBreadcrumbs } from "./AppBreadcrumbs";
import { PageHeader, type PageHeaderProps } from "./PageHeader";
import { AIAssistant } from "./AIAssistant";
import { useSidebarState } from "@/features/navigation/useSidebarState";
import {
  DRAWER_WIDTH_COLLAPSED,
  DRAWER_WIDTH_EXPANDED,
  DRAWER_TRANSITION_MS,
  sidebarTokens,
} from "@/theme/theme";

export interface MainLayoutProps extends PageHeaderProps {
  children: ReactNode;
  /** Hide the optional footer for immersive screens. */
  disableFooter?: boolean;
}

/**
 * The single application shell. Every page must render inside MainLayout:
 * mini variant drawer + responsive AppBar + breadcrumbs + page header +
 * content container + footer.
 */
export function MainLayout({
  children,
  disableFooter = false,
  ...header
}: MainLayoutProps) {
  const hasPageHeader = Boolean(
    header.title.trim() ||
      header.description ||
      header.status ||
      header.actions,
  );

  const sidebar = useSidebarState();
  const drawerWidth = sidebar.expanded
    ? DRAWER_WIDTH_EXPANDED
    : DRAWER_WIDTH_COLLAPSED;

  const handleLogout = () => {
    window.location.assign("/");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "background.default" }}>
      <AppTopBar
        isPermanent={sidebar.isPermanent}
        expanded={sidebar.expanded}
        onToggleDrawer={
          sidebar.isPermanent ? sidebar.toggleExpanded : sidebar.openMobile
        }
      />

      {sidebar.isPermanent ? (
        <Drawer
          variant="permanent"
          open
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              overflowX: "hidden",
              borderRight: "none",
              backgroundColor: sidebarTokens.bg,
              transition: `width ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
            },
            transition: `width ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
          }}
        >
          <SidebarContent expanded={sidebar.expanded} onLogout={handleLogout} />
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={sidebar.mobileOpen}
          onClose={sidebar.closeMobile}
          ModalProps={{ keepMounted: true }}
          sx={{
            "& .MuiDrawer-paper": {
              width: sidebar.device === "smallMobile" ? 248 : DRAWER_WIDTH_EXPANDED,
              backgroundColor: sidebarTokens.bg,
              borderRight: "none",
            },
          }}
        >
          {/* Temporary drawer always shows labels; closes on selection. */}
          <SidebarContent
            expanded
            onNavigate={sidebar.closeMobile}
            onLogout={handleLogout}
          />
        </Drawer>
      )}

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          display: "flex",
          flexDirection: "column",
          transition: `all ${DRAWER_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`,
        }}
      >
        <Toolbar sx={{ minHeight: { xs: 60, md: 64 } }} />

        <Box
          sx={{
            flex: 1,
            width: "100%",
            maxWidth: 1600,
            mx: "auto",

            // Horizontal spacing
            px: { xs: 2, sm: 3, lg: 4 },

            // Reduce unnecessary vertical space
            pt: { xs: 1.5, md: 1.5 },
            pb: { xs: 2, md: 3 },
          }}
        >
          <Stack spacing={{ xs: 1.5, md: 2 }}>
            <Box sx={{ display: { xs: "block", md: "none" } }}>
              <AppBreadcrumbs />
            </Box>
            {hasPageHeader && <PageHeader {...header} />}
            <Box>{children}</Box>
          </Stack>
        </Box>

        {!disableFooter && (
          <Box component="footer" sx={{ mt: 4 }}>
            <Divider />
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={1}
              sx={{
                alignItems: { sm: "center" },
                justifyContent: "space-between",
                px: { xs: 2, sm: 3, lg: 4 },
                py: 2,
                maxWidth: 1600,
                mx: "auto",
                width: "100%",
              }}
            >
              <Typography variant="caption" color="text.secondary">
                © {new Date().getFullYear()} I-ERP · Intelligent
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Environment: Production · Region: eu-central-1
              </Typography>
            </Stack>
          </Box>
        )}
      </Box>

      <AIAssistant />
    </Box>
  );
}
