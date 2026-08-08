import { createFileRoute, useRouterState } from "@tanstack/react-router";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { MainLayout } from "@/components/layout/MainLayout";
import { AppCard } from "@/components/ui/AppCard";
import { AppButton } from "@/components/ui/AppButton";
import { ModuleScreen } from "@/features/erp/ModuleScreen";
import { findTrail } from "@/features/navigation/navigation.config";

/**
 * Catch-all module resolver: every module and sub-module path in the
 * navigation config renders through the shared ModuleScreen, so adding an
 * ERP screen is a configuration change, not new UI.
 */
export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Module Workspace — Northwind ERP" },
      {
        name: "description",
        content:
          "Enterprise module workspace with worklists, KPIs, metadata-driven forms and approval actions.",
      },
      { property: "og:title", content: "Module Workspace — Northwind ERP" },
      {
        property: "og:description",
        content:
          "Enterprise module workspace with worklists, KPIs, metadata-driven forms and approval actions.",
      },
    ],
  }),
  component: ModuleRoute,
});

function ModuleRoute() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const trail = findTrail(pathname);

  if (trail.length === 0) {
    return (
      <MainLayout title="Screen not available" description={`No module is mapped to ${pathname}.`}>
        <AppCard title="Nothing here yet">
          <Stack spacing={2} sx={{ alignItems: "flex-start" }}>
            <Typography variant="body2" color="text.secondary">
              This route is not registered in the navigation configuration. Pick a module
              from the sidebar to continue.
            </Typography>
            <AppButton onClick={() => window.location.assign("/")}>Back to dashboard</AppButton>
          </Stack>
        </AppCard>
      </MainLayout>
    );
  }

  const moduleItem = trail[0]!;
  const leaf = trail[trail.length - 1]!;

  return (
    <ModuleScreen
      moduleLabel={moduleItem.label}
      screenLabel={leaf.label}
      seed={leaf.id.replace(/\./g, "-")}
    />
  );
}
