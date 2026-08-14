import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const reportsRoutes = (
  <>
    <Route path="operational" element={<ModuleRoutePage />} />
    <Route path="financial" element={<ModuleRoutePage />} />
    <Route path="builder" element={<ModuleRoutePage />} />
  </>
);
