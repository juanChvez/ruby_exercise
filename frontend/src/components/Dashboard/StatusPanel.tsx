import React from "react";

/**
 * Props for the StatusPanel component.
 * @property {number} toDo - The number of "To Do" tasks.
 * @property {number} inProgress - The number of tasks currently "In Progress".
 * @property {number} completed - The number of "Completed" (Done) tasks.
 */
interface StatusPanelProps {
  toDo: number;
  inProgress: number;
  completed: number;
}

/**
 * Displays a status panel showing the breakdown of tasks (To Do, In Progress, Done)
 * along with visual progress bars representing the proportion of each status.
 *
 * @param {StatusPanelProps} props - The props for the StatusPanel.
 * @returns {JSX.Element}
 */
const StatusPanel: React.FC<StatusPanelProps> = ({
  toDo,
  inProgress,
  completed,
}) => {
  const totalStatusTasks: number = toDo + inProgress + completed;
  /**
   * Percentage of tasks that are in progress.
   * @type {number}
   */
  const inProgressPercent: number =
    totalStatusTasks > 0 ? (inProgress / totalStatusTasks) * 100 : 0;

  /**
   * Percentage of tasks that are completed.
   * @type {number}
   */
  const completedPercent: number =
    totalStatusTasks > 0 ? (completed / totalStatusTasks) * 100 : 0;

  /**
   * Percentage of tasks that are "To Do".
   * @type {number}
   */
  const toDoPercent: number =
    totalStatusTasks > 0 ? (toDo / totalStatusTasks) * 100 : 0;

  return (
    <div className="uk-card uk-card-hover uk-card-body uk-box-shadow-small uk-background-muted uk-border-rounded">
      <div className="uk-flex uk-flex-middle uk-flex-between">
        <h3 className="uk-card-title uk-margin-remove-bottom uk-text-bold">
          Task Status
        </h3>
      </div>
      <hr className="uk-divider-small" />

      <ul className="uk-list">
        <li>
          <div className="uk-flex uk-flex-middle uk-flex-between">
            <p className="uk-margin-remove">To Do</p>
            <p className="uk-text-meta uk-margin-remove">{toDo} tasks</p>
          </div>
          <progress
            className="uk-progress uk-margin-small-top"
            value={toDoPercent}
            max={100}
            style={{ height: "6px", borderRadius: "10px" }}
          ></progress>
        </li>

        <li className="uk-margin-small-top">
          <div className="uk-flex uk-flex-middle uk-flex-between">
            <p className="uk-margin-remove">In Progress</p>
            <p className="uk-text-meta uk-margin-remove">{inProgress} tasks</p>
          </div>
          {/* Progress bar (In Progress). Shows the ratio of in-progress tasks out of total */}
          <progress
            className="uk-progress uk-margin-small-top"
            value={inProgressPercent}
            max={100}
            style={{ height: "6px", borderRadius: "10px" }}
          ></progress>
        </li>

        <li className="uk-margin-small-top">
          <div className="uk-flex uk-flex-middle uk-flex-between">
            <p className="uk-margin-remove">Done</p>
            <p className="uk-text-meta uk-margin-remove">{completed} tasks</p>
          </div>
          {/* Progress bar (Done). Shows the ratio of completed tasks out of total */}
          <progress
            className="uk-progress uk-margin-small-top"
            value={completedPercent}
            max={100}
            style={{ height: "6px", borderRadius: "10px" }}
          ></progress>
        </li>
      </ul>
    </div>
  );
};

export default StatusPanel;
