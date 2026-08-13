import { createBrowserRouter, createRoutesFromElements, Outlet, Route, RouterProvider, useLocation, useNavigate, useOutletContext } from "react-router-dom";
import AddIcon from "@mui/icons-material/AddOutlined";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowIcon from "@mui/icons-material/ArrowForwardOutlined";
import Stack from "@mui/material/Stack";
import { AppButton } from "@/components/ui/AppButton";
import { MainLayout } from "@/components/layout/MainLayout";
import { DashboardPageBody } from "@/pages/DashboardPage";
import LeadsPage from "@/pages/CRM/Leads/LeadsPage";
import NewLeadPage from "./pages/CRM/Leads/NewLeadPage";
import {
  ModuleScreenBody,
  type ModuleScreenController,
  useModuleScreenController,
} from "@/features/erp/ModuleScreen";
import { navigation } from "@/features/navigation/navigation.config";
import { findTrail } from "@/features/navigation/navigation.config";
import { useSession } from "@/features/auth/SessionProvider";

function DashboardActions() {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} useFlexGap>
      <AppButton emphasis="secondary" tone="neutral">
        Change period
      </AppButton>
      <AppButton endIcon={<ArrowIcon />}>Open approvals</AppButton>
    </Stack>
  );
}

function ModuleActions({ controller }: { controller: ModuleScreenController }) {
  return (
    <Stack direction={{ xs: "column", sm: "row" }} spacing={1} useFlexGap>
      <AppButton emphasis="secondary" tone="neutral" startIcon={<DownloadIcon />}>
        Export
      </AppButton>
      <AppButton
        emphasis="secondary"
        tone="danger"
        startIcon={<DeleteIcon />}
        onClick={() => controller.setConfirmOpen(true)}
      >
        Archive
      </AppButton>
      <AppButton startIcon={<AddIcon />} onClick={() => controller.setCreateOpen(true)}>
        New
      </AppButton>
    </Stack>
  );
}

function LeadsActions() {
  const navigate = useNavigate();

  return (
    <AppButton startIcon={<AddIcon />} onClick={() => navigate("/crm/leads/new")}>
      New
    </AppButton>
  );
}

function AppLayoutRoute() {
  const { pathname } = useLocation();
  const { user } = useSession();
  const trail = findTrail(pathname);
  const leaf = trail[trail.length - 1];
  const isLeadsRoute = pathname === "/crm/leads" || pathname.startsWith("/crm/leads/");
  const controller = useModuleScreenController({
    moduleLabel: trail[0]?.label ?? "Executive Dashboard",
    screenLabel: leaf?.label ?? "Executive Dashboard",
    seed: (leaf?.id ?? "dashboard").replace(/\./g, "-"),
  });

  if (pathname !== "/" && trail.length === 0) {
    return <Outlet />;
  }

  if (pathname === "/") {
    return (
      <MainLayout
        title="Executive Dashboard"
        description={`Welcome back, ${user.name}. Consolidated position across all operating modules.`}
        status="Period 08 / 2026"
        actions={<DashboardActions />}
      >
        <Outlet context={controller} />
      </MainLayout>
    );
  }

  if (pathname === "/crm/leads/new") {
    return (
      <MainLayout title="" description="" actions={undefined}>
        <Outlet />
      </MainLayout>
    );
  }

  return (
    <MainLayout
      title={leaf?.label ?? trail[0]?.label ?? "Module"}
      description={`${trail[0]?.label ?? "Module"} · operational worklist with role-aware actions and audit-ready documents.`}
      status="Live"
      actions={isLeadsRoute ? <LeadsActions /> : <ModuleActions controller={controller} />}
    >
      <Outlet context={controller} />
    </MainLayout>
  );
}

function ModuleRoutePage() {
  const controller = useOutletContext<ModuleScreenController>();
  return <ModuleScreenBody controller={controller} />;
}

function ModuleBranchRoute() {
  const controller = useOutletContext<ModuleScreenController>();
  return <Outlet context={controller} />;
}

function NotFoundPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>
    </div>
  );
}

function toRoutePath(path: string): string {
  return path.replace(/^\//, "");
}

function toNestedRoutePath(parentPath: string, childPath: string): string {
  return childPath.replace(new RegExp(`^${parentPath.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}/`), "");
}

function buildRouteElements() {
  return navigation.flatMap((item) => {
    if (item.id === "dashboard") {
      return [];
    }

    if (!item.children?.length) {
      return [
        <Route
          key={item.id}
          path={toRoutePath(item.path ?? "")}
          element={<ModuleRoutePage />}
        />,
      ];
    }

    return [
      <Route key={item.id} path={toRoutePath(item.path ?? "")} element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {item.children.map((child) => {
          if (child.id === "crm.leads") {
            return (
              <Route key={child.id} path={toNestedRoutePath(item.path ?? "", child.path ?? "")}>
                <Route index element={<LeadsPage />} />
                <Route path="new" element={<NewLeadPage />} />
              </Route>
            );
          }

          return (
            <Route
              key={child.id}
              path={toNestedRoutePath(item.path ?? "", child.path ?? "")}
              element={<ModuleRoutePage />}
            />
          );
        })}
      </Route>,
    ];
  });
}

export const reactRouterDomRouter = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayoutRoute />}>
      <Route index element={<DashboardPageBody />} />
      {buildRouteElements()}
      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export function ReactRouterDomProvider() {
  return <RouterProvider router={reactRouterDomRouter} />;
}