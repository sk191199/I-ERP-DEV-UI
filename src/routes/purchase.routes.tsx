import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const purchaseRoutes = (
  <>
    <Route path="requisitions" element={<ModuleRoutePage />} />
    <Route path="orders" element={<ModuleRoutePage />} />
    <Route path="vendors" element={<ModuleRoutePage />} />
    <Route path="bills" element={<ModuleRoutePage />} />
  </>
);
