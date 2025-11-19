import { useEffect, type JSX } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

import { useProject, SidebarProvider } from "../context";

/**
 * Project page layout.
 *
 * This component displays the main project page structure, including:
 * - The top navigation bar
 * - A left sidebar with the project list
 * - A main content area (rendered via react-router <Outlet /> for nested routes)
 *
 * Uses UIKit for layout and styling.
 *
 * @component
 * @returns {JSX.Element} The rendered Project page layout with navbar, sidebar, and main content area.
 */
export default function Project(): JSX.Element {
  const { setSelectedProject, setProjectData } = useProject();

  // Clean project data
  /**
   * Reset selected project and project data
   *
   * On mount, this effect checks the current location to determine if a specific project id
   * is present in the URL (e.g., /project/123). If NOT (i.e., on /project or /project/),
   * it resets the selected project and clears any loaded project data from context
   * to avoid showing stale data.
   */
  useEffect(() => {
    const match = window.location.pathname.match(/^\/project(?:\/(\d+))?\/?$/);
    const projectIdStr = match?.[1];

    if (!projectIdStr) {
      setSelectedProject(null);
      setProjectData(null);
    } else if (!isNaN(Number(projectIdStr))) {
      setSelectedProject(Number(projectIdStr));
      // Optionally, trigger loading/fetching projectData here if needed
    }
  }, []);

  return (
    <SidebarProvider>
      {/* Navbar component at the top */}
      <Navbar />

      {/* Main grid layout: sidebar + main content */}
      <div
        className="uk-flex uk-flex-expand"
        style={{ height: "calc(100vh - 80px)" }}
      >
        {/* Sidebar for project navigation */}
        <Sidebar />

        {/* Main content area rendered by react-router */}
        <div className="uk-width-expand@m uk-flex uk-flex-center uk-flex-middle uk-height-1-1">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
}
