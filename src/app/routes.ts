import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";
import DesignSystemPage from "./pages/DesignSystemPage";
import GraphicsPage from "./pages/GraphicsPage";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";

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
    ],
  },

  // ── Admin (standalone layout, no Root nav) ──────────────────────────────────
  { path: "/admin/login", Component: AdminLoginPage },
  { path: "/admin", Component: AdminDashboard },
]);
