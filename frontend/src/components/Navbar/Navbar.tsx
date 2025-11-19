import type { JSX } from "react";
import { Link } from "react-router-dom";

import { useAuth, useSidebar, useProject } from "../../context";
import { useIsMobile } from "../../hooks/useMediaQuery";

import { logo } from "../../img";

/**
 * Navbar component for the application.
 *
 * Displays the brand logo (and title) on the left, which links to "/project".
 * On mobile, shows a sidebar toggle button.
 * On the right, shows the authenticated user's name with a dropdown menu:
 * - View Profile: Navigates to the user's profile page.
 * - Logout: Logs the user out.
 *
 * @returns {JSX.Element} Navigation bar component.
 */
export default function Navbar(): JSX.Element {
  const { logout, user } = useAuth();
  const isMobile = useIsMobile();
  const { toggleSidebar, closeSidebar, isOpen } = useSidebar();
  const { setSelectedProject } = useProject();
  const isProjectRoute = window.location.pathname.startsWith("/project");

  /**
   * Handles click on the sidebar toggle button (visible in mobile view).
   * Prevents default button behavior and toggles sidebar open/close state.
   *
   * @param {React.MouseEvent<HTMLButtonElement>} e - The click event.
   */
  const handleClickBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    toggleSidebar();
  };

  /**
   * Handles click on the navbar title/logo.
   * Closes the sidebar (if open) and resets the selected project.
   */
  const handleClickTitle = () => {
    closeSidebar();
    setSelectedProject(null);
  };


  return (
    <nav
      className="uk-background-muted"
      style={{ minHeight: 70 }}
      uk-navbar="true"
    >
      <div className="uk-container uk-width-1-1">
        <div className="uk-navbar" style={{ minHeight: 70 }}>
          {/* Left: Logo */}
          <div className="uk-navbar-left uk-flex uk-flex-middle">
            {/* Sidebar toggle button */}
            {isMobile && isProjectRoute && (
              <button
                className="uk-button uk-button-text uk-margin-small-right"
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                type="button"
                style={{ marginRight: 8 }}
                onClick={handleClickBtn}
              >
                <span
                  uk-icon={`icon: ${isOpen ? "close" : "menu"}; ratio: 1.2`}
                ></span>
              </button>
            )}
            <Link
              to="/project"
              className="uk-navbar-item uk-logo uk-flex uk-flex-middle uk-text-bold"
              onClick={handleClickTitle}
            >
              {!isMobile && (
                <img
                  src={logo}
                  alt="Tech Stack Recommender Logo"
                  className="uk-margin-small-right"
                  style={{ height: 36 }}
                />
              )}
              <span className="uk-margin-small-left">
                <span className={isMobile ? "uk-text-small" : "uk-text-large"}>
                  Tech Stack Recommender
                </span>
              </span>
            </Link>
          </div>

          {/* Right: User dropdown */}
          <div className="uk-navbar-right">
            <div className="uk-flex uk-flex-middle">
              <div className="uk-inline">
                {/* 
                  User dropdown trigger: displays the user's name and a dropdown indicator.
                */}
                <button
                  className="uk-button uk-button-text uk-flex uk-flex-middle uk-font-bold"
                  type="button"
                >
                  <span
                    className="uk-margin-small-right uk-text-truncate"
                    style={{ maxWidth: 150 }}
                  >
                    {user?.name}
                  </span>
                  <span uk-icon="icon: triangle-down"></span>
                </button>

                {/* 
                  Dropdown with user actions:
                  - View Profile: Navigates to user profile page.
                  - Logout: Calls logout from auth context.
                */}
                <div
                  className="uk-dropdown uk-dropdown-bottom-right"
                  uk-dropdown="mode: click; offset: 4"
                >
                  <ul className="uk-nav uk-dropdown-nav">
                    <li>
                      <Link to="/profile" className="uk-text-emphasis">
                        View Profile
                      </Link>
                    </li>
                    <li className="uk-nav-divider"></li>
                    <li>
                      <Link
                        to="#logout"
                        className="uk-text-danger"
                        onClick={logout}
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
