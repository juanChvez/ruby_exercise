import { useState, type JSX } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, useLoading } from "../context";
import { logo } from "../img";

/**
 * Register component for account creation.
 *
 * Renders a registration form for new users, handles form state, performs validation,
 * submits the registration data, and displays error/loading states as appropriate.
 * On successful registration, the user is redirected to the projects.
 *
 * @component
 * @returns {JSX.Element} The registration form UI.
 */
export default function RegisterPage(): JSX.Element {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { loading, setLoading, setMessage } = useLoading();

  /**
   * State hook for name field.
   */
  const [name, setName] = useState("");
  /**
   * State hook for email field.
   */
  const [email, setEmail] = useState("");
  /**
   * State hook for password field.
   */
  const [password, setPassword] = useState("");
  /**
   * State hook for password confirmation field.
   */
  const [confirm, setConfirm] = useState("");
  /**
   * State hook for error messages to display.
   */
  const [error, setError] = useState("");

  /**
   * Handles register form submission: performs basic validation,
   * attempts to register via the auth context, and handles navigation or errors.
   *
   * @param {React.FormEvent} e - The form submission event.
   * @returns {Promise<void>}
   */
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    setMessage("Registering your account...");

    try {
      await register({name, email, password, passwordConfirmation: confirm});
      navigate("/dashboard");
    } catch (err: any) {
      setError(
        err?.message ||
          "Registration failed. Please try again or use a different email."
      );
    } finally {
      setLoading(false);
      setMessage(undefined);
    }
  };

  return (
    <div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-background-muted">
      <div className="uk-width-large uk-card">
        <div className="uk-card-media-top uk-flex uk-flex-center uk-margin-top">
          <img
            src={logo}
            alt="DevHub Logo"
            style={{ height: 160 }}
          />
        </div>
        <div className="uk-card-body">
          <p
            className="uk-text-center uk-text-muted uk-margin-small-top"
            style={{ fontSize: "1.09rem" }}
          >
            Create your DevHub account to manage, organize, and track your development projects and team tasks in one place.
          </p>

          {error && (
            <div className="uk-alert-danger uk-margin-small" uk-alert="true">
              {error}
            </div>
          )}

          <form
            className="uk-form-stacked uk-margin-top"
            onSubmit={handleSubmit}
            autoComplete="on"
          >
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="register-name">
                Name
              </label>
              <div className="uk-form-controls">
                <input
                  id="register-name"
                  className="uk-input"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  autoFocus
                  autoComplete="name"
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="register-email">
                Email
              </label>
              <div className="uk-form-controls">
                <input
                  id="register-email"
                  className="uk-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="register-password">
                Password
              </label>
              <div className="uk-form-controls">
                <input
                  id="register-password"
                  className="uk-input"
                  type="password"
                  placeholder="Choose a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="register-confirm">
                Confirm Password
              </label>
              <div className="uk-form-controls">
                <input
                  id="register-confirm"
                  className="uk-input"
                  type="password"
                  placeholder="Re-enter password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  autoComplete="new-password"
                />
              </div>
            </div>
            <button
              className="uk-button uk-button-primary uk-width-1-1 uk-box-shadow-small"
              type="submit"
              style={{
                borderRadius: "6px",
                fontWeight: 600,
                fontSize: "1.15rem",
                letterSpacing: "0.04em",
                marginTop: 4,
              }}
              disabled={loading}
            >
              {loading ? "Creating account..." : "Register"}
            </button>
          </form>
          <div className="uk-text-center uk-margin-top uk-margin-small-bottom">
            <span className="uk-text-muted">Already have an account?</span>{" "}
            <Link
              to="/login"
              className="uk-link-text"
              style={{ fontWeight: 700 }}
            >
              Login
            </Link>
          </div>

          <hr className="uk-divider-icon" />

          <section className="uk-margin-small-top">
            <div
              className="uk-text-center uk-text-small uk-text-muted"
              style={{ lineHeight: 1.4 }}
            >
              <strong>Steps to get started with DevHub:</strong>
              <br />
              • Enter your name, email, and password to register.
              <br />
              • After registration, set up your first project or join a team.
              <br />• Start managing tasks, tracking progress, and collaborate efficiently!
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
