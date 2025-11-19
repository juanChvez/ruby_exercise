import type { JSX } from "react";
import { useProject } from "../../context/ProjectContext";
import { useIsMobile } from "../../hooks/useMediaQuery";

/**
 * ProjectOverviewHeader
 *
 * Renders the header section for the project overview page.
 * Displays the project name, description, and industry.
 * Adjusts layout responsively based on device type (mobile or not).
 *
 * Uses context to retrieve the current project data.
 *
 * @component
 * @returns {JSX.Element} Header section with project info.
 */
export default function ProjectOverviewHeader(): JSX.Element {
  const { projectData } = useProject();
  const isMobile = useIsMobile();

  return (
    <header
      className="uk-section uk-flex uk-flex-middle uk-flex-center uk-text-center"
      style={{
        minHeight: isMobile ? "unset" : "30vh",
      }}
    >
      <div className="uk-width-1-1">
        <span
          uk-icon="icon: laptop; ratio: 2"
          className="uk-text-secondary"
        ></span>
        <h2 className="uk-heading-medium uk-text-bold uk-margin-small-top uk-text-secondary">
          {projectData?.name || "Untitled Project"}
        </h2>
        <p className="uk-text-muted uk-text-lead uk-margin-remove-top">
          {projectData?.description || "No description provided."}
        </p>
        {projectData?.industry && (
          <div className="uk-margin-small-top uk-text-meta">
            <span uk-icon="icon: tag" className="uk-margin-small-right"></span>
            {projectData?.industry}
          </div>
        )}
      </div>
    </header>
  );
}
