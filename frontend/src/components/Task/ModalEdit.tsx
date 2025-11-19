import React, { useState } from "react";
import { type TaskDetails, type TaskStatus } from "../../types/Task";

/**
 * Props for the ModalEdit component.
 * @typedef {Object} ModalEditProps
 * @property {boolean} show - Whether to show the modal dialog.
 * @property {() => void} onClose - Callback when modal is closed.
 * @property {TaskDetails} task - The currently selected task for editing.
 * @property {(updatedTask: TaskDetails) => void} onSave - Callback when a task is saved.
 */
interface ModalEditProps {
  show: boolean;
  onClose: () => void;
  task: TaskDetails;
  onSave: (updatedTask: TaskDetails) => void;
}

/** 
 * Array of valid status options for a task.
 * @type {TaskStatus[]}
 */
const statusOptions: TaskStatus[] = ["TODO", "IN_PROGRESS", "DONE"];

/**
 * ModalEdit allows users to edit details of a task in a modal dialog.
 *
 * @component
 * @param {ModalEditProps} props - The component props.
 * @returns {JSX.Element|null} The rendered modal edit form or null if not shown.
 */
const ModalEdit: React.FC<ModalEditProps> = ({
  show,
  onClose,
  task,
  onSave,
}) => {
  /**
   * Local state for the editable fields: title, description, status, assignee.
   */
  const [taskTitle, setTaskTitle] = useState<string>(task.taskTitle);
  const [description, setDescription] = useState<string>(task.description);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [assignee, setAssignee] = useState<string>(task.assignee);

  /**
   * Handle saving the updated task.
   *
   * @param {React.FormEvent} e - The form submission event.
   */
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: TaskDetails = {
      ...task,
      taskTitle,
      description,
      status,
      assignee,
    };
    onSave(updatedTask);
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
        <h3 className="uk-modal-title">Edit Task</h3>
        <form onSubmit={handleSave}>
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
            <label className="uk-form-label">Status</label>
            <div className="uk-form-controls">
              <select
                className="uk-select"
                value={status}
                onChange={(e) => setStatus(e.target.value as TaskStatus)}
              >
                {statusOptions.map((opt) => (
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
              <input
                className="uk-input"
                type="text"
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
              />
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
