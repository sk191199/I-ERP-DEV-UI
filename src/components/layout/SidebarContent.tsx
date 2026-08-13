import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";
import HubIcon from "@mui/icons-material/HubOutlined";
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  navigation,
  type NavItem,
} from "@/features/navigation/navigation.config";
import { useSession } from "@/features/auth/SessionProvider";
import { sidebarTokens as t } from "@/theme/theme";

interface SidebarContentProps {
  expanded: boolean;
  onNavigate?: () => void;
  onLogout: () => void;
}

function isItemActive(item: NavItem, pathname: string): boolean {
  if (item.path === "/") return pathname === "/";
  if (item.path && (pathname === item.path || pathname.startsWith(`${item.path}/`)))
    return true;
  return Boolean(item.children?.some((c) => c.path === pathname));
}

/**
 * Drawer body shared by the permanent mini-variant drawer and the temporary
 * mobile/tablet drawer, so navigation is never duplicated.
 */
export function SidebarContent({
  expanded,
  onNavigate,
  onLogout,
}: SidebarContentProps) {
  const { pathname } = useLocation();
  const { user, hasAnyPermission } = useSession();

  const items = useMemo(
    () =>
      navigation
        .filter((item) => hasAnyPermission(item.permissions))
        .map((item) => {
          if (!item.children) return item;
          return {
            ...item,
            children: item.children.filter((c) => hasAnyPermission(c.permissions)),
          };
        }),
    [hasAnyPermission],
  );

  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});

  // Auto-open the group that owns the current route.
  useEffect(() => {
    const active = items.find((item) => isItemActive(item, pathname));
    if (active?.children?.length) {
      setOpenGroups((prev) => ({ ...prev, [active.id]: true }));
    }
  }, [pathname, items]);

  const linkSx = (active: boolean) => ({
    minHeight: 44,
    mx: 1,
    px: expanded ? 1.5 : 1.25,
    borderRadius: 2,
    color: active ? t.textStrong : t.text,
    backgroundColor: active ? t.activeBg : "transparent",
    justifyContent: expanded ? "flex-start" : "center",
    "&:hover": { backgroundColor: active ? t.activeBg : t.hover },
  });

  return (
    <Stack sx={{ height: "100%", backgroundColor: t.bg, color: t.text }}>
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
          minHeight: 64,
          px: expanded ? 2.5 : 0,
          justifyContent: expanded ? "flex-start" : "center",
        }}
      >
        <Avatar
          variant="rounded"
          sx={{ bgcolor: t.activeBg, width: 34, height: 34, flexShrink: 0 }}
        >
          <HubIcon fontSize="small" />
        </Avatar>
        {expanded && (
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" noWrap sx={{ color: t.textStrong , fontWeight:"bold"}}>
              I-ERP
            </Typography>
            <Typography variant="caption" noWrap sx={{ color: t.textMuted, letterSpacing: "3px", textTransform: "uppercase", }}>
              Intelligent
            </Typography>
          </Box>
        )}
      </Stack>
      <Divider sx={{ borderColor: t.divider }} />

      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          overflowX: "hidden",
          py: 1,
          scrollbarWidth: "thin",
          scrollbarColor: `${t.divider} transparent`,
          "&::-webkit-scrollbar": {
            width: 6,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "transparent",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: t.divider,
            borderRadius: 999,
          },
          "&::-webkit-scrollbar-thumb:hover": {
            backgroundColor: t.textMuted,
          },
        }}
      >
        <List
          disablePadding
          subheader={
            expanded ? (
              <ListSubheader
                sx={{
                  backgroundColor: "transparent",
                  color: t.textMuted,
                  fontSize: "0.6875rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  lineHeight: 2.5,
                }}
              >
                Modules
              </ListSubheader>
            ) : undefined
          }
        >
          {items.map((item) => {
            const active = isItemActive(item, pathname);
            const hasChildren = Boolean(item.children?.length);
            const groupOpen = expanded && Boolean(openGroups[item.id]);

            const icon = item.icon ? <item.icon fontSize="small" /> : null;

            const button = hasChildren ? (
              <ListItemButton
                onClick={() =>
                  expanded
                    ? setOpenGroups((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                    : undefined
                }
                component={expanded ? "div" : Link}
                {...(expanded ? {} : { to: item.path ?? "/", onClick: onNavigate })}
                sx={linkSx(active)}
              >
                <ListItemIcon
                  sx={{ minWidth: expanded ? 36 : 0, color: "inherit" }}
                >
                  {icon}
                </ListItemIcon>
                {expanded && (
                  <>
                    <ListItemText
                      primary={item.label}
                      slotProps={{ primary: { variant: "body2", sx: { fontWeight: 600 } } }}
                    />
                    {groupOpen ? (
                      <ExpandLess fontSize="small" />
                    ) : (
                      <ExpandMore fontSize="small" />
                    )}
                  </>
                )}
              </ListItemButton>
            ) : (
              <ListItemButton
                component={Link}
                to={item.path ?? "/"}
                onClick={onNavigate}
                sx={linkSx(active)}
              >
                <ListItemIcon sx={{ minWidth: expanded ? 36 : 0, color: "inherit" }}>
                  {icon}
                </ListItemIcon>
                {expanded && (
                  <ListItemText
                    primary={item.label}
                    slotProps={{ primary: { variant: "body2", sx: { fontWeight: 600 } } }}
                  />
                )}
              </ListItemButton>
            );

            return (
              <Box key={item.id}>
                {expanded ? (
                  button
                ) : (
                  <Tooltip title={item.label} placement="right" arrow>
                    <Box>{button}</Box>
                  </Tooltip>
                )}

                {hasChildren && (
                  <Collapse in={groupOpen} timeout={300} unmountOnExit>
                    <List disablePadding sx={{ mt: 0.25 }}>
                      {item.children?.map((sub) => {
                        const subActive = pathname === sub.path;
                        return (
                          <ListItemButton
                            key={sub.id}
                            component={Link}
                            to={sub.path ?? "/"}
                            onClick={onNavigate}
                            sx={{
                              minHeight: 36,
                              mx: 1,
                              pl: 6,
                              borderRadius: 2,
                              color: subActive ? t.textStrong : t.text,
                              backgroundColor: subActive
                                ? t.activeBgSoft
                                : "transparent",
                              "&:hover": {
                                backgroundColor: subActive
                                  ? t.activeBgSoft
                                  : t.hover,
                              },
                            }}
                          >
                            <ListItemText
                              primary={sub.label}
                              slotProps={{ primary: { variant: "body2" } }}
                            />
                          </ListItemButton>
                        );
                      })}
                    </List>
                  </Collapse>
                )}
              </Box>
            );
          })}
        </List>
      </Box>

      <Divider sx={{ borderColor: t.divider }} />
      <Stack
        direction="row"
        spacing={1.5}
        sx={{
          alignItems: "center",
          px: expanded ? 2 : 0,
          py: 1.5,
          justifyContent: expanded ? "flex-start" : "center",
          backgroundColor: t.bgElevated,
        }}
      >
        <Tooltip title={expanded ? "" : user.name} placement="right" arrow>
          <Avatar sx={{ width: 34, height: 34, bgcolor: t.activeBgSoft, color: t.textStrong, fontSize: 13, fontWeight: 700 }}>
            {user.initials}
          </Avatar>
        </Tooltip>
        {expanded && (
          <>
            <Box sx={{ minWidth: 0, flex: 1 }}>
              <Typography variant="body2" noWrap sx={{ color: t.textStrong, fontWeight: 600 }}>
                {user.name}
              </Typography>
              <Typography variant="caption" noWrap sx={{ color: t.textMuted, display: "block" }}>
                {user.role}
              </Typography>
            </Box>
            <Tooltip title="Log out" arrow>
              <IconButton size="small" onClick={onLogout} sx={{ color: t.text }}>
                <LogoutIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          </>
        )}
      </Stack>
      {!expanded && (
        <Tooltip title="Log out" placement="right" arrow>
          <IconButton
            onClick={onLogout}
            sx={{ color: t.text, mx: "auto", mb: 1.5 }}
            size="small"
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      )}
    </Stack>
  );
}
