import React, { type JSX } from "react";
import { useProject } from "../../context/ProjectContext";

/**
 * Maps team role names to corresponding UIkit icon keys used for display.
 * Keys are normalized to lowercase for matching.
 *
 * @type {Record<string, string>}
 */
const ROLE_ICONS: Record<string, string> = {
  "frontend developer": "code",
  "backend developer": "database",
  "full stack developer": "layers",
  "project manager": "calendar",
  designer: "paint-bucket",
  "ui designer": "paint-bucket",
  "ux designer": "paint-bucket",
  qa: "check",
  tester: "check",
  devops: "cloud",
  infrastructure: "cloud",
};

/**
 * Returns the icon name string for a given team role for use with UIkit's `uk-icon`,
 * falling back to 'user' if an appropriate icon cannot be determined.
 *
 * @param {string} role - The role title to fetch the matching icon key for.
 * @returns {string} The UIkit icon name string.
 */
function getRoleIcon(role: string): string {
  const key = role?.toLowerCase?.() ?? "";
  if (key in ROLE_ICONS) return ROLE_ICONS[key as keyof typeof ROLE_ICONS];
  const foundKey = (
    Object.keys(ROLE_ICONS) as Array<keyof typeof ROLE_ICONS>
  ).find((k) => key.includes(k));
  if (foundKey) return ROLE_ICONS[foundKey];
  return "user";
}

/**
 * Displays the recommended team structure for the project as a card.
 * Lists each recommended team member role and recommended count, with appropriate icons.
 * Uses project data provided from context.
 *
 * @component
 * @returns {JSX.Element} Team structure card for the project.
 */
const ProjectOverviewTeam: React.FC = (): JSX.Element => {
  const { projectData } = useProject();

  return (
    <div className="uk-width-1-2@m">
      <div className="uk-card uk-card-default uk-card-body uk-border-rounded uk-box-shadow-small uk-height-1-1">
        <h4 className="uk-text-secondary uk-text-bold uk-margin-bottom">
          <span uk-icon="icon: users" className="uk-margin-small-right"></span>
          Team Structure
        </h4>
        {projectData?.recommendations.team_structure?.length ? (
          <>
            <ul className="uk-list uk-list-divider uk-margin-remove">
              {projectData?.recommendations.team_structure.map(
                (
                  /** @type {{ role: string, count: number }} */ member,
                  /** @type {number} */ i
                ) => (
                  <li
                    key={i}
                    className="uk-flex uk-flex-between uk-text-small uk-text-muted"
                  >
                    <span
                      uk-icon={`icon: ${getRoleIcon(member.role)}`}
                      className="uk-margin-small-right uk-text-muted"
                    ></span>
                    <span>{member.role}</span>
                    <span>x{member.count}</span>
                  </li>
                )
              )}
            </ul>
            <div className="uk-margin-top uk-text-meta uk-text-right">
              {/* Total team members recommended */}
              Total: {projectData?.recommendations.team_size} members
            </div>
          </>
        ) : (
          <p className="uk-text-meta uk-margin-remove">No team defined.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectOverviewTeam;
