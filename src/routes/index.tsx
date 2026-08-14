import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { DashboardPageBody } from "@/pages/DashboardPage";

import { AppLayoutRoute } from "./AppLayoutRoute";
import { ModuleBranchRoute, ModuleRoutePage } from "./ModuleRoute";
import { NotFoundPage } from "./NotFoundPage";
import { crmRoutes } from "./crm.routes";
import { salesRoutes } from "./sales.routes";
import { purchaseRoutes } from "./purchase.routes";
import { inventoryRoutes } from "./inventory.routes";
import { financeRoutes } from "./finance.routes";
import { hrRoutes } from "./hr.routes";
import { projectsRoutes } from "./projects.routes";
import { workflowRoutes } from "./workflow.routes";
import { reportsRoutes } from "./reports.routes";
import { administrationRoutes } from "./administration.routes";
import { mastersRoutes } from "./masters.routes";
import { settingsRoutes } from "./settings.routes";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<AppLayoutRoute />}>
      <Route index element={<DashboardPageBody />} />

      {/* Standalone module, no sub-sections in navigation.config.ts */}
      <Route path="ai-assistant" element={<ModuleRoutePage />} />

      <Route path="crm" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {crmRoutes}
      </Route>

      <Route path="sales" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {salesRoutes}
      </Route>

      <Route path="purchase" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {purchaseRoutes}
      </Route>

      <Route path="inventory" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {inventoryRoutes}
      </Route>

      <Route path="finance" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {financeRoutes}
      </Route>

      <Route path="hr" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {hrRoutes}
      </Route>

      <Route path="projects" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {projectsRoutes}
      </Route>

      <Route path="workflow" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {workflowRoutes}
      </Route>

      <Route path="reports" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {reportsRoutes}
      </Route>

      <Route path="administration" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {administrationRoutes}
      </Route>

      <Route path="masters" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {mastersRoutes}
      </Route>

      <Route path="settings" element={<ModuleBranchRoute />}>
        <Route index element={<ModuleRoutePage />} />
        {settingsRoutes}
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Route>,
  ),
);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
