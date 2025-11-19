import type { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute, PublicRoute } from ".";

import { LoginPage, RegisterPage, ProfilePage, DashboardPage } from "../pages";

import Dashboard from "../components/Dashboard/Dashboard";
import { ProjectsList, ProjectsOverview } from "../components/Project";
import { TaskList, TaskOverview } from "../components/Task";

/**
 * MainRoutes component.
 *
 * Sets up the main application routing.
 *
 * Routes:
 * - `/login`: Public route, accessible only if not authenticated. Redirects authenticated users to `/dashboard`.
 * - `/register`: Public route, accessible only if not authenticated. Redirects authenticated users to `/dashboard`.
 * - `/dashboard`: Protected parent route, accessible only to authenticated users.
 *   - `/dashboard` (index): Shows the Dashboard (overview/stats/landing) component.
 *   - `/dashboard/projects`: Shows the ProjectsList component.
 *   - `/dashboard/projects/:id`: Shows the ProjectsOverview component for an individual project.
 *   - `/dashboard/tasks`: Shows the TaskList component.
 *   - `/dashboard/tasks/:id`: Shows the TaskOverview component for an individual task.
 *   - `/profile`: Shows the ProfilePage for the user.
 * - Any other path: Redirects to `/login`.
 *
 * @returns {JSX.Element} Router configuration for the app.
 */
export function MainRoutes(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes for login and registration */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <LoginPage />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <RegisterPage />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectsList />} />
          <Route path="projects/:id" element={<ProjectsOverview />} />
          <Route path="tasks" element={<TaskList/>} />
          <Route path="tasks/:id" element={<TaskOverview/>} />
        </Route>

        {/* Catch-all: redirect to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
