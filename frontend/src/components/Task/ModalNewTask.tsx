import React, { useState, useEffect, type JSX } from "react";
import { type NewTask } from "../../types/Task";
import { type ProjectSelectItem } from "../../types/Project";
import { type UserSelectItem } from "../../types/User";
import { projectService, userService } from "../../services";

/**
 * Props for the ModalNewTask component.
 * @typedef {Object} ModalNewTaskProps
 * @property {boolean} show - Whether the modal is visible.
 * @property {() => void} onClose - Callback function to close the modal.
 * @property {(newTask: NewTask) => void} onCreate - Callback called when a new task is created.
 * @property {string} [project] - (Optional) The project title to set for the new task (removes select if provided)
 */
interface ModalNewTaskProps {
  show: boolean;
  onClose: () => void;
  onCreate: (newTask: NewTask) => void;
  projectSelected?: string | null;
}

/**
 * ModalNewTask allows users to create a new task in a modal dialog.
 *
 * @param {ModalNewTaskProps} props - The props for the ModalNewTask component.
 * @returns {JSX.Element | null} The rendered new task modal or null if not visible.
 */
const ModalNewTask: React.FC<ModalNewTaskProps> = ({
  show,
  onClose,
  onCreate,
  projectSelected = null,
}: ModalNewTaskProps): JSX.Element | null => {
  const [projectId, setProjectId] = useState<string>("");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [assignee, setAssignee] = useState<string>("");

  // State for projects using ProjectSelectItem[]
  const [projects, setProjects] = useState<ProjectSelectItem[]>([]);
  const [users, setUsers] = useState<UserSelectItem[]>([]);

  useEffect(() => {
    getProjects();
    getUsers();
  }, []);

  /**
   * Reset form fields when the modal is shown.
   *
   * @returns {void}
   */
  useEffect(() => {
    if (show) {
      setProjectId(projectSelected ?? projects[0].id);
      setDescription("");
      setAssignee(users[0].id.toString());
      setTaskTitle("");
      setDescription("");
    }
    // eslint-disable-next-line
  }, [show]);

  /**
   * Handle the "Create" action for the task.
   *
   * @param {React.FormEvent} e - The form submission event.
   * @returns {void}
   */
  const handleCreate = (e: React.FormEvent): void => {
    e.preventDefault();
    const newTask: NewTask = {
      title: taskTitle,
      description,
      projectId: parseInt(projectId),
      assigneeType: "User",
      assigneeId: parseInt(assignee),
    };
    onCreate(newTask);
    onClose();
  };

  /**
   * Asynchronously fetches the list of projects for selection and updates state.
   *
   * Uses the projectService to retrieve the available projects and sets the local state.
   * Logs errors in case the fetch fails and resets the projects state to an empty array.
   *
   * @returns {Promise<void>}
   */
  const getProjects = async (): Promise<void> => {
    try {
      // Use projectService to fetch the list of projects for selection
      const projects = await projectService.getProjectsSelect();
      setProjects(projects);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      setProjects([]);
    }
  };

  /**
   * Asynchronously fetches the list of users for selection and updates state.
   *
   * Uses the userService to retrieve available users and sets the local state.
   * Logs errors if the fetch fails and resets the assignee options to an empty array.
   *
   * @returns {Promise<void>}
   */
  const getUsers = async (): Promise<void> => {
    try {
      // Use userService to fetch the list of users for selection
      const users = await userService.getUsersSelect();
      setUsers(users);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      setUsers([]);
    }
  };

  if (!show) return null;

  return (
    <div
      className="uk-modal uk-open uk-flex uk-flex-middle uk-flex-center"
      style={{ display: "block" }}
    >
      <div className="uk-modal-dialog uk-modal-body uk-border-rounded">
        <button
          className="uk-modal-close-default"
          type="button"
          data-uk-close=""
          aria-label="Close"
          onClick={onClose}
          style={{ right: 10, top: 10, position: "absolute" }}
        />
        <h3 className="uk-modal-title">New Task</h3>
        <form onSubmit={handleCreate}>
          {!projectSelected && (
            <div className="uk-margin">
              <label className="uk-form-label">Project</label>
              <div className="uk-form-controls">
                <select
                  className="uk-select"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  required
                >
                  {projects.map((proj) => (
                    <option key={`${proj.id}-${proj.title}`} value={proj.id}>
                      {proj.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
          <div className="uk-margin">
            <label className="uk-form-label">Title</label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                type="text"
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Description</label>
            <div className="uk-form-controls">
              <textarea
                className="uk-textarea"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Assignee</label>
            <div className="uk-form-controls">
              <select
                className="uk-select"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                required
              >
                {users.map((option) => (
                  <option key={`${option.id}-${option.name}`} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="uk-flex uk-flex-right uk-margin-top">
            <button
              type="button"
              className="uk-button uk-button-default uk-margin-right"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="uk-button uk-background-secondary"
              style={{ color: "#fff" }}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalNewTask;
