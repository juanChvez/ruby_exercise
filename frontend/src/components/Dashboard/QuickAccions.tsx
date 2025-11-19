import React from "react";
import { Link } from "react-router-dom";

/**
 * QuickActions Component
 *
 * Renders a panel with shortcuts (links) to common actions for the user, such as
 * browsing all projects or viewing all tasks. The design uses UIkit card and list styling.
 *
 * @component
 * @returns {JSX.Element} The QuickActions card element.
 */
const QuickActions: React.FC = () => {
  return (
    <div className="uk-card uk-card-hover uk-card-body uk-box-shadow-small uk-background-muted uk-border-rounded">
      <h3 className="uk-card-title uk-margin-remove-bottom uk-text-bold">
        Quick Actions
      </h3>
      <hr className="uk-divider-small" />

      <ul className="uk-list uk-list-large">
        {/* Action 1: Link to browse all projects */}
        <li>
          <Link
            to="/dashboard/projects"
            className="uk-link-reset uk-flex uk-flex-middle uk-background-hover uk-border-rounded uk-padding-small"
          >
            <span
              className="uk-icon uk-margin-small-right"
              data-uk-icon="icon: folder; ratio: 1.5"
            ></span>
            <span className="uk-text-bold">Browse All Projects</span>
          </Link>
        </li>
        {/* Action 2: Link to view all tasks */}
        <li>
          <Link
            to="/dashboard/tasks"
            className="uk-link-reset uk-flex uk-flex-middle uk-background-hover uk-border-rounded uk-padding-small"
          >
            <span
              className="uk-icon uk-margin-small-right"
              data-uk-icon="icon: list; ratio: 1.5"
            ></span>
            <span className="uk-text-bold">View All Tasks</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default QuickActions;
