import React, { type JSX } from "react";
import { useProject } from "../../context/ProjectContext";

/**
 * Maps technology names (in lower-case) to their corresponding Devicon class names.
 * Used for rendering technology stack icons.
 */
const TECH_ICONS: Record<string, string> = {
  react: "devicon-react-original colored",
  "react native": "devicon-react-original colored",
  node: "devicon-nodejs-plain colored",
  "node.js": "devicon-nodejs-plain colored",
  express: "devicon-express-original",
  postgresql: "devicon-postgresql-plain colored",
  mongodb: "devicon-mongodb-plain colored",
  python: "devicon-python-plain colored",
  django: "devicon-django-plain",
  flask: "devicon-flask-original",
  vue: "devicon-vuejs-plain colored",
  angular: "devicon-angularjs-plain colored",
  typescript: "devicon-typescript-plain colored",
  javascript: "devicon-javascript-plain colored",
};

/**
 * Returns the icon class string for a given technology name for icon rendering.
 *
 * @param {string} tech - The name of the technology (e.g. "React", "Node.js")
 * @returns {string} - Devicon class name for the technology, or a generic icon if not found.
 */
function getIconClass(tech: string): string {
  const key = tech.toLowerCase();
  if (Object.prototype.hasOwnProperty.call(TECH_ICONS, key)) {
    return TECH_ICONS[key as keyof typeof TECH_ICONS];
  }
  return "devicon-devicon-plain";
}

/**
 * ProjectOverviewTech
 *
 * Displays the list of recommended technologies (tech stack) for the current project.
 * Each technology is rendered with its associated Devicon icon.
 *
 * Uses context to retrieve the current project data and tech stack.
 *
 * @component
 * @returns {JSX.Element} Tech stack card for the project.
 */
const ProjectOverviewTech: React.FC = (): JSX.Element => {
  const { projectData } = useProject();

  return (
    <div className="uk-width-1-2@m">
      <div className="uk-card uk-card-default uk-card-body uk-border-rounded uk-box-shadow-small uk-height-1-1">
        <h4 className="uk-text-secondary uk-text-bold uk-margin-bottom">
          <span uk-icon="icon: code" className="uk-margin-small-right"></span>
          Tech Stack
        </h4>
        {projectData?.recommendations.stack?.length ? (
          <ul className="uk-list uk-margin-remove">
            {projectData.recommendations.stack.map((tech, i) => (
              <li
                key={i}
                className="uk-flex uk-flex-middle uk-text-muted uk-text-small"
              >
                <i
                  className={`${getIconClass(
                    tech
                  )} uk-margin-small-right uk-text-muted`}
                  style={{ fontSize: "20px" }}
                ></i>
                {tech}
              </li>
            ))}
          </ul>
        ) : (
          <p className="uk-text-meta uk-margin-remove">
            No tech stack defined.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProjectOverviewTech;
