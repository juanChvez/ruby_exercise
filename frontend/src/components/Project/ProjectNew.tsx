import { useState, useEffect, type JSX } from "react";
import { useNavigate } from "react-router-dom";
import { useLoading, useProject } from "../../context";
import { projectService } from "../../services";
import { AppEvents, emit } from '../../utils/eventBus';

/**
 * ProjectNew Component
 *
 * Renders the form for creating a new project.
 * Allows entry of project name, description, and industry,
 * and cleans up selected project and project data on mount.
 *
 * @component
 * @returns {JSX.Element} The form UI for creating a new project.
 */
export default function ProjectNew(): JSX.Element {
  /**
   * State for storing the form input data.
   */
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    industry: "",
  });

  /**
   * State for storing error message, if any.
   */
  const [error, setError] = useState<string | undefined>();

  const { setLoading, setMessage } = useLoading();
  const { setSelectedProject, setProjectData } = useProject();
  const navigate = useNavigate();

  /**
   * Effect to clear selected project and project data on mount.
   * Removes any previously selected project and resets project data
   * when this component is mounted.
   *
   * @returns {void}
   */
  useEffect(() => {
    setSelectedProject(null);
    setProjectData(null);
  }, []);

  /**
   * Handles form submission logic, including simulating a save loading state.
   *
   * @async
   * @param {object} formData - The form data containing project details.
   * @returns {Promise<void>}
   */
  const onSubmit = async (formData: any): Promise<void> => {
    setError(undefined);
    setLoading(true);
    try {
      await validateFormData(formData);
      await createProject(formData);
    } catch (err: any) {
      console.error(err);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLoading(false);
      setMessage(undefined);
    }
  };

  /**
   * Validates the project form data using the projectService.
   *
   * @async
   * @param {object} data - The project form data to validate.
   * @returns {Promise<any>} The validation result from the backend.
   * @throws {Error} If validation fails or server responds with an error.
   */
  const validateFormData = async (data: object): Promise<any> => {
    try {
      setMessage("Validating project...");
      const validation = await projectService.validateProject(data);
      const { isValid, reason, suggestions } = validation;

      if (!isValid) {
        const message =
          reason +
          "\n\nSuggestions:\n" +
          suggestions.map((s: string) => `- ${s}`).join("\n");
        throw new Error(message);
      }
    } catch (error: any) {
      setError(error?.message || "Error creating project.");
      console.error("Project validation failed:", error);
      throw error;
    }
  };

  /**
   * Creates a new project using the projectService and handles navigation.
   *
   * @async
   * @param {object} data - The project data to create.
   * @returns {Promise<any>} The newly created project object.
   * @throws {Error} If project creation or recommendation generation fails.
   */
  const createProject = async (data: object): Promise<any> => {
    try {
      setMessage("Creating project...");
      const newProject = await projectService.createProject(data);
      setMessage("Creating recommendation...");
      const { id: idProject } = newProject;
      await projectService.createRecomendation(idProject);
      setSelectedProject(idProject);
      emit(AppEvents.PROJECTS_UPDATED);
      navigate(`/project/${idProject}`);
    } catch (error: any) {
      setError(error?.message || "Error creating project.");
      throw error;
    }
  };

  /**
   * Handles changes in form fields and updates form state accordingly.
   *
   * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>} e - The input change event.
   * @returns {void}
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handles the form submit event, preventing default action and invoking onSubmit.
   *
   * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
   * @returns {void}
   */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (onSubmit) onSubmit(formData);
  };

  return (
    <div className="uk-flex uk-flex-center uk-flex-middle uk-height-1-1 uk-padding uk-animation-fade">
      <div className="uk-card uk-card-body uk-width-large uk-border-rounded">
        <h3 className="uk-card-title uk-text-secondary uk-text-bold uk-margin-small-bottom">
          Create New Project
        </h3>
        <p className="uk-text-meta uk-margin-remove-top uk-margin-small-bottom">
          Define your project's key details to get personalized recommendations.
        </p>

        {error && (
          <div
            className="uk-alert-danger uk-alert"
            role="alert"
            style={{ marginBottom: 16, whiteSpace: "pre-wrap" }}
          >
            {error}
          </div>
        )}

        <form className="uk-form-stacked uk-margin-top" onSubmit={handleSubmit}>
          {/* Project Name */}
          <div className="uk-margin-small">
            <label className="uk-form-label" htmlFor="name">
              Project Name
            </label>
            <div className="uk-form-controls">
              <input
                id="name"
                name="name"
                className="uk-input uk-border-rounded"
                type="text"
                placeholder="e.g. Smart Retail Platform"
                value={formData.name}
                onChange={handleChange}
                minLength={4}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="uk-margin-small">
            <label className="uk-form-label" htmlFor="description">
              Description
            </label>
            <div className="uk-form-controls">
              <textarea
                id="description"
                name="description"
                className="uk-textarea uk-border-rounded"
                rows={4}
                placeholder="Describe what your project aims to achieve..."
                value={formData.description}
                onChange={handleChange}
                minLength={50}
                required
              ></textarea>
            </div>
          </div>

          {/* Industry (free text) */}
          <div className="uk-margin-small">
            <label className="uk-form-label" htmlFor="industry">
              Industry
            </label>
            <div className="uk-form-controls">
              <input
                id="industry"
                name="industry"
                className="uk-input uk-border-rounded"
                type="text"
                placeholder="e.g. Technology, Healthcare, Retail..."
                value={formData.industry}
                onChange={handleChange}
                minLength={4}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <div className="uk-margin-top">
            <button
              type="submit"
              className="uk-button uk-button-secondary uk-border-pill uk-width-expand"
              style={{
                outline: "none",
                boxShadow: "none",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <span uk-icon="icon: check"></span>
              <span className="uk-margin-small-left">Create Project</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
