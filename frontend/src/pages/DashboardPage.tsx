import { useEffect, type JSX } from "react";
import { Outlet } from "react-router-dom";

import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { SidebarProvider, useAuth } from "../context";
import { authService } from "../services";

/**
 * Dashboard page component.
 *
 * Composition:
 * - Wraps children in SidebarProvider context.
 * - Renders Navbar at the top.
 * - Uses a flexbox layout with Sidebar navigation and main content area.
 * - Uses React Router's <Outlet /> to render nested routes.
 *
 * @component
 * @returns {JSX.Element} The Dashboard layout for authenticated users, including Navbar, Sidebar, and main content.
 */
const DashboardPage: React.FC = (): JSX.Element => {
  const { logout } = useAuth();

  useEffect(() => {
    const validateSession = async () => {
      const valid = await authService.validateToken();
      if (!valid) {
        logout();
      }
    };
    validateSession();
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
        <div className="uk-width-expand@m uk-flex uk-flex-center uk-flex-top uk-height-1-1">
          <Outlet />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardPage;
