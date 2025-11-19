import React, { type JSX, useState } from "react";
import { Link } from "react-router-dom";
import TaskCard from "../Task/TaskCard";
import { ModalNewTask } from "../Task";
import { type Project } from "../../types/Project";
import { useIsMobile } from "../../hooks/useMediaQuery";

/**
 * Example project data for the overview. 
 * This would usually be fetched from an API or passed as props.
 */
const projectData: Project = {
  id: 101,
  title: "DevHub MVP",
  description: "Build the initial version of the project management platform",
  date: "18/11/2025",
  tasks: {
    todo: [
      {
        id: 1,
        title: "Implement authentication",
        description: "Add login, signup, and password reset functionality",
        status: "TODO",
        date: "19/11/2025",
      },
    ],
    inProgress: [
      {
        id: 2,
        title: "Design database schema",
        description:
          "Create ER diagrams and define all tables and relationships",
        status: "IN_PROGRESS",
        date: "19/11/2025",
        assigned: "Jane Smith",
      },
    ],
    done: [
      {
        id: 3,
        title: "Set up project structure",
        description:
          "Initialize the project with proper folder structure and dependencies",
        status: "DONE",
        date: "19/11/2025",
        assigned: "John Doe",
      },
    ],
  },
};

/**
 * ProjectsOverview Component
 * 
 * Renders an overview page for a project, including:
 *   - Project title and description at the top
 *   - A button to create a new task
 *   - A 3-column Kanban view for project tasks (Todo, In Progress, Done)
 * 
 * The Kanban columns adjust for mobile using the useIsMobile hook.
 * Each task is displayed as a TaskCard component.
 * 
 * @component
 * @returns {JSX.Element} A project overview and kanban board.
 */
const ProjectsOverview: React.FC = (): JSX.Element => {
  const { title, description, tasks } = projectData;
  const isMobile = useIsMobile();
  const [showModal, setShowModal] = useState(false);

  // Task counts for column headers
  const todoCount = tasks.todo.length;
  const inProgressCount = tasks.inProgress.length;
  const doneCount = tasks.done.length;

  return (
    <div className="uk-container uk-margin-top uk-width-1-1">
      <div className="uk-flex uk-flex-middle uk-flex-between uk-margin-medium-bottom">
        <div className="uk-flex uk-flex-middle">
          {/* Back button/arrow */}
          <Link
            to="/dashboard/projects"
            className="uk-icon uk-margin-small-right"
            data-uk-icon="icon: arrow-left; ratio: 1.5"
            style={{ textDecoration: "none", color: "inherit" }}
          ></Link>
          <div>
            <h1 className="uk-margin-remove">{title}</h1>
            <p className="uk-text-meta uk-margin-remove">{description}</p>
          </div>
        </div>
        {/* Create Task Button */}
        <button
          className="uk-button uk-flex uk-flex-middle uk-background-secondary"
          style={{ color: "#fff" }}
          onClick={() => setShowModal(true)}
        >
          <span
            className="uk-icon uk-margin-small-right"
            data-uk-icon="icon: plus; ratio: 1"
          ></span>
          Create Task
        </button>
      </div>

      {/* Modal for New Task */}
      {showModal && (
        <ModalNewTask
          show={showModal}
          onClose={() => setShowModal(false)}
          onCreate={() => setShowModal(false)}
          project={title}
        />
      )}

      {/* --- Kanban Grid (3 Columns) --- */}
      <div
        className={`uk-flex ${isMobile ? "uk-flex-wrap" : ""}`}
        style={{ gap: "16px" }}
      >
        {/* Column 1: To Do */}
        <div className="uk-width-1-1 uk-width-1-3@m uk-flex uk-flex-column">
          <h3 className="uk-h4 uk-margin-remove-bottom">
            To Do <span className="uk-text-meta">{todoCount}</span>
          </h3>
          <hr className="uk-margin-small-top" />
          {tasks.todo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Column 2: In Progress */}
        <div className="uk-width-1-1 uk-width-1-3@m uk-flex uk-flex-column">
          <h3 className="uk-h4 uk-margin-remove-bottom">
            In Progress <span className="uk-text-meta">{inProgressCount}</span>
          </h3>
          <hr className="uk-margin-small-top" />
          {tasks.inProgress.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Column 3: Done */}
        <div className="uk-width-1-1 uk-width-1-3@m uk-flex uk-flex-column">
          <h3 className="uk-h4 uk-margin-remove-bottom">
            Done <span className="uk-text-meta">{doneCount}</span>
          </h3>
          <hr className="uk-margin-small-top" />
          {tasks.done.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsOverview;
