import { Route } from "react-router-dom";

import LeadsPage from "@/pages/CRM/Leads/LeadsPage";
import NewLeadPage from "@/pages/CRM/Leads/NewLeadPage";
import Opportunities from "@/pages/CRM/Opportunities/Opportunities";

// NOTE: LeadDetails.tsx / LeadEdit.tsx exist but are empty (no export yet),
// so :id and :id/edit routes are intentionally not wired up (matches prior behavior).
export const crmRoutes = (
  <>
    <Route path="leads">
      <Route index element={<LeadsPage />} />
      <Route path="new" element={<NewLeadPage />} />
    </Route>

    <Route path="opportunities" element={<Opportunities />} />
  </>
);
