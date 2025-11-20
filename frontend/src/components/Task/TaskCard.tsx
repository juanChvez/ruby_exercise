import type { JSX } from "react";
import { type Task } from "../../types/Task";
import { Link } from "react-router-dom";

/**
 * Returns the appropriate UIkit label class for a given task status.
 *
 * @param status - The task status value ("TODO" | "IN_PROGRESS" | "DONE")
 * @returns {string} The corresponding UIkit label class name for styling.
 *
 * "TODO"        => "uk-label-danger"
 * "IN_PROGRESS" => "uk-label-warning"
 * "DONE"        => "uk-label-success"
 * (default)     => "uk-label-default"
 */
export function getStatusLabel(status: "TODO" | "IN_PROGRESS" | "DONE"): string {
  let statusClass = "uk-label-default";
  if (status === "TODO") statusClass = "uk-label-danger";
  else if (status === "IN_PROGRESS") statusClass = "uk-label-warning";
  else if (status === "DONE") statusClass = "uk-label-success";
  return statusClass;
}


/**
 * TaskCard component
 *
 * Renders a clickable card with information about a task,
 * including its title, description, status, assignee, and due date.
 *
 * @param {Object} props
 * @param {Task} props.task - The task object to display
 * @returns {JSX.Element} A stylized task card
 */
const TaskCard = ({
  task,
  layout = "default",
}: {
  task: Task;
  layout?: "default" | "compact";
}): JSX.Element => {
  const isDeafult = layout === "default";
  const statusClass = getStatusLabel(task.status);

  return (
    <Link
      to={`/dashboard/tasks/${task.id}`}
      style={{ textDecoration: "none", color: "inherit", display: "block" }}
      className="uk-card uk-card-hover uk-box-shadow-small uk-margin-small-bottom"
    >
      <div className="uk-card uk-card-body uk-padding-small">
        <p className="uk-margin-remove-bottom uk-text-bold uk-text-break">{task.title}</p>
        <p className="uk-text-meta uk-margin-remove uk-text-small">
          {task.description}
        </p>

        <hr className="uk-margin-small uk-divider-icon" />

        {/* Status and meta footer */}
        {isDeafult ? (
          <>
            <div className="uk-width-1-1">
              <span className={`uk-label uk-padding-xsmall ${statusClass}`}>
                {task.status}
              </span>
            </div>
            <div className={`uk-width-1-1 uk-margin-top uk-flex`}>
              {/* Assigned user */}
              {task.assigned && (
                <div
                  className="uk-width-auto uk-flex uk-flex-middle"
                  style={{
                    maxWidth: 140,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <span
                    className="uk-icon uk-margin-small-right"
                    data-uk-icon="icon: user; ratio: 0.8"
                  ></span>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                      display: "inline-block",
                      verticalAlign: "middle",
                      maxWidth: 100,
                    }}
                  >
                    {task.assigned}
                  </span>
                </div>
              )}

              {/* Due date */}
              <div className="uk-width-expand uk-text-right uk-flex uk-flex-right uk-flex-middle">
                <span
                  className="uk-icon uk-margin-small-right"
                  data-uk-icon="icon: clock; ratio: 0.8"
                ></span>
                {task.date}
              </div>
            </div>
          </>
        ) : (
          <div className="uk-flex" style={{ gap: "16px" }}>
            <span className={`uk-label uk-padding-xsmall ${statusClass}`}>
              {task.status}
            </span>
            {task.assigned && (
              <div
                className="uk-width-auto uk-flex uk-flex-middle"
                title={task.assigned}
                style={{
                  maxWidth: 140,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                <span
                  className="uk-icon uk-margin-small-right"
                  data-uk-icon="icon: user; ratio: 0.8"
                ></span>
                <span
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    display: "inline-block",
                    verticalAlign: "middle",
                    maxWidth: 100,
                  }}
                >
                  {task.assigned}
                </span>
              </div>
            )}
            {/* Due date */}
            <div className="uk-width-expand uk-text-right uk-flex uk-flex-right uk-flex-middle">
              <span
                className="uk-icon uk-margin-small-right"
                data-uk-icon="icon: clock; ratio: 0.8"
              ></span>
              {task.date}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
};

export default TaskCard;
