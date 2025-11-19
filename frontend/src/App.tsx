import type { JSX } from "react";

import client from "./apollo";
import { ApolloProvider } from '@apollo/client/react';

import { AuthProvider, LoadingProvider, ProjectProvider } from "./context";
import { MainRoutes } from "./router";

import "./App.css";

/**
 * Main application component.
 *
 * Wraps the app in top-level providers for authentication, loading state, and project context,
 * and renders the main routing tree for the application.
 *
 * @returns {JSX.Element} Application wrapper with all providers and routes.
 */
function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <LoadingProvider>
          <ProjectProvider>
            <MainRoutes />
          </ProjectProvider>
        </LoadingProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
