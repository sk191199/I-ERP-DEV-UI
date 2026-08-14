import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const financeRoutes = (
  <>
    <Route path="journals" element={<ModuleRoutePage />} />
    <Route path="ledger" element={<ModuleRoutePage />} />
    <Route path="payments" element={<ModuleRoutePage />} />
    <Route path="taxes" element={<ModuleRoutePage />} />
  </>
);
