/**
 * ProjectOverview
 *
 * The main component for displaying an overview of a project, including:
 *   - Project header with summary information.
 *   - The recommended tech stack.
 *   - The recommended team structure.
 *   - The project rationale.
 * 
 * Data is fetched using the project ID from the URL and stored in context.
 * Loading and messaging states are handled via context as well.
 *
 * @component
 */
import { useEffect, useRef, type JSX } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useProject, useLoading } from "../../context";
import { projectService } from "../../services";

import ProjectOverviewHeader from "./ProjectOverviewHeader";
import ProjectOverviewTech from "./ProjectOverviewTech";
import ProjectOverviewTeam from "./ProjectOverviewTeam";
import ProjectOverviewRationale from "./ProjectOverviewRationale";

/**
 * Fetches and displays an overview of the specified project.
 * Pulls project data using the project ID from URL params,
 * handles loading states, and renders the header, tech stack,
 * team structure, and rationale components.
 *
 * @returns {JSX.Element} The project overview UI.
 */
export default function ProjectOverview(): JSX.Element {
  const { id } = useParams();
  const { setLoading, setMessage } = useLoading();
  const { setProjectData } = useProject();
  const navigate = useNavigate();
  const container = useRef<HTMLDivElement>(null);

  /**
   * Fetch the project data from the API and update context.
   * Handles loading state and error messaging.
   */
  const fetchProject = async () => {
    try {
      setLoading(true);
      setMessage("Loading project data...");

      if (typeof id !== "string" || !id.trim()) {
        throw new Error("Invalid project ID");
      }
      const data = await projectService.getProjectById(id);
      setProjectData(data);
    } catch (err) {
      navigate('/')
      console.error(err);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  // On initial mount and whenever project ID changes, fetch project data
  useEffect(() => {
    container?.current?.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    fetchProject();
  }, [id]);

  return (
    <div className="uk-flex uk-flex-column uk-width-1-1 uk-height-1-1 uk-animation-fade uk-overflow-auto uk-padding" ref={container}>
      <ProjectOverviewHeader />

      {/* Content */}
      <main className="uk-section uk-section-default uk-flex-1">
        <div
          className="uk-container uk-container-expand uk-grid-large"
          uk-grid="true"
        >
          {/* Tech Stack */}
          <ProjectOverviewTech />

          {/* Team Structure */}
          <ProjectOverviewTeam />

          {/* Rationale */}
          <ProjectOverviewRationale />
        </div>
      </main>
    </div>
  );
}
