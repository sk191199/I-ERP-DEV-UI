import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const mastersRoutes = (
  <>
    <Route path="customer" element={<ModuleRoutePage />} />
    <Route path="vendor" element={<ModuleRoutePage />} />
    <Route path="subsidairy" element={<ModuleRoutePage />} />
  </>
);
