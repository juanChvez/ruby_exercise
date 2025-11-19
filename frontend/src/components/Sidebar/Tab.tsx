import type { JSX } from "react";
import { Link } from "react-router-dom";

/**
 * Props for the Tab component.
 * 
 * @property {string} to - The path to navigate to when the tab is clicked.
 * @property {string} icon - The name of the UIKit icon to display.
 * @property {string} label - The tab label text.
 * @property {boolean} active - Whether this tab is currently active (selected).
 * @property {() => void} [onClick] - Optional click handler invoked when the tab is clicked.
 */
interface TabProps {
  to: string;
  icon: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}

/**
 * Sidebar navigation Tab component.
 *
 * Renders a single tab item (with icon and label), styled appropriately for active/inactive states,
 * and navigates on click using react-router. Optionally accepts a click handler.
 *
 * @component
 * @param {TabProps} props - The props for Tab.
 * @returns {JSX.Element} The rendered tab element for the sidebar navigation.
 */
const Tab: React.FC<TabProps> = ({
  to,
  icon,
  label,
  active,
  onClick,
}: TabProps): JSX.Element => (
  <li
    className={`uk-margin-small-bottom ${
      active ? "uk-background-secondary uk-text-bold" : ""
    }`}
  >
    <Link
      to={to}
      className="uk-flex uk-flex-middle"
      style={{
        padding: "0.65rem 1.25rem",
        fontSize: "1.05rem",
        transition: "all .18s cubic-bezier(.4,0,.2,1)",
        color: active ? "#fff" : "#222",
      }}
      onClick={onClick}
    >
      <span
        className="uk-icon uk-margin-small-right"
        data-uk-icon={`icon: ${icon}; ratio: 1.12`}
        style={{
          padding: "5px",
        }}
      ></span>
      {label}
    </Link>
  </li>
);

export default Tab;
