import { useEffect, useState, useMemo, type JSX } from "react";
import { Link } from "react-router-dom";
import UIkit from "uikit";

import { NoProjectsAlert, ProjectCard } from ".";
import { useProject, useSidebar, type ProjectTreeItem } from "../../context";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { projectService } from "../../services";
import { AppEvents, on } from "../../utils/eventBus";

/**
 * Sidebar component
 *
 * Displays a list of projects, with an option to add a new project.
 * If there are no projects, displays an alert.
 *
 * UIkit tooltips are initialized for interactive controls.
 *
 * @component
 * @returns {JSX.Element} The rendered sidebar with the project list.
 */
export default function Sidebar(): JSX.Element {
  const [projects, setProjects] = useState<ProjectTreeItem[]>([]);
  const { selectedProject } = useProject();
  const { isOpen, closeSidebar } = useSidebar();
  const isMobile = useIsMobile();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("active");
  const filteredProjects = useMemo(
    () => filterProjects(),
    [projects, searchTerm, statusFilter]
  );

  /**
   * Initializes UIkit tooltips for interactive controls
   * and fetches projects when component mounts.
   */
  useEffect(() => {
    UIkit.tooltip("[uk-tooltip]");
    fetchProjects();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Effect: None
   *
   * This insertion point is required for adding documentation or additional logic.
   *
   * (No code to run here for now; see other effect hooks for logic.)
   */
  useEffect(() => {
    const unsubscribe = on(AppEvents.PROJECTS_UPDATED, () => {
      fetchProjects();
    });

    // Cleanup
    return unsubscribe;
  }, []);

  /**
   * Fetches the list of projects from the backend and updates the local state.
   * Utilizes the projectService to retrieve the project tree.
   * Errors are logged to the console.
   *
   * @async
   * @function fetchProjects
   * @returns {Promise<void>} Resolves after projects are fetched and set.
   */
  const fetchProjects = async (): Promise<void> => {
    try {
      const data = await projectService.getProjectTree();
      setProjects(data);
    } catch (err) {
      console.error(err);
    }
  };

  /**
   * Returns the filtered list of projects based on search and status filter.
   *
   * - If a search term is entered, only projects whose `searchable` string contains the
   *   (lowercased, trimmed) search term are included. Otherwise all projects are included.
   * - If `statusFilter` is "all", all found projects (by search) are included, regardless of status.
   *   Otherwise, only those whose `status` exactly matches `statusFilter` are returned.
   *
   * @returns {ProjectTreeItem[]} The array of filtered projects.
   */
  function filterProjects(): ProjectTreeItem[] {
    const term = searchTerm.trim().toLowerCase();
    const projectsBySearch = term
      ? projects.filter((p) => p.searchable.includes(term))
      : projects;

    if (statusFilter === "all") {
      return projectsBySearch;
    }

    return projectsBySearch.filter((p) => p.status === statusFilter);
  }

  /**
   * Handles the selection of a project status from the dropdown.
   *
   * Stops the event from propagating, sets the status filter, and closes the UIkit dropdown if present.
   *
   * @param {string} status - The status to filter projects by (e.g., "all", "active", "archived").
   * @param {React.MouseEvent} e - The mouse event from the dropdown selection.
   */
  const handleStatusSelect = (status: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setStatusFilter(status);

    const target = e.currentTarget as HTMLElement;
    const dropdown = target.closest(".uk-dropdown");
    if (dropdown && (window as any).UIkit) {
      (window as any).UIkit.dropdown(dropdown).hide(false);
    }
  };


  return (
    <aside
      className={`uk-background-muted uk-height-1-1 uk-flex uk-flex-column uk-box-shadow-small uk-padding-small uk-padding-remove-horizontal ${
        isMobile ? "uk-width-1-1" : "uk-width-1-4@m uk-width-2-5"
      }`}
      style={{
        zIndex: 2,
        position: isMobile ? "absolute" : "relative",
        transform: isOpen || !isMobile ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.3s ease-in-out",
      }}
    >
      <div className="uk-flex uk-flex-between uk-flex-middle uk-margin-small-bottom uk-padding uk-padding-remove-vertical">
        <h3 className="uk-margin-remove">Projects</h3>
        {/* Add Project icon button, navigates to new project form */}
        <Link
          to="/project/new"
          className="uk-icon-button uk-button-default"
          uk-tooltip="Add Project"
          aria-label="Add Project"
          style={{ marginLeft: 8 }}
          onClick={closeSidebar}
        >
          <span uk-icon="plus"></span>
        </Link>
      </div>
      <div className="uk-flex uk-flex-column uk-padding uk-padding-remove-vertical uk-margin-small-bottom">
        <form
          className="uk-search uk-search-navbar uk-width-1-1 uk-margin-small-bottom"
          onSubmit={(e) => e.preventDefault()}
        >
          <span className="uk-search-icon" uk-icon="icon: search"></span>
          <input
            className="uk-search-input uk-border-rounded"
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
        <div className="uk-inline">
          <button
            className="uk-button uk-button-default uk-width-1-1 uk-text-capitalize"
            type="button"
            style={{ lineHeight: 1 }}
          >
            {statusFilter} Projects <span uk-icon="icon: triangle-down"></span>
          </button>
          <div uk-dropdown="mode: click">
            <ul className="uk-nav uk-dropdown-nav">
              <li style={{ cursor: "pointer" }}>
                <p
                  className="uk-margin-remove"
                  style={{
                    fontWeight: statusFilter === "all" ? "bold" : "normal",
                  }}
                  onClick={(e) => handleStatusSelect("all", e)}
                >
                  All
                </p>
              </li>
              <li style={{ cursor: "pointer" }}>
                <p
                  className="uk-margin-remove"
                  style={{
                    fontWeight: statusFilter === "active" ? "bold" : "normal",
                  }}
                  onClick={(e) => handleStatusSelect("active", e)}
                >
                  Active
                </p>
              </li>
              <li style={{ cursor: "pointer" }}>
                <p
                  className="uk-margin-remove"
                  style={{
                    fontWeight: statusFilter === "archived" ? "bold" : "normal",
                  }}
                  onClick={(e) => handleStatusSelect("archived", e)}
                >
                  Archived
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="uk-flex-1 uk-overflow-auto uk-padding uk-padding-remove-vertical uk-margin-small-top">
        {/* Conditional rendering: alert if no projects */}
        {projects.length === 0 && (
          <NoProjectsAlert message="You have no projects yet." />
        )}
        {/* Show search bar when has projects*/}
        {projects.length > 0 && (
          <>
            {/* Conditional rendering: alert if not found searched project */}
            {filteredProjects.length === 0 && (
              <NoProjectsAlert message="No projects found matching your search." />
            )}
            <ul className="uk-nav uk-nav-default uk-nav-side">
              {filteredProjects.map(
                /**
                 * Renders a ProjectCard for each project.
                 * @param {ProjectTreeItem} project
                 * @returns {JSX.Element}
                 */
                (project: ProjectTreeItem): JSX.Element => (
                  <ProjectCard
                    key={project.id}
                    id={project.id}
                    name={project.name}
                    selected={project.id === selectedProject}
                    active={project.status === "active"}
                  />
                )
              )}
            </ul>
          </>
        )}
      </div>
    </aside>
  );
}
