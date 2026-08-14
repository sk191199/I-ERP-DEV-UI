import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/AddOutlined";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ArrowIcon from "@mui/icons-material/ArrowForwardOutlined";
import Stack from "@mui/material/Stack";
import { AppButton } from "@/components/ui/AppButton";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  type ModuleScreenController,
  useModuleScreenController,
} from "@/features/erp/ModuleScreen";
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

export function AppLayoutRoute() {
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
