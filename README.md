# Enterprise Navigator

## Navigation & Layout Requirements

The application MUST use Material UI's Mini Variant Drawer pattern.

Requirements:

- Use MUI Mini Variant Drawer as the primary navigation.

- Drawer should be permanently visible on Desktop and Laptop.

- Expanded width: 260px

- Collapsed width: 72px

- Smooth width transition (300ms)

- Sidebar should remember the last expanded/collapsed state.

- Drawer must support nested navigation with expandable/collapsible menu groups.

- Active menu item should have a blue highlighted background.

- Menu icons should remain visible even when collapsed.

- Show tooltips when hovering over icons in collapsed mode.

- User profile and Logout should remain fixed at the bottom of the drawer.

- Drawer should use a dark navy theme (#0F172A).

- The content area should automatically resize based on drawer width.

- The AppBar should adjust its width dynamically when the drawer expands or collapses.

Responsive Behavior:

Desktop (1440px+)

- Permanent Mini Variant Drawer

- Expanded by default

Laptop (1024px–1366px)

- Permanent Mini Variant Drawer

- Collapsed by default

Tablet (768px–1024px)

- Temporary Drawer

- Open via hamburger menu

- Overlay content

Mobile (480px–767px)

- Temporary full-height Drawer

- Slide in from the left

- Close on menu selection

Small Mobile (320px–479px)

- Same as Mobile

- Optimized spacing for smaller screens

The sidebar should include:

Dashboard

CRM

Sales

Purchase

Inventory

Finance

HR

Projects

Workflow

Reports

Administration

Settings

AI Assistant

Each menu should support:

- Nested child menus

- Icons

- Active state

- Expand/Collapse animation

- Permission-based visibility

- Route-based highlighting

The layout should consist of:

- Mini Variant Drawer (Left)

- Responsive AppBar (Top)

- Main Content Area

- Breadcrumb Navigation

- Page Header

- Content Container

- Footer (optional)

The implementation should use:

- Material UI Drawer

- Material UI AppBar

- Material UI Toolbar

- Material UI List

- Material UI Collapse

- React Router

- TypeScript

- Responsive breakpoints

- Smooth transitions

Now convert the UI into a complete enterprise Design System.

Create reusable components only.

Do not duplicate any UI.

Every button must use AppButton.

Every input must use AppInput.

Every card must use AppCard.

Every table must use AppTable.

Every dialog must use AppDialog.

Every modal must use AppModal.

Every page must use MainLayout.

Every form should support metadata-driven rendering.

The UI should be scalable to over 300 ERP screens.

Use TypeScript throughout.

Follow SOLID principles and feature-based architecture.

The overall application architecture should resemble a modern enterprise ERP similar to SAP Fiori, Microsoft Dynamics 365, Oracle Fusion, or Odoo Enterprise.

The navigation experience must use Material UI's Mini Variant Drawer pattern and follow enterprise UX best practices.

Do not use a simple sidebar. Build a fully responsive enterprise navigation system with smooth transitions, nested menus, role-based visibility, and adaptive behavior across Desktop, Laptop, Tablet, and Mobile devices.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://symphony-layout.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/e72f3f70-c9f6-4a05-ba1a-de3f8b696caf).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
