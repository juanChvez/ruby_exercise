import { useState, type JSX } from "react";
import ListItem from "./ListItem";
import ModalNewProject from "./ModalNewProject";

/**
 * Dummy project data for demonstration purposes.
 * Each object represents a project with basic info and a unique ID.
 * In a real application, replace this with data from an API or state management.
 */
const projectsData = [
  {
    id: 1,
    title: "DevHub MVP",
    description: "Build the initial version of the project management platform",
    tasks: 12,
    date: "19/11/2025",
  },
  {
    id: 2,
    title: "API Development",
    description: "Create RESTful API endpoints for all core features",
    tasks: 8,
    date: "19/11/2025",
  },
  {
    id: 3,
    title: "UI Component Library",
    description: "Design and implement reusable React components",
    tasks: 15,
    date: "19/11/2025",
  },
];

/**
 * ProjectsList component
 *
 * Renders a searchable list of projects. Users can filter projects by title or description.
 * Project data is dummy data and should be replaced with backend/API data in production.
 *
 * @component
 * @returns {JSX.Element} The rendered Projects list UI.
 */
const ProjectsList: React.FC = (): JSX.Element => {
  /** Search term controlled by user input */
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);

  /**
   * Filter projects based on the current search term.
   * The filter matches the search term against project titles and descriptions.
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
          onCreate={() => setShowModal(false)}
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
        <ul className="uk-list uk-list-large">
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
