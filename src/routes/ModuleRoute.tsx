import { Outlet, useOutletContext } from "react-router-dom";
import {
  ModuleScreenBody,
  type ModuleScreenController,
} from "@/features/erp/ModuleScreen";

export function ModuleRoutePage() {
  const controller = useOutletContext<ModuleScreenController>();
  return <ModuleScreenBody controller={controller} />;
}

export function ModuleBranchRoute() {
  const controller = useOutletContext<ModuleScreenController>();
  return <Outlet context={controller} />;
}
