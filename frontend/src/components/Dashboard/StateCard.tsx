import React, { type JSX } from "react";

/**
 * Props for the StateCard component.
 * @property {string} icon - The UIkit icon name (e.g., "folder", "list", "clock", "check").
 * @property {string} label - The label to display under the icon.
 * @property {number | string} value - The main value/statistic to show.
 */
interface StateCardProps {
  icon: string;
  label: string;
  value: number | string;
}

/**
 * Displays a dashboard stat card with an icon, label, and value.
 *
 * @param {StateCardProps} props
 * @returns {JSX.Element}
 */
const StateCard: React.FC<StateCardProps> = ({
  icon,
  label,
  value,
}: StateCardProps): JSX.Element => {
  return (
    <div className="uk-card uk-card-hover uk-card-body uk-text-center uk-flex uk-flex-column uk-flex-between uk-box-shadow-small uk-background-muted uk-border-rounded">
      <div className="uk-flex uk-flex-center uk-margin-bottom">
        <span
          className="uk-icon uk-background-default uk-box-shadow-small uk-background-muted uk-border-circle uk-padding-small"
          data-uk-icon={`icon: ${icon}; ratio: 2`}
        ></span>
      </div>
      <p className="uk-text-small uk-margin-remove-bottom uk-margin-small-top uk-text-bold">
        {label}
      </p>
      <h2
        className="uk-margin-remove uk-text-bold"
        style={{ fontSize: "2.7rem" }}
      >
        {value}
      </h2>
    </div>
  );
};

export default StateCard;
