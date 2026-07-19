import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import GraphicsPage from "./pages/GraphicsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import ProposalPage from "./pages/ProposalPage";
import SAGlobalProposalPage from "./pages/SAGlobalProposalPage";
import NotFoundPage from "./pages/NotFoundPage";
import OnboardingKitPage from "./pages/OnboardingKitPage";
import ManagerPage from "./pages/ManagerPage";

export const router = createBrowserRouter([
  // ── Public site (with nav + footer layout) ──────────────────────────────────
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "work", Component: WorkPage },
      { path: "contact", Component: ContactPage },
      { path: "design-system", Component: DesignSystemPage },
      { path: "graphics", Component: GraphicsPage }, // hidden — not in nav
      { path: "*", Component: NotFoundPage },
    ],
  },

  // ── Standalone pages (no Root nav) ─────────────────────────────────────────
  { path: "/proposal", Component: ProposalPage },
  { path: "/proposal/sa-global", Component: SAGlobalProposalPage },
  { path: "/admin/login", Component: AdminLoginPage },
  { path: "/admin", Component: AdminDashboard },
  { path: "/onboard/:slug", Component: OnboardingKitPage },
  { path: "/manager", Component: ManagerPage },
  { path: "*", Component: NotFoundPage },
]);
