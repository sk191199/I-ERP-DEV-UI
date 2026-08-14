import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/AddOutlined";
import DownloadIcon from "@mui/icons-material/FileDownloadOutlined";
import DeleteIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { AppButton } from "@/components/ui/AppButton";
import { MainLayout } from "@/components/layout/MainLayout";
import {
  type ModuleScreenController,
  useModuleScreenController,
} from "@/features/erp/ModuleScreen";
import { findTrail } from "@/features/navigation/navigation.config";
import { PRIMARY, TEXT_SECONDARY } from "@/theme/theme";

function DashboardHeader() {
  return (
    <Stack spacing={0.5} sx={{ mb: { xs: 1, md: 1.5 } }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: PRIMARY }} />
        <Typography variant="caption" sx={{ color: PRIMARY, fontWeight: 800, letterSpacing: "0.08em" }}>
          INTELLIGENCE HUB
        </Typography>
      </Stack>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between" }}
      >
        <Box>
          <Typography sx={{ fontWeight: 800, fontSize: { xs: "1.6rem", md: "2rem" }, letterSpacing: "-0.02em" }}>
            Management Console
          </Typography>
          <Typography variant="body2" sx={{ color: TEXT_SECONDARY, mt: 0.25 }}>
            Real-time enterprise metrics and proactive agentive insights.
          </Typography>
        </Box>

        <Box
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: "16px",
            px: 2,
            py: 1,
            bgcolor: "background.paper",
          }}
        >
          <Typography variant="caption" sx={{ color: TEXT_SECONDARY, fontWeight: 700, letterSpacing: "0.04em" }}>
            FISCAL PERIOD:{" "}
            <Box component="span" sx={{ color: PRIMARY, fontWeight: 800 }}>
              Q1 FY2026
            </Box>
          </Typography>
        </Box>
      </Stack>
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
      <MainLayout title="" description="" actions={undefined}>
        <DashboardHeader />
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
