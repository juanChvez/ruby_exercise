import { createContext, useContext, useState, type ReactNode } from "react";
import { LoadingScreen } from "../components/Lib";

/**
 * The value shape for the Loading context.
 */
interface LoadingContextType {
  /**
   * Whether the global loading overlay should be displayed.
   */
  loading: boolean;
  /**
   * Function to set the loading state.
   * @param val - New loading state.
   */
  setLoading: (val: boolean) => void;
  /**
   * Message to display in the loading overlay (optional).
   */
  message?: string;
  /**
   * Function to set the loading message.
   * @param msg - New message or undefined to clear it.
   */
  setMessage: (msg?: string) => void;
}

/**
 * React context for loading state. Undefined if not inside a provider.
 */
const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

/**
 * Props for the LoadingProvider component.
 */
interface LoadingProviderProps {
  /**
   * Child components which will have access to the loading context.
   */
  children: ReactNode;
}

/**
 * Custom hook to access the loading context.
 * @throws If used outside of a LoadingProvider.
 * @returns The loading context value.
 */
export function useLoading(): LoadingContextType {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
}

/**
 * Provides loading state and controls to its child components.
 * Allows global loading overlays or UI feedback for async tasks.
 *
 * @param children - React children to provide the context to.
 * @returns The LoadingProvider component.
 */
export function LoadingProvider({ children }: LoadingProviderProps) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>(undefined);

  return (
    <LoadingContext.Provider
      value={{ loading, setLoading, message, setMessage }}
    >
      {children}      
      {loading && <LoadingScreen />}
    </LoadingContext.Provider>
  );
}
