import React, { type JSX, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import TaskCard from "../Task/TaskCard";
import { ModalNewTask } from "../Task";
import { type Project } from "../../types/Project";
import { useIsMobile } from "../../hooks/useMediaQuery";
import { projectService } from "../../services";
import { useLoading } from "../../context";

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
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const { setLoading, setMessage } = useLoading();
  const isMobile = useIsMobile();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!id) return;
    
    fetchProject();
  }, [id]);
  
  const fetchProject = async () => {
      setLoading(true);
      setMessage("Loading project data...");
      try {
        const data = await projectService.getProject(id || '');
        setProject(data);
      } catch (err) {
        setMessage("Failed to load project data.");
      } finally {
        setLoading(false);
      }
    };

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
            <h1 className="uk-margin-remove">{project?.title}</h1>
            <p className="uk-text-meta uk-margin-remove">{project?.description}</p>
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
          project={project?.title}
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
            To Do <span className="uk-text-meta">{project?.tasks.todo.length ?? 0}</span>
          </h3>
          <hr className="uk-margin-small-top" />
          {project?.tasks.todo.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Column 2: In Progress */}
        <div className="uk-width-1-1 uk-width-1-3@m uk-flex uk-flex-column">
          <h3 className="uk-h4 uk-margin-remove-bottom">
            In Progress <span className="uk-text-meta">{project?.tasks.inProgress.length ?? 0}</span>
          </h3>
          <hr className="uk-margin-small-top" />
          {project?.tasks.inProgress.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>

        {/* Column 3: Done */}
        <div className="uk-width-1-1 uk-width-1-3@m uk-flex uk-flex-column">
          <h3 className="uk-h4 uk-margin-remove-bottom">
            Done <span className="uk-text-meta">{project?.tasks.done.length ?? 0}</span>
          </h3>
          <hr className="uk-margin-small-top" />
          {project?.tasks.done.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsOverview;
