import type { JSX } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute, PublicRoute } from ".";

import { Login, Register, Project, Profile } from "../pages";


import {
  ProjectMessage,
  ProjectNew,
  ProjectOverview,
} from "../components/Project";

/**
 * MainRoutes component.
 *
 * Sets up the main application routing.
 *
 * Routes:
 * - `/login`: Public route, accessible only if not authenticated. Redirects authenticated users to `/project`.
 * - `/register`: Public route, accessible only if not authenticated. Redirects authenticated users to `/project`.
 * - `/project`: Protected parent route, accessible only to authenticated users.
 *   - `/project` (index): Shows the ProjectMessage component.
 *   - `/project/new`: Shows the ProjectNew component for creating a project.
 *   - `/project/:id`: Shows the ProjectOverview for a project by ID.
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
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />

        {/* Protected routes */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/project"
          element={
            <ProtectedRoute>
              <Project />
            </ProtectedRoute>
          }
        >
          <Route index element={<ProjectMessage />} />
          <Route path="new" element={<ProjectNew />} />
          <Route path=":id" element={<ProjectOverview />} />
        </Route>

        {/* Catch-all: redirect to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
