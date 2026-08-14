import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const administrationRoutes = (
  <>
    <Route path="users" element={<ModuleRoutePage />} />
    <Route path="roles" element={<ModuleRoutePage />} />
    <Route path="audit" element={<ModuleRoutePage />} />
    <Route path="integrations" element={<ModuleRoutePage />} />
  </>
);
