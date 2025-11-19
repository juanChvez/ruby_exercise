import type { JSX } from "react";
import { Link } from "react-router-dom";
import { type ProjectListItem } from "../../types/Project";

/**
 * ListItem component
 *
 * Displays a single list item representing a project.
 * The item is a clickable link leading to the project's dashboard page.
 *
 * @param {Object} props - Component properties
 * @param {ProjectListItem} props.project - The project data to display.
 * @returns {JSX.Element} List item containing project info.
 */
const ListItem = ({ project }: { project: ProjectListItem }): JSX.Element => (
  <li className="uk-margin-small-top uk-padding-small uk-card uk-card-hover uk-card-body uk-box-shadow-small uk-border-rounded">
    <Link
      to={`/dashboard/projects/${project.id}`}
      className="uk-link-reset"
      style={{ display: "block" }}
    >
      <div className="uk-grid-small uk-flex-middle" data-uk-grid>
        {/* Folder Icon */}
        <div className="uk-width-auto uk-flex uk-flex-center uk-flex-middle">
          <span
            className="uk-icon"
            data-uk-icon="icon: folder; ratio: 1.5"
          ></span>
        </div>
        {/* Title and Description */}
        <div className="uk-width-expand">
          <p className="uk-margin-remove-bottom uk-text-large">
            {project.title}
          </p>
          <p className="uk-text-meta uk-margin-remove uk-text-small">
            {project.description}
          </p>
        </div>
        {/* Tasks count and Date */}
        <div className="uk-width-auto uk-text-right">
          <p className="uk-margin-remove-bottom uk-text-bold">
            {project.tasks} tasks
          </p>
          <p className="uk-text-meta uk-margin-remove uk-text-small">
            {project.date}
          </p>
        </div>
      </div>
    </Link>
  </li>
);

export default ListItem;
