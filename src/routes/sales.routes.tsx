import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const salesRoutes = (
  <>
    <Route path="quotations" element={<ModuleRoutePage />} />
    <Route path="orders" element={<ModuleRoutePage />} />
    <Route path="invoices" element={<ModuleRoutePage />} />
    <Route path="pricing" element={<ModuleRoutePage />} />
  </>
);
