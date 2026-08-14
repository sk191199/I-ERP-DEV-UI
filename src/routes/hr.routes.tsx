import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const hrRoutes = (
  <>
    <Route path="employees" element={<ModuleRoutePage />} />
    <Route path="attendance" element={<ModuleRoutePage />} />
    <Route path="leave" element={<ModuleRoutePage />} />
    <Route path="payroll" element={<ModuleRoutePage />} />
  </>
);
