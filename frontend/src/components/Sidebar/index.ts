/**
 * Entry point for sidebar-related components.
 * 
 * Exports:
 * - Sidebar: The main sidebar component.
 * - NoProjectsAlert: Alert message shown when there are no projects.
 * - ProjectCard: Card component for displaying individual projects in the sidebar.
 * 
 * @module Sidebar
 */

import Sidebar from "./Sidebar";
import { SidebarNoProjectsAlert } from "./SidebarNoProject";
import { SidebarProjectCard, type SidebarProjectCardProps } from "./SidebarProjectCard";

export {
  Sidebar,
  SidebarNoProjectsAlert as NoProjectsAlert,
  SidebarProjectCard as ProjectCard,
  type SidebarProjectCardProps
};
