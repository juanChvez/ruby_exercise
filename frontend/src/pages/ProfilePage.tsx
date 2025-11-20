import { type JSX, useEffect, useState } from "react";
import { Navbar } from "../components/Navbar";
import { SidebarProvider, useLoading } from "../context";
import { authService } from "../services";
import { type User } from "../types/User";

/**
 * The Profile component displays the currently authenticated user's profile information,
 * including avatar, name, role, email, creation date, and last updated date.
 * It fetches profile data on mount using the provided authentication token.
 * UI elements are styled with UIKit classes.
 *
 * @component
 * @returns {JSX.Element} The rendered profile page
 */
export default function ProfilePage(): JSX.Element {
  /** The state holding the fetched user profile data. */
  const [userData, setUserData] = useState<User | null>(null);
  /** Boolean value indicating if the current user is an admin. */
  const [isAdmin, setIsAdmin] = useState(false);
  /** Loading and message setter functions from loading context. */
  const { setLoading, setMessage } = useLoading();

  useEffect(() => {
    fetchProfile();
    // eslint-disable-next-line
  }, []);

  /**
   * Fetches user profile data from the server and updates state.
   * @async
   * @returns {Promise<void>}
   */
  const fetchProfile = async (): Promise<void> => {
    try {
      setLoading(true);
      setMessage("Loading profile data...");
      const profileData = await authService.getProfile();
      setIsAdmin(profileData.level === "admin");
      setUserData(profileData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setMessage("");
    }
  };

  /**
   * Derives the initials from a user name.
   *
   * @param {string} name - The full name of the user.
   * @returns {string} The initials in uppercase.
   */
  const getInitials = (name: string): string =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("");

  return (
    <SidebarProvider>
      <Navbar />

      <div
        className="uk-flex uk-flex-center uk-flex-middle uk-section-muted uk-flex-expand"
        style={{
          height: "calc(100vh - 80px)",
          backgroundColor: "#f8fafc",
        }}
      >
        <div className="uk-card uk-card-default uk-card-body uk-border-rounded uk-box-shadow-small uk-padding-large uk-width-5-6 uk-width-1-2@m">
          {/* Avatar section */}
          <div className="uk-flex uk-flex-column uk-flex-center uk-flex-middle uk-margin-bottom">
            <div
              className="uk-flex uk-flex-center uk-flex-middle uk-background-secondary uk-margin-bottom uk-box-shadow-small uk-border-circle"
              style={{
                width: 80,
                height: 80,
                fontSize: 28,
                fontWeight: 600,
                color: "#fff",
              }}
            >
              {getInitials(userData?.name || "A")}
            </div>

            <h3
              className="uk-margin-remove uk-text-center uk-text-secondary uk-text-bold"
              style={{ fontSize: 20 }}
            >
              {userData?.name}
            </h3>

            <span
              className={`uk-label uk-text-capitalize uk-margin-small-top uk-text-bold ${
                isAdmin ? "uk-background-secondary" : "uk-background-muted"
              }`}
              style={{
                fontSize: 12,
                color: isAdmin ? "#fff" : "#333", // muted text
              }}
            >
              {userData?.level}
            </span>
          </div>

          <hr className="uk-divider-icon uk-margin-medium uk-divider" />

          {/* Email info */}
          <div className="uk-margin-small-bottom">
            <span className="uk-text-meta uk-text-muted uk-display-block">
              Email
            </span>
            <span
              className="uk-display-block"
              style={{
                fontSize: 15,
                marginTop: 4,
                color: "#475569",
                fontWeight: 500,
              }}
            >
              {userData?.email}
            </span>
          </div>
          {/* Account creation info */}
          <div className="uk-margin-small-bottom">
            <span className="uk-text-meta uk-text-muted uk-display-block">
              Account Created
            </span>
            <span
              className="uk-display-block"
              style={{ marginTop: 4, color: "#475569", fontSize: 14 }}
            >
              {userData?.createdAt}
            </span>
          </div>

          {/* Account last update info */}
          <div>
            <span className="uk-text-meta uk-text-muted uk-display-block">
              Last Updated
            </span>
            <span
              className="uk-display-block"
              style={{ marginTop: 4, color: "#475569", fontSize: 14 }}
            >
              {userData?.updatedAt}
            </span>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
