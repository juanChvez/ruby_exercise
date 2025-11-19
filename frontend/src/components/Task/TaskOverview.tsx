import React, { useState, type JSX } from "react";
import { type TaskDetails } from "../../types/Task";
import { getStatusLabel } from "./TaskCard";
import ActivityCard from "./ActivityCard";
import ModalEdit from "./ModalEdit";

/**
 * Example task details for demonstration or preview purposes.
 * @type {TaskDetails}
 */
const initialTaskDetails: TaskDetails = {
  projectTitle: "DevHub MVP",
  taskTitle: "Design database schema",
  description:
    "Create ER diagrams and define all tables and relationships for the project management system",
  status: "IN_PROGRESS",
  assignee: "Jane Smith",
  createdDate: "18/11/2025",
  activity: [
    {
      user: "John Doe",
      time: "2h ago",
      text: "Changed status from To Do to In Progress",
      type: "status",
    },
    {
      user: "Jane Smith",
      time: "5h ago",
      text: "Added a comment: Working on the database schema design",
      type: "comment",
    },
    {
      user: "John Doe",
      time: "1d ago",
      text: "Created the task",
      type: "creation",
    },
  ],
};

/**
 * Component displaying the details of a task and its activity.
 *
 * @component
 * @returns {JSX.Element} The rendered TaskOverview component.
 *
 * @example
 * <TaskOverview />
 */
const TaskOverview: React.FC = (): JSX.Element => {
  /**
   * State for handling the visibility of the edit modal.
   * @type {[boolean, Function]}
   */
  const [showEditModal, setShowEditModal] = useState(false);

  /**
   * State for the details of the current task.
   * @type {[TaskDetails, Function]}
   */
  const [taskDetails, setTaskDetails] = useState<TaskDetails>(initialTaskDetails);

  /**
   * Opens the edit modal dialog.
   * @function
   * @returns {void}
   */
  const handleEditClick = (): void => {
    setShowEditModal(true);
  };

  /**
   * Closes the edit modal dialog.
   * @function
   * @returns {void}
   */
  const handleEditClose = (): void => {
    setShowEditModal(false);
  };

  /**
   * Updates the task details after editing and saves the update.
   * @function
   * @param {TaskDetails} updatedTask - The updated task data.
   * @returns {void}
   */
  const handleEditSave = (updatedTask: TaskDetails): void => {
    setTaskDetails(updatedTask);
  };

  return (
    <div className="uk-container uk-margin-top uk-width-1-1">
      {/* Edit Modal for Task */}
      <ModalEdit
        show={showEditModal}
        onClose={handleEditClose}
        task={taskDetails}
        onSave={handleEditSave}
      />
      {/* Project Title */}
      <p className="uk-text-meta uk-margin-remove">
        {taskDetails.projectTitle}
      </p>
      {/* Task Title and Edit Button */}
      <div className="uk-flex uk-flex-middle uk-flex-between">
        <h2 className="uk-margin-remove-top">{taskDetails.taskTitle}</h2>
        <button
          className="uk-button uk-background-secondary uk-button-small"
          type="button"
          onClick={handleEditClick}
          style={{ color: "#fff" }}
        >
          Edit
        </button>
      </div>
      {/* Task Description */}
      <div className="uk-margin-top">
        <strong>Description:</strong>
        <p className="uk-margin-remove">{taskDetails.description}</p>
      </div>
      {/* Task Meta Information */}
      <div
        className="uk-grid-small uk-child-width-auto uk-margin-top"
        data-uk-grid
      >
        {/* Task Status */}
        <div>
          <span className={`uk-label uk-padding-xsmall ${getStatusLabel(taskDetails.status)}`}>
            {taskDetails.status}
          </span>
        </div>
        {/* Assignee */}
        <div>
          <span
            className="uk-icon uk-margin-small-right"
            data-uk-icon="icon: user"
          ></span>
          <strong>Assignee:</strong> {taskDetails.assignee}
        </div>
        {/* Created Date */}
        <div>
          <span
            className="uk-icon uk-margin-small-right"
            data-uk-icon="icon: calendar"
          ></span>
          <strong>Created:</strong> {taskDetails.createdDate}
        </div>
      </div>
      {/* Activity Log */}
      <div className="uk-margin-large-top">
        <h4>Activity</h4>
        <ul className="uk-list uk-list-divider">
          {taskDetails.activity.map(
            /**
             * Render an activity item for the activity log.
             * @param {any} act - Activity log item object.
             * @param {number} idx - Index of the activity.
             * @returns {JSX.Element}
             */
            (act, idx) => (
              <li key={idx}>
                {/* Activity log card */}
                <ActivityCard activity={act} />
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default TaskOverview;
