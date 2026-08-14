# Routes

This project uses **`react-router-dom` (v6, data router)** with routes composed by hand
in this folder — not file-based routing. `src/routes/index.tsx` is the single place
where the route tree is assembled and exported as `router` / `AppRouter`.

## Structure

| File | Purpose |
| --- | --- |
| `index.tsx` | Central route composer. Builds `router` via `createBrowserRouter` and exports `AppRouter`. |
| `AppLayoutRoute.tsx` | Root layout route (`path="/"`). Wraps pages in `MainLayout`, resolves breadcrumbs via `navigation.config.ts`, and builds the per-screen `ModuleScreenController`. |
| `ModuleRoute.tsx` | Shared `ModuleRoutePage` / `ModuleBranchRoute` helpers used by every generic (non-custom) module screen backed by `features/erp/ModuleScreen.tsx`. |
| `NotFoundPage.tsx` | Catch-all `*` route. |
| `crm.routes.tsx` | CRM routes (Leads, Opportunities) — the only module with dedicated custom pages today. |
| `sales.routes.tsx`, `purchase.routes.tsx`, `inventory.routes.tsx`, `finance.routes.tsx`, `hr.routes.tsx`, `projects.routes.tsx`, `workflow.routes.tsx`, `reports.routes.tsx`, `administration.routes.tsx`, `masters.routes.tsx`, `settings.routes.tsx` | Generic module route groups. Each child route renders `ModuleRoutePage` (the shared ERP module screen). Paths mirror `src/features/navigation/navigation.config.ts` — do not duplicate labels/icons here, only path segments. |

## Conventions

- Route path segments must stay in sync with `navigation.config.ts`. Do not hardcode labels — those live only in the nav config.
- New module route files: lowercase `<module>.routes.tsx`, exporting `<module>Routes` (a `<>...</>` fragment of `<Route>` elements).
- New route-tree components: PascalCase (`AppLayoutRoute.tsx`, `NotFoundPage.tsx`).
- CRM's Leads/Opportunities pages are custom (not generic `ModuleScreen`) — keep using their real page components, not `ModuleRoutePage`, when a module gets dedicated pages.

