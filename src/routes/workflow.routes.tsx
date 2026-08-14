import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const workflowRoutes = (
  <>
    <Route path="designer" element={<ModuleRoutePage />} />
    <Route path="approvals" element={<ModuleRoutePage />} />
    <Route path="rules" element={<ModuleRoutePage />} />
  </>
);
