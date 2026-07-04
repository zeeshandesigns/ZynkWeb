import { createBrowserRouter } from "react-router";
import Root from "./components/Root";
import HomePage from "./pages/HomePage";
import WorkPage from "./pages/WorkPage";
import ContactPage from "./pages/ContactPage";
import DesignSystemPage from "./pages/DesignSystemPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: "work", Component: WorkPage },
      { path: "contact", Component: ContactPage },
      { path: "design-system", Component: DesignSystemPage },
    ],
  },
]);
