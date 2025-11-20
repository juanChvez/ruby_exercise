import { useState, useEffect, type JSX } from "react";

import ListItem from "./ListItem";
import ModalNewProject from "./ModalNewProject";

import { projectService } from "../../services";

import { useLoading } from "../../context";
import { type ProjectListItem } from "../../types/Project";

/**
 * ProjectsList component
 *
 * Renders a searchable list of projects. Users can filter projects by title or description.
 * Uses backend data for listing and enables project creation via modal.
 *
 * @component
 * @returns {JSX.Element} The rendered Projects list UI.
 */
const ProjectsList: React.FC = (): JSX.Element => {
  /** Search term controlled by user input */
  const [searchTerm, setSearchTerm] = useState("");
  /** Controls visibility of the new project modal */
  const [showModal, setShowModal] = useState(false);
  /** Holds the list of projects fetched from the backend */
  const [projectsData, setProjectsData] = useState<ProjectListItem[]>([]);
  /** setLoading - Shows loading indicator; setMessage - Sets a loading/status message */
  const { setLoading, setMessage } = useLoading();

  useEffect(() => {
    fetchProjectsList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fetches the project list from the backend and updates component state.
   * Handles loading state and error messaging.
   *
   * @async
   * @function
   * @returns {Promise<void>}
   */
  const fetchProjectsList = async () => {
    setLoading(true);
    setMessage("Fetching project list...");
    try {
      await projectService
        .getListProjects()
        .then(setProjectsData)
        .catch(console.error);
    } catch (error) {
      setMessage("Failed to fetch project list.");
    } finally {
      setLoading(false);
      setMessage(undefined);
    }
  };

  /**
   * Attempts to create a new project and prepend it to the project list state if successful.
   * Handles loading state and error messaging.
   *
   * @async
   * @function
   * @param {string} name - Name of the project
   * @param {string} description - Description of the project
   */
  const saveProject = async (name: string, description: string) => {
    setLoading(true);
    setMessage("Creating project...");
    try {
      const { project, errors } = await projectService.createProject({
        name,
        description,
      });
      if (project) {
        setProjectsData((prev) => [project, ...prev]);
      } else if (errors.length > 0) {
        setMessage(`Failed to create project: ${errors.join(", ")}`);
      } else {
        setMessage("Failed to create project. Unknown error.");
      }
    } catch (error) {
      setMessage("Failed to create project.");
      console.error(error);
    } finally {
      setLoading(false);
      setMessage(undefined);
    }
  };

  /**
   * Returns projects filtered by the current search term.
   * The filter matches the search term against project titles and descriptions.
   *
   * @constant
   * @type {ProjectListItem[]}
   */
  const filteredProjects = projectsData.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="uk-container uk-margin-top uk-width-1-1">
      {/* --- Header --- */}
      <div className="uk-flex uk-flex-middle uk-flex-between uk-margin-medium-bottom">
        <div>
          <h1 className="uk-margin-remove">Projects</h1>
          <p className="uk-text-meta uk-margin-remove">
            Manage and organize your projects
          </p>
        </div>
        {/* Create Button */}
        <button
          className="uk-button uk-flex uk-flex-middle uk-background-secondary"
          style={{ color: "#fff" }}
          onClick={() => setShowModal(true)}
        >
          <span
            className="uk-icon uk-margin-small-right"
            data-uk-icon="icon: plus; ratio: 1"
          ></span>
          Create Project
        </button>
      </div>

      {/* Modal for New Project */}
      {showModal && (
        <ModalNewProject
          show={showModal}
          onClose={() => setShowModal(false)}
          onCreate={saveProject}
        />
      )}

      {/* --- Search Bar --- */}
      <div className="uk-margin-medium-bottom">
        <form className="uk-search uk-search-default uk-width-1-1">
          <span data-uk-search-icon></span>
          <input
            className="uk-search-input uk-width-1-1"
            type="search"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {/* --- Project List --- */}
      {filteredProjects.length > 0 ? (
        <ul className="uk-list uk-list-large" style={{maxHeight: "60vh", overflow: "auto"}}>
          {filteredProjects.map((project) => (
            <ListItem key={project.id} project={project} />
          ))}
        </ul>
      ) : (
        <div className="uk-background-muted uk-text-center uk-padding uk-margin">
          No projects found.
        </div>
      )}
    </div>
  );
};

export default ProjectsList;
