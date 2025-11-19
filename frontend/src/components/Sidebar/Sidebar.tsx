import { useMemo, type JSX } from "react";
import { useLocation } from "react-router-dom";
import { useSidebar } from "../../context";
import { useIsMobile } from "../../hooks/useMediaQuery";
import Tab from "./Tab";

/**
 * Sidebar navigation component for the application.
 *
 * Renders sidebar navigation links (Dashboard, Projects, Tasks),
 * highlights the active section based on current route,
 * and adapts its appearance for mobile and desktop.
 *
 * Uses UIKit icons and styles. Slides in/out on mobile.
 *
 * @returns {JSX.Element} The rendered sidebar navigation element.
 */
export default function Sidebar(): JSX.Element {
  const location = useLocation();
  const { isOpen, closeSidebar } = useSidebar();
  const isMobile = useIsMobile();

  /**
   * Determines which navigation item should be marked as active based on the current path.
   *
   * @type {"dashboard" | "projects" | "tasks" | ""}
   */
  const activeItem: "dashboard" | "projects" | "tasks" | "" = useMemo(() => {
    if (location.pathname.includes("/projects")) {
      return "projects";
    } else if (
      location.pathname.includes("/tasks") ||
      location.pathname === "/task"
    ) {
      return "tasks";
    } else if (
      location.pathname === "/" ||
      location.pathname.startsWith("/dashboard")
    ) {
      return "dashboard";
    }
    return "";
  }, [location.pathname]);

  return (
    <aside
      className={`uk-background-muted uk-height-1-1 uk-flex uk-flex-column uk-box-shadow-small uk-padding-small uk-padding-remove-horizontal ${
        isMobile ? "uk-width-1-1" : "uk-width-1-4@m uk-width-2-5"
      }`}
      style={{
        zIndex: 2,
        position: isMobile ? "absolute" : "relative",
        transform: isOpen || !isMobile ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <ul
        className="uk-nav-default uk-nav-parent-icon uk-margin-remove"
        data-uk-nav
      >
        {/* Dashboard tab */}
        <Tab
          to="/dashboard"
          icon="grid"
          label="Dashboard"
          active={activeItem === "dashboard"}
          onClick={closeSidebar}
        />

        {/* Projects tab */}
        <Tab
          to="/dashboard/projects"
          icon="folder"
          label="Projects"
          active={activeItem === "projects"}
          onClick={closeSidebar}
        />

        {/* Tasks tab */}
        <Tab
          to="/dashboard/tasks"
          icon="list"
          label="Tasks"
          active={activeItem === "tasks"}
          onClick={closeSidebar}
        />
      </ul>
    </aside>
  );
}
