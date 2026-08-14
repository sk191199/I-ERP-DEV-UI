import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const inventoryRoutes = (
  <>
    <Route path="items" element={<ModuleRoutePage />} />
    <Route path="warehouses" element={<ModuleRoutePage />} />
    <Route path="movements" element={<ModuleRoutePage />} />
    <Route path="adjustments" element={<ModuleRoutePage />} />
  </>
);
