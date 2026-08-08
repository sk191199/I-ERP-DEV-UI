import DashboardIcon from "@mui/icons-material/SpaceDashboardOutlined";
import CrmIcon from "@mui/icons-material/ContactPhoneOutlined";
import SalesIcon from "@mui/icons-material/TrendingUpOutlined";
import PurchaseIcon from "@mui/icons-material/ShoppingCartOutlined";
import InventoryIcon from "@mui/icons-material/Inventory2Outlined";
import FinanceIcon from "@mui/icons-material/AccountBalanceOutlined";
import HrIcon from "@mui/icons-material/GroupsOutlined";
import ProjectsIcon from "@mui/icons-material/FolderSpecialOutlined";
import WorkflowIcon from "@mui/icons-material/AccountTreeOutlined";
import ReportsIcon from "@mui/icons-material/AssessmentOutlined";
import AdminIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import SettingsIcon from "@mui/icons-material/SettingsOutlined";
import AiIcon from "@mui/icons-material/AutoAwesomeOutlined";
import type { SvgIconComponent } from "@mui/icons-material";

export type Permission = string;

export interface NavItem {
  id: string;
  label: string;
  path?: string;
  icon?: SvgIconComponent;
  permissions?: Permission[];
  children?: NavItem[];
}

const child = (
  parent: string,
  slug: string,
  label: string,
  permissions?: Permission[],
): NavItem => ({
  id: `${parent}.${slug}`,
  label,
  path: `/${parent}/${slug}`,
  ...(permissions ? { permissions } : {}),
});

export const navigation: NavItem[] = [
  { id: "dashboard", label: "Dashboard", path: "/", icon: DashboardIcon },
  {
    id: "crm",
    label: "CRM",
    icon: CrmIcon,
    path: "/crm",
    permissions: ["crm.view"],
    children: [
      child("crm", "leads", "Leads"),
      child("crm", "opportunities", "Opportunities"),
      child("crm", "accounts", "Accounts"),
      child("crm", "activities", "Activities"),
    ],
  },
  {
    id: "sales",
    label: "Sales",
    icon: SalesIcon,
    path: "/sales",
    permissions: ["sales.view"],
    children: [
      child("sales", "quotations", "Quotations"),
      child("sales", "orders", "Sales Orders"),
      child("sales", "invoices", "Invoices"),
      child("sales", "pricing", "Price Lists"),
    ],
  },
  {
    id: "purchase",
    label: "Purchase",
    icon: PurchaseIcon,
    path: "/purchase",
    permissions: ["purchase.view"],
    children: [
      child("purchase", "requisitions", "Requisitions"),
      child("purchase", "orders", "Purchase Orders"),
      child("purchase", "vendors", "Vendors"),
      child("purchase", "bills", "Vendor Bills"),
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: InventoryIcon,
    path: "/inventory",
    permissions: ["inventory.view"],
    children: [
      child("inventory", "items", "Items"),
      child("inventory", "warehouses", "Warehouses"),
      child("inventory", "movements", "Stock Movements"),
      child("inventory", "adjustments", "Adjustments"),
    ],
  },
  {
    id: "finance",
    label: "Finance",
    icon: FinanceIcon,
    path: "/finance",
    permissions: ["finance.view"],
    children: [
      child("finance", "journals", "Journal Entries"),
      child("finance", "ledger", "General Ledger"),
      child("finance", "payments", "Payments"),
      child("finance", "taxes", "Tax Configuration", ["finance.manage"]),
    ],
  },
  {
    id: "hr",
    label: "HR",
    icon: HrIcon,
    path: "/hr",
    permissions: ["hr.view"],
    children: [
      child("hr", "employees", "Employees"),
      child("hr", "attendance", "Attendance"),
      child("hr", "leave", "Leave Requests"),
      child("hr", "payroll", "Payroll", ["hr.payroll"]),
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: ProjectsIcon,
    path: "/projects",
    permissions: ["projects.view"],
    children: [
      child("projects", "portfolio", "Portfolio"),
      child("projects", "tasks", "Tasks"),
      child("projects", "timesheets", "Timesheets"),
    ],
  },
  {
    id: "workflow",
    label: "Workflow",
    icon: WorkflowIcon,
    path: "/workflow",
    permissions: ["workflow.view"],
    children: [
      child("workflow", "designer", "Process Designer"),
      child("workflow", "approvals", "My Approvals"),
      child("workflow", "rules", "Business Rules"),
    ],
  },
  {
    id: "reports",
    label: "Reports",
    icon: ReportsIcon,
    path: "/reports",
    permissions: ["reports.view"],
    children: [
      child("reports", "operational", "Operational"),
      child("reports", "financial", "Financial"),
      child("reports", "builder", "Report Builder"),
    ],
  },
  {
    id: "administration",
    label: "Administration",
    icon: AdminIcon,
    path: "/administration",
    permissions: ["admin.view"],
    children: [
      child("administration", "users", "Users"),
      child("administration", "roles", "Roles & Permissions"),
      child("administration", "audit", "Audit Trail"),
      child("administration", "integrations", "Integrations"),
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: SettingsIcon,
    path: "/settings",
    children: [
      child("settings", "company", "Company Profile"),
      child("settings", "localization", "Localization"),
      child("settings", "preferences", "Preferences"),
    ],
  },
  {
    id: "ai-assistant",
    label: "AI Assistant",
    path: "/ai-assistant",
    icon: AiIcon,
  },
];

/** Flat lookup of every navigable path -> breadcrumb trail of labels. */
export function findTrail(pathname: string): NavItem[] {
  const normalized = pathname.replace(/\/+$/, "") || "/";
  for (const item of navigation) {
    if (item.path === normalized) return [item];
    const match = item.children?.find((c) => c.path === normalized);
    if (match) return [item, match];
    if (item.path && item.path !== "/" && normalized.startsWith(`${item.path}/`)) {
      return [item];
    }
  }
  return [];
}
