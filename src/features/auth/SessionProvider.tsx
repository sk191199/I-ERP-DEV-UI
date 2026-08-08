import { createContext, useContext, useMemo, type ReactNode } from "react";

export interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
  permissions: string[];
}

/** Demo identity. Swap this provider for a real session source later. */
const DEMO_USER: CurrentUser = {
  id: "u-1001",
  name: "Aarav Mehta",
  email: "aarav.mehta@northwind-erp.com",
  role: "Operations Controller",
  initials: "AM",
  permissions: [
    "crm.view",
    "sales.view",
    "purchase.view",
    "inventory.view",
    "finance.view",
    "finance.manage",
    "hr.view",
    "projects.view",
    "workflow.view",
    "reports.view",
    "admin.view",
  ],
};

interface SessionValue {
  user: CurrentUser;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions?: string[]) => boolean;
}

const SessionContext = createContext<SessionValue | null>(null);

export function SessionProvider({ children }: { children: ReactNode }) {
  const value = useMemo<SessionValue>(() => {
    const set = new Set(DEMO_USER.permissions);
    const hasPermission = (permission: string) => set.has(permission);
    return {
      user: DEMO_USER,
      hasPermission,
      hasAnyPermission: (permissions) =>
        !permissions || permissions.length === 0 || permissions.some(hasPermission),
    };
  }, []);

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
}

export function useSession(): SessionValue {
  const ctx = useContext(SessionContext);
  if (!ctx) throw new Error("useSession must be used inside <SessionProvider>");
  return ctx;
}
