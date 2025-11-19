import React, { type JSX } from "react";
import { type TaskActivity } from "../../types/Task";

/**
 * Props for the ActivityCard component.
 * @typedef {Object} ActivityLogProps
 * @property {TaskActivity} activity - The task activity entry to display.
 */
interface ActivityLogProps {
  activity: TaskActivity;
}

/**
 * Renders a label for the given activity type.
 *
 * @param {"status" | "comment" | "creation"} type - The type of activity.
 * @returns {JSX.Element | null} The rendered JSX for the activity label or null.
 */
const renderActivityLabel = (type: "status" | "comment" | "creation"): JSX.Element | null => {
  if (type === "status") {
    return (
      <span className="uk-label uk-label-success uk-margin-small-right">
        Status
      </span>
    );
  } else if (type === "comment") {
    return (
      <span className="uk-label uk-label-primary uk-margin-small-right">
        Comment
      </span>
    );
  } else if (type === "creation") {
    return (
      <span className="uk-label uk-label-default uk-margin-small-right">
        Created
      </span>
    );
  }
  return null;
};

/**
 * ActivityCard displays a single entry in the activity log for a task.
 *
 * @component
 * @param {ActivityLogProps} props - The component props.
 * @param {TaskActivity} props.activity - The specific task activity to display.
 * @returns {JSX.Element} The rendered activity card.
 */
const ActivityCard: React.FC<ActivityLogProps> = ({ activity }) => (
  <div>
    <div className="uk-flex uk-flex-middle uk-flex-between">
      <span>
        <strong>{activity.user}</strong>
        <span className="uk-text-meta uk-margin-small-left">
          {activity.time}
        </span>
      </span>
      {renderActivityLabel(activity.type)}
    </div>
    <div>{activity.text}</div>
  </div>
);

export default ActivityCard;
