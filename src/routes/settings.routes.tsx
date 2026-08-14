import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const settingsRoutes = (
  <>
    <Route path="company" element={<ModuleRoutePage />} />
    <Route path="localization" element={<ModuleRoutePage />} />
    <Route path="preferences" element={<ModuleRoutePage />} />
  </>
);
