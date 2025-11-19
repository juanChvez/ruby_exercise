import { createContext, useContext, useState, type JSX, type ReactNode } from "react";

/**
 * @interface SidebarContextType
 * @property {boolean} isOpen - Whether the sidebar is currently open.
 * @property {() => void} toggleSidebar - Function to toggle the sidebar open/closed state.
 * @property {() => void} closeSidebar - Function to forcefully close the sidebar.
 */
interface SidebarContextType {
  isOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;
}

/**
 * React Context for sidebar open/close and controls.
 * Defaults to undefined; must be provided by SidebarProvider.
 */
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

/**
 * Hook to consume the sidebar context.
 * @throws Error if used outside of a SidebarProvider.
 * @returns {SidebarContextType} Sidebar context with open state and controls.
 */
export function useSidebar(): SidebarContextType {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within SidebarProvider");
  }
  return context;
};

/**
 * SidebarProvider component.
 * Provides sidebar state and control functions to its children via React context.
 *
 * @param {Object} props - Component props
 * @param {ReactNode} props.children - React node(s) that will consume the sidebar context.
 * @returns {JSX.Element} Context provider wrapping its children.
 */
export const SidebarProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);

  /**
   * Toggles the sidebar's open/close state.
   */
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  /**
   * Forces the sidebar to be closed.
   */
  const closeSidebar = () => setIsOpen(false);

  return (
    <SidebarContext.Provider value={{ isOpen, toggleSidebar, closeSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};
