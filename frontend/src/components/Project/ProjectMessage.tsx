import type { JSX } from "react";
import { Link } from "react-router-dom";

import { logoWithoutName as logo } from "../../img";

/**
 * ProjectMessage component
 *
 * Displays a welcome screen and instructions when no project is selected.
 * Includes a logo, description, and a button to create a new project,
 * as well as a prompt to select a project from the sidebar.
 *
 * @component
 * @returns {JSX.Element} A welcome/info screen for the project area.
 */
export default function ProjectMessage(): JSX.Element {
  return (
    <div className="uk-flex uk-flex-center uk-flex-middle uk-height-1-1 uk-text-center uk-padding uk-border-rounded">
      <div style={{ maxWidth: 480 }}>
        <img
          src={logo}
          alt="Tech Stack Recommender Logo"
          className="uk-margin-small-bottom"
          style={{ height: 180, opacity: 0.9 }}
        />

        <h2 className="uk-heading-small uk-text-bold uk-text-secondary uk-margin-small-top">
          Welcome to Tech Stack Recommender
        </h2>

        <p className="uk-text-meta uk-margin-small-top">
          Build, innovate, and explore — get AI-powered suggestions for the best
          technologies and team structure to bring your ideas to life.
        </p>

        <Link
          to="/project/new"
          className="uk-button uk-button-secondary uk-border-pill uk-margin-top"
          style={{
            padding: "10px 34px",
            outline: "none",
            boxShadow: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <span uk-icon="icon: plus"></span>
          <span className="uk-margin-small-left">Create New Project</span>
        </Link>

        <div className="uk-margin-top uk-text-muted uk-text-small">
          or select a project from the sidebar
        </div>
      </div>
    </div>
  );
}
