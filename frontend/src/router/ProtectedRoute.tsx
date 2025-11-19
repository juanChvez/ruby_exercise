import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * ProtectedRoute component.
 *
 * Restricts access to its children based on user authentication status.
 * If the user is authenticated, renders the children. Otherwise, redirects to the login page.
 *
 * @param {Object} props - The component props.
 * @param {JSX.Element} props.children - The component's child elements to render if authenticated.
 * @returns {JSX.Element} The rendered children if authenticated, or a redirect to /login if not authenticated.
 */
export const ProtectedRoute = ({ children }: { children: JSX.Element }): JSX.Element => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" replace />;
};
