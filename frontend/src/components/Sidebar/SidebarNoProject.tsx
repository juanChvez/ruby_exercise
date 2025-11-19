import type { JSX } from "react";

/**
 * SidebarNoProjectsAlert component
 *
 * Shows an alert banner in the sidebar when there are no projects to display.
 * 
 * @param {Object} props
 * @param {string} [props.message="You have no projects yet."] - The message displayed in the alert.
 * @returns {JSX.Element} Alert banner indicating no projects exist.
 */
export function SidebarNoProjectsAlert({
  message = "You have no projects yet.",
}): JSX.Element {
  // Styles for the alert banner
  const alertStyle = {
    color: "white",
    fontSize: "0.9rem",
  };

  return (
    <div
      className="uk-alert-primary uk-text-center uk-margin-small uk-border-rounded uk-box-shadow-small uk-padding-small uk-background-secondary"
      role="alert"
      style={alertStyle}
    >
      <span
        className="uk-margin-small-right"
        uk-icon="icon: info; ratio: 1"
      ></span>
      <span>{message}</span>
    </div>
  );
}
