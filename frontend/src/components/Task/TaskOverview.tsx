import React, { useState, useEffect, type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type TaskDetails, type UpdateTask } from "../../types/Task";
import { getStatusLabel } from "./TaskCard";
//import ActivityCard from "./ActivityCard";
import ModalEdit from "./ModalEdit";
import { tasksService } from "../../services";
import { useLoading } from "../../context";

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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskDetails, setTaskDetails] = useState<TaskDetails | null>(null);
  const { setLoading, setMessage } = useLoading();

  useEffect(() => {
    if (!id) return;

    fetchTaskInfo(id);
  }, [id]);

  /**
   * Opens the edit modal dialog.
   * @function
   * @returns {void}
   */
  const handleEditClick = (): void => setShowEditModal(true);

  /**
   * Closes the edit modal dialog.
   * @function
   * @returns {void}
   */
  const handleEditClose = (): void => setShowEditModal(false);

  /**
   * Updates the task details after editing and saves the update.
   * @function
   * @param {Task} updatedTask - The updated task data.
   * @returns {void}
   */
  const handleEditSave = async (updatedTask: UpdateTask): Promise<void> => {
    setLoading(true);
    setMessage("Saving changes...");
    try {
      const updated = await tasksService.updateTask(updatedTask);
      if (updated) {
        setTaskDetails((prev) => ({
          ...prev!,
          ...updated,
        }));
        setMessage("Task updated successfully.");
      } else {
        setMessage("Failed to update task.");
      }
    } catch (error) {
      setMessage("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  // Function to fetch single task info using tasksService
  const fetchTaskInfo = async (taskId: string) => {
    setLoading(true);
    setMessage("Loading task details...");
    try {
      const task = await tasksService.getTask(taskId);
      setTaskDetails(task);
      if (!task) {
        navigate('dashboard')
      }
    } catch (error) {
      setMessage("Failed to load task details");
      setTaskDetails(null);
    } finally {
      setLoading(false);
      setMessage(undefined);
    }
  };

  return (
    <div className="uk-container uk-margin-top uk-width-1-1">
      {/* Edit Modal for Task */}
      <ModalEdit
        show={showEditModal}
        onClose={handleEditClose}
        task={taskDetails!}
        onSave={handleEditSave}
      />
      {/* Project Title */}
      <p className="uk-text-meta uk-margin-remove">
        {taskDetails?.projectTitle}
      </p>
      {/* Task Title and Edit Button */}
      <div className="uk-flex uk-flex-middle uk-flex-between">
        <h2 className="uk-margin-remove-top">{taskDetails?.title}</h2>
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
        <p className="uk-margin-remove">{taskDetails?.description}</p>
      </div>
      {/* Task Meta Information */}
      <div
        className="uk-grid-small uk-child-width-auto uk-margin-top"
        data-uk-grid
      >
        {/* Task Status */}
        <div>
          <span
            className={`uk-label uk-padding-xsmall ${getStatusLabel(
              taskDetails?.status ?? "TODO"
            )}`}
          >
            {taskDetails?.status}
          </span>
        </div>
        {/* Assignee */}
        <div>
          <span
            className="uk-icon uk-margin-small-right"
            data-uk-icon="icon: user"
          ></span>
          <strong>Assignee:</strong> {taskDetails?.assigned}
        </div>
        {/* Created Date */}
        <div>
          <span
            className="uk-icon uk-margin-small-right"
            data-uk-icon="icon: calendar"
          ></span>
          <strong>Created:</strong> {taskDetails?.date}
        </div>
      </div>
      {/* Activity Log */}
      {/* TODO: adjust activities */}
      {/* <div className="uk-margin-large-top">
        <h4>Activity</h4>
        <ul className="uk-list uk-list-divider">
          {taskDetails.activity.map(
            (act, idx) => (
              <li key={idx}>
                <ActivityCard activity={act} />
              </li>
            )
          )}
        </ul>
      </div> */}
    </div>
  );
};

export default TaskOverview;
