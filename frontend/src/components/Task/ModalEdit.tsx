import React, { useState, useEffect, type JSX } from "react";
import { useParams } from "react-router-dom";
import {
  type TaskDetails,
  type TaskStatus,
  type UpdateTask,
} from "../../types/Task";
import { type UserSelectItem } from "../../types/User";
import { userService } from "../../services";

/**
 * Props for the ModalEdit component.
 * @interface ModalEditProps
 * @property {boolean} show - Whether to show the modal dialog.
 * @property {() => void} onClose - Callback when modal is closed.
 * @property {TaskDetails} task - The currently selected task for editing.
 * @property {(updatedTask: UpdateTask) => void} onSave - Callback when a task is saved.
 */
interface ModalEditProps {
  show: boolean;
  onClose: () => void;
  task: TaskDetails;
  onSave: (updatedTask: UpdateTask) => void;
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
}: ModalEditProps): JSX.Element | null => {
  /**
   * Local state for the editable fields: title, description, status, assignee.
   */
  const [taskTitle, setTaskTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [status, setStatus] = useState<TaskStatus>("TODO");
  const [assignee, setAssignee] = useState<string>("");
  const [users, setUsers] = useState<UserSelectItem[]>([]);
  const { id: taskIdParam } = useParams<{ id: string }>();
  const taskId = taskIdParam ? parseInt(taskIdParam, 10) : null;

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (show) {
      setTaskTitle(task?.title || "");
      setDescription(task?.description || "");
      setStatus(task?.status || "");
      // Find user whose name matches task.assigned and set their id as assignee
      const assignedUser = users.find((user) => user.name === task?.assigned);
      setAssignee(assignedUser ? assignedUser.id.toString() : "");
    }
    // eslint-disable-next-line
  }, [show]);

  /**
   * Handles saving the updated task.
   *
   * @param {React.FormEvent} e - The form submission event.
   * @returns {void}
   */
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedTask: UpdateTask = {
      id: taskId as number,
      title: taskTitle,
      description,
      status,
      assigneeId: assignee,
    };
    onSave(updatedTask);
    onClose();
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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEdit;
