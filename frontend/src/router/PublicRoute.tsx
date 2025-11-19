import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * A route that is only accessible to unauthenticated users.
 * If a user is already authenticated, they will be redirected to the project.
 *
 * @param children The component tree to render if user is not authenticated.
 * @returns The children element if not authenticated, or a redirect to "/project" if authenticated.
 */
export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/project" replace /> : children;
};
