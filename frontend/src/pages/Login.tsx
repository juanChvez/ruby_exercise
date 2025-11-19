import { useState, type JSX } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth, useLoading } from "../context";
import { logo } from "../img";

/**
 * Login page for DevHub – Developer Task & Project Management UI.
 * Branded login for accessing the DevHub platform.
 *
 * @component
 * @returns {JSX.Element} The rendered login page component.
 */
export default function Login(): JSX.Element {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { loading, setLoading, setMessage } = useLoading();

  // Email and password state
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");

  // Handle login form submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setMessage("Validating credentials...");
    setLoading(true);
    setError("");

    try {
      await login({ email, password });
      navigate("/project");
    } catch {
      setError("Incorrect email or password. Please try again.");
    } finally {
      setLoading(false);
      setMessage(undefined);
    }
  };

  return (
    <div className="uk-flex uk-flex-center uk-flex-middle uk-height-viewport uk-background-muted">
      <div className="uk-width-large uk-card">
        <div className="uk-card-media-top uk-flex uk-flex-center uk-margin-top">
          <img src={logo} alt="DevHub Logo" style={{ height: 160 }} />
        </div>
        <div className="uk-card-body">
          <p
            className="uk-text-center uk-text-muted uk-margin-small-top"
            style={{ fontSize: "1.09rem" }}
          >
            Modern Developer Task &amp; Project Management UI.
            <br />
            Organize your engineering work, manage projects, and boost your
            team's productivity.
          </p>

          {/* Render error message if any */}
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
              <label className="uk-form-label" htmlFor="login-email">
                Email
              </label>
              <div className="uk-form-controls">
                <input
                  id="login-email"
                  className="uk-input"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoFocus
                  autoComplete="email"
                />
              </div>
            </div>
            <div className="uk-margin">
              <label className="uk-form-label" htmlFor="login-password">
                Password
              </label>
              <div className="uk-form-controls">
                <input
                  id="login-password"
                  className="uk-input"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <div className="uk-text-center uk-margin-top uk-margin-small-bottom">
            <span className="uk-text-muted">No account?</span>{" "}
            <Link
              to="/register"
              className="uk-link-text"
              style={{ fontWeight: 700 }}
            >
              Register
            </Link>
          </div>

          <hr className="uk-divider-icon" />

          <section className="uk-margin-small-top">
            <div
              className="uk-text-center uk-text-small uk-text-muted"
              style={{ lineHeight: 1.4 }}
            >
              <strong>How DevHub works:</strong>
              <br />
              • Enter your email and password.
              <br />
              • Once logged in, create, assign, and track your project tasks.
              <br />• Collaborate with your engineering team, manage deadlines,
              and monitor project progress—all in one place!
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
