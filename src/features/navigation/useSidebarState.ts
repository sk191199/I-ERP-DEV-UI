import { useCallback, useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const STORAGE_KEY = "erp.sidebar.expanded";

export type DeviceClass = "smallMobile" | "mobile" | "tablet" | "laptop" | "desktop";

export interface SidebarState {
  device: DeviceClass;
  /** true when the drawer is a permanent mini-variant drawer */
  isPermanent: boolean;
  expanded: boolean;
  toggleExpanded: () => void;
  mobileOpen: boolean;
  openMobile: () => void;
  closeMobile: () => void;
}

/**
 * Owns responsive drawer behaviour + persistence of the expanded/collapsed
 * preference. Reads storage after hydration to avoid SSR mismatches.
 */
export function useSidebarState(): SidebarState {
  const theme = useTheme();
  const isDesktop = useMediaQuery("(min-width:1440px)", { noSsr: false });
  const isLaptop = useMediaQuery("(min-width:1024px) and (max-width:1439.95px)");
  const isTablet = useMediaQuery("(min-width:768px) and (max-width:1023.95px)");
  const isSmallMobile = useMediaQuery("(max-width:479.95px)");
  void theme;

  const device: DeviceClass = isDesktop
    ? "desktop"
    : isLaptop
      ? "laptop"
      : isTablet
        ? "tablet"
        : isSmallMobile
          ? "smallMobile"
          : "mobile";

  const isPermanent = device === "desktop" || device === "laptop";

  const [expanded, setExpanded] = useState(true);
  const [restored, setRestored] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Restore persisted preference once on the client.
  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored !== null) setExpanded(stored === "true");
    setRestored(true);
  }, []);

  // Device defaults apply only when the user has no stored preference.
  useEffect(() => {
    if (!restored) return;
    if (window.localStorage.getItem(STORAGE_KEY) !== null) return;
    setExpanded(device === "desktop");
  }, [restored, device]);

  useEffect(() => {
    if (isPermanent) setMobileOpen(false);
  }, [isPermanent]);

  const toggleExpanded = useCallback(() => {
    setExpanded((prev) => {
      const next = !prev;
      window.localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  return {
    device,
    isPermanent,
    expanded,
    toggleExpanded,
    mobileOpen,
    openMobile: useCallback(() => setMobileOpen(true), []),
    closeMobile: useCallback(() => setMobileOpen(false), []),
  };
}
