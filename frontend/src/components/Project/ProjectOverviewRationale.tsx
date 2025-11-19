import React, { type JSX } from "react";
import { useProject } from "../../context/ProjectContext";

/**
 * ProjectOverviewRationale
 *
 * Displays the "Rationale" for the project as a card.
 * This component retrieves the rationale from the recommendations in the project context.
 *
 * @component
 * @returns {JSX.Element} Rationale card for the project.
 */
const ProjectOverviewRationale: React.FC = (): JSX.Element => {
  const { projectData } = useProject();

  return (
    <div className="uk-width-1-1">
      <div className="uk-card uk-card-default uk-card-body uk-border-rounded uk-box-shadow-small">
        <h4 className="uk-text-secondary uk-text-bold uk-margin-bottom">
          <span
            uk-icon="icon: info"
            className="uk-margin-small-right"
          ></span>
          Rationale
        </h4>
        <p className="uk-text-muted uk-text-small uk-margin-remove">
          {projectData?.recommendations.rationale || "No rationale provided."}
        </p>
      </div>
    </div>
  );
};

export default ProjectOverviewRationale;
