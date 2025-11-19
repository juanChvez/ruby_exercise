import type { JSX } from "react";
import { useLoading } from "../../context";

/**
 * LoadingScreen component
 *
 * Renders a fullscreen translucent overlay with a centered UIkit spinner and an optional message from loading context.
 *
 * @returns {JSX.Element} Fullscreen loading overlay
 */
export default function LoadingScreen(): JSX.Element {
  const { message } = useLoading();
  const displayMessage = message ?? "Loading...";
  return (
    <div
      className="uk-position-cover uk-flex uk-flex-center uk-flex-middle uk-animation-fade"
      style={{
        background: "rgba(255, 255, 255, 0.6)",
        backdropFilter: "blur(3px)",
        zIndex: 1000,
      }}
    >
      <div className="uk-text-center uk-padding-small uk-border-rounded">
        <div uk-spinner="ratio: 4"></div>
        {displayMessage && (
          <p className="uk-text-default uk-margin uk-text-secondary">
            {displayMessage}
          </p>
        )}
      </div>
    </div>
  );
}
