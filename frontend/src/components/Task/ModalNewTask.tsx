import React, { useState, type JSX } from "react";
import { type TaskStatus } from "../../types/Task";

/**
 * Props for the ModalNewTask component.
 * @interface ModalNewTaskProps
 * @property {boolean} show - Whether the modal is visible.
 * @property {() => void} onClose - Callback function to close the modal.
 * @property {(task: TaskDetails) => void} onCreate - Callback function called when a new task is created.
 * @property {string} [project] - (optional) The project title to set for the new task (removes select if provided)
 */
interface ModalNewTaskProps {
  show: boolean;
  onClose: () => void;
  onCreate: (task: any) => void;
  project?: string;
}

const statusOptions: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];
const projectOptions: string[] = [
  "DevHub MVP",
  "Marketing Website",
  "Mobile App",
  "Internal Tool"
];

const assigneeOptions: string[] = [
  "Jane Smith",
  "John Doe",
  "Alice Lee",
  "Maria Garcia"
];

/**
 * ModalNewTask allows users to create a new task in a modal dialog.
 *
 * @component
 * @param {ModalNewTaskProps} props - The props for the ModalNewTask component.
 * @returns {JSX.Element|null} The rendered new task modal or null if not visible.
 */
const ModalNewTask: React.FC<ModalNewTaskProps> = ({
  show,
  onClose,
  onCreate,
  project,
}: ModalNewTaskProps): JSX.Element | null => {
  // Use received project prop if provided, otherwise use projectOptions[0].
  const [projectTitle, setProjectTitle] = useState<string>(project || projectOptions[0] || "");
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [assignee, setAssignee] = useState<string>(assigneeOptions[0] || "");

  /**
   * Reset form fields when the modal is shown.
   */
  React.useEffect(() => {
    if (show) {
      setProjectTitle(project || projectOptions[0] || "");
      setTaskTitle("");
      setDescription("");
      setStatus("TODO");
      setAssignee(assigneeOptions[0] || "");
    }
    // Only reset on show/project change
    // eslint-disable-next-line
  }, [show, project]);

  /**
   * Handle the "Create" action for the task.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const createdDate = new Date().toLocaleDateString();
    const newTask = {
      projectTitle,
      taskTitle,
      description,
      status,
      assignee,
      createdDate
    };
    onCreate(newTask);
    onClose();
  };

  if (!show) return null;

  return (
    <div
      className="uk-modal uk-open uk-flex uk-flex-middle uk-flex-center"
      style={{ display: "block" }}
    >
      <div className="uk-modal-dialog uk-modal-body">
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
          <div className="uk-margin">
            <label className="uk-form-label">Project</label>
            <div className="uk-form-controls">
              {project ? (
                <input
                  className="uk-input"
                  type="text"
                  value={project}
                  readOnly
                  disabled
                  style={{ backgroundColor: "#f5f5f5" }}
                />
              ) : (
                <select
                  className="uk-select"
                  value={projectTitle}
                  onChange={e => setProjectTitle(e.target.value)}
                  required
                >
                  {projectOptions.map((proj) => (
                    <option key={proj} value={proj}>
                      {proj}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Title</label>
            <div className="uk-form-controls">
              <input
                className="uk-input"
                type="text"
                value={taskTitle}
                onChange={e => setTaskTitle(e.target.value)}
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
                onChange={e => setDescription(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Status</label>
            <div className="uk-form-controls">
              <select
                className="uk-select"
                value={status}
                onChange={e => setStatus(e.target.value as TaskStatus)}
              >
                {statusOptions.map(opt => (
                  <option key={opt} value={opt}>
                    {opt
                      .replace("TODO", "To Do")
                      .replace("IN_PROGRESS", "In Progress")
                      .replace("DONE", "Done")}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="uk-margin">
            <label className="uk-form-label">Assignee</label>
            <div className="uk-form-controls">
              <select
                className="uk-select"
                value={assignee}
                onChange={e => setAssignee(e.target.value)}
                required
              >
                {assigneeOptions.map(option => (
                  <option key={option} value={option}>
                    {option}
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
