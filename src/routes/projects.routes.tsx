import { Route } from "react-router-dom";
import { ModuleRoutePage } from "./ModuleRoute";

export const projectsRoutes = (
  <>
    <Route path="portfolio" element={<ModuleRoutePage />} />
    <Route path="tasks" element={<ModuleRoutePage />} />
    <Route path="timesheets" element={<ModuleRoutePage />} />
  </>
);
