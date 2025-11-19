import React, { type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProject, useSidebar, useLoading } from "../../context";
import { projectService } from "../../services";
import { AppEvents, emit } from "../../utils/eventBus";

/**
 * Props for SidebarProjectCard component.
 *
 * @property {number} id - The unique identifier for the project.
 * @property {string} name - The name of the project to display.
 */
export interface SidebarProjectCardProps {
  id: number | string;
  name: string;
  selected?: boolean;
  active?: boolean;
}

/**
 * SidebarProjectCard component
 *
 * Renders a single project card item for use in the sidebar,
 * displaying the project name and linking to the project's page.
 *
 * @component
 * @param {SidebarProjectCardProps} props - The properties for the project card.
 * @returns {JSX.Element} The rendered project card component.
 */
export const SidebarProjectCard: React.FC<SidebarProjectCardProps> = ({
  id,
  name,
  selected,
  active,
}: SidebarProjectCardProps): JSX.Element => {
  const { setSelectedProject } = useProject();
  const { closeSidebar } = useSidebar();
  const navigate = useNavigate();
  const { setLoading, setMessage } = useLoading();
  const { id: idParam } = useParams();

  // Separate style for the card container
  const cardStyle: React.CSSProperties = {
    cursor: "pointer",
    outline: "none",
    boxShadow: "none",
    WebkitTapHighlightColor: "transparent",
    ...(selected ? { color: "white" } : {}),
  };

  /**
   * Handles project click, navigates to /project/:id if id is not currently selected.
   * @param {number} id - Project id to select and navigate to.
   */
  const handleProjectClick = (id: number) => {
    if (selected) return;
    closeSidebar();
    setSelectedProject(id);
    navigate(`/project/${id}`);
  };

  /**
   * Closes a UIkit dropdown associated with the clicked button.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - The mouse event from the button click.
   * @returns {void}
   */
  const closeUkDrop = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const target = e.currentTarget as HTMLElement;
    const dropdown = target.closest(".uk-dropdown");
    if (dropdown && (window as any).UIkit) {
      (window as any).UIkit.dropdown(dropdown).hide(false);
    }
  };

  /**
   * Archives a project by its ID and emits a project update event.
   *
   * @async
   * @param {string} id - The unique identifier of the project to archive.
   * @returns {Promise<void>}
   */
  const handleArchiveBtn = async (id: string): Promise<void> => {
    setLoading(true);
    setMessage("Archiving project...");
    try {
      await projectService.archivateProject(id);
      emit(AppEvents.PROJECTS_UPDATED);
      setMessage("Project archived successfully.");
    } catch (err) {
      setMessage("Failed to archive project");
      console.error(err);
    } finally {
      setTimeout(() => setMessage(undefined), 2000);
      setLoading(false);
    }
  };

  /**
   * Activates (reactivates) a project by its ID and emits a project update event.
   *
   * @async
   * @param {string} id - The unique identifier of the project to activate.
   * @returns {Promise<void>}
   */
  const handleActivateBtn = async (id: string): Promise<void> => {
    setLoading(true);
    setMessage("Activating project...");
    try {
      await projectService.reactivateProject(id);
      emit(AppEvents.PROJECTS_UPDATED);
      setMessage("Project activated successfully.");
    } catch (err) {
      setMessage("Failed to activate project");
      console.error(err);
    } finally {
      setTimeout(() => setMessage(undefined), 2000);
      setLoading(false);
    }
  };

  /**
   * Permanently deletes a project by its ID after user confirmation and emits a project update event.
   *
   * @async
   * @param {string} id - The unique identifier of the project to delete.
   * @returns {Promise<void>}
   */
  const handleDeleteBtn = async (id: string): Promise<void> => {
    setLoading(true);
    setMessage("Deleting project...");
    if (!window.confirm("Are you sure you want to delete this project?")) {
      setLoading(false);
      setMessage(undefined);
      return;
    }
    try {
      await projectService.deleteProject(id);
      emit(AppEvents.PROJECTS_UPDATED);
      setMessage("Project deleted successfully.");
      // If the deleted project id matches the current route idParam, redirect to home.
      if (idParam && idParam.toString() === id.toString()) {
        navigate("/");
      }
    } catch (err) {
      setMessage("Failed to delete project");
      alert("Failed to delete project");
      console.error(err);
    } finally {
      setTimeout(() => setMessage(undefined), 2000);
      setLoading(false);
    }
  };

  return (
    <li className="uk-margin-small-bottom" title={name}>
      <div
        className={
          "uk-width-1-1 uk-link-reset uk-flex uk-flex-middle uk-padding-small uk-border-pill uk-flex-between" +
          (selected ? " uk-background-secondary" : "")
        }
        role="button"
        tabIndex={0}
        style={cardStyle}
        onClick={() => handleProjectClick(Number(id))}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ")
            handleProjectClick(Number(id));
        }}
      >
        <div className="uk-flex uk-flex-middle uk-flex-1 uk-overflow-hidden">
          <span
            className="uk-margin-small-right"
            uk-icon="icon: folder"
            style={{ flexShrink: 0 }}
          ></span>
          <span className="uk-text-truncate" style={{ fontWeight: 500 }}>
            {name}
          </span>
        </div>
        <div className="uk-flex uk-flex-middle" style={{ flexShrink: 0 }}>
          <div className="uk-inline">
            <button
              className="uk-button uk-button-default uk-button-small uk-padding-remove"
              type="button"
              tabIndex={0}
              aria-label="Project options"
              style={{
                background: "none",
                border: "none",
                minWidth: 0,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <span
                uk-icon="icon: more-vertical; ratio: 0.8;"
                style={{ color: selected ? "white" : "" }}
              ></span>
            </button>

            <div uk-dropdown="mode: click; pos: bottom-right">
              <ul className="uk-nav uk-dropdown-nav">
                <li>
                  <button
                    className="uk-button uk-button-text uk-width-1-1 uk-text-left"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeUkDrop(e);
                      if (!active) {
                        handleActivateBtn(id.toString());
                      } else {
                        handleArchiveBtn(id.toString());
                      }
                    }}
                  >
                    {active ? "Archivate" : "Activate"}
                  </button>
                </li>
                <li className="uk-nav-divider"></li>
                <li>
                  <button
                    className="uk-button uk-button-text uk-width-1-1 uk-text-left uk-text-danger"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      closeUkDrop(e);
                      handleDeleteBtn(id.toString());
                    }}
                  >
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
