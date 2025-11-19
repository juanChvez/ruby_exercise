// TODO: Ajsut
import { apiFetch } from "./apiClient";
import { type ProjectTreeItem, type ProjectData } from "../context";

/**
 * Service for managing project-related API operations.
 *
 * @namespace projectService
 */
export const projectService = {
  /**
   * Retrieves the hierarchical tree structure of projects.
   * Mainly used for displaying projects in the sidebar or overview.
   *
   * @async
   * @function
   * @memberof projectService
   * @returns {Promise<Array<{id: string, name: string}>>} Promise resolving to a list of project objects with id and name.
   */
  getProjectTree: async (): Promise<Array<ProjectTreeItem>> => {
    const rawData = await apiFetch("/project");
    return (
      rawData.projects?.map((project: ProjectData) => ({
        id: project.id,
        name: project.name,
        status: project.status,
        searchable: [
          project.name,
          project.description,
          project.industry,
          ...(project.recommendations?.stack ?? []),
          ...(project.recommendations?.team_structure?.map(member => member.role) ?? []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase(),
      })) ?? []
    );
  },

  /**
   * Fetches the full details of a specific project given its ID.
   *
   * @async
   * @function
   * @memberof projectService
   * @param {string} id - The unique identifier of the project to retrieve.
   * @returns {Promise<any>} A promise that resolves to the project object.
   * @throws {Error} Throws if the project cannot be fetched or does not exist.
   */
  getProjectById: async (id: string): Promise<any> => {
    const data = await apiFetch("/project/" + id);
    return data.project;
  },

  /**
   * Creates a new project and returns the created project object.
   *
   * Uses a POST request to submit the project data.
   *
   * @async
   * @method
   * @memberof projectService
   * @param {object} data - The project data to be sent in the request body.
   *   Should include the fields required by the backend schema (e.g., name, description, industry).
   * @returns {Promise<any>} Resolves with the newly created project object (the "project" property from the response).
   * @throws {Error} If project creation fails on the backend or the server response is not OK.
   */
  createProject: async (data: object): Promise<any> => {
    const newProject = await apiFetch("/project", {
      method: "POST",
      body: JSON.stringify(data),
    });
    return newProject.project;
  },

  /**
   * Creates recommendations for a given project.
   *
   * Sends a POST request to the API to generate recommendations (tech stack, team, etc.)
   * for the specified project.
   *
   * @async
   * @method
   * @memberof projectService
   * @param {string} projectId - The unique identifier of the project for which to generate recommendations.
   * @returns {Promise<any>} Resolves with the generated recommendation data from the API.
   * @throws {Error} If recommendation creation fails or server responds with error.
   */
  createRecomendation: async (projectId: string): Promise<any> => {
    const result = await apiFetch(`/recommendation/project/${projectId}`, {
      method: "POST",
    });
    return result.recommendation;
  },

  /**
   * Validates if the given project input is sufficient for generating a recommendation.
   *
   * Sends a POST request to the backend's project validation endpoint.
   *
   * @async
   * @method
   * @memberof projectService
   * @param {object} data - The project input object to validate (should include name, description, and optionally industry).
   * @returns {Promise<any>} Resolves with the validation result object from the backend.
   * @throws {Error} If validation fails or the server responds with an error.
   */
  validateProject: async (data: object): Promise<any> => {
    const result = await apiFetch("/project/validation", {
      method: "POST",
      body: JSON.stringify(data),
    });

    return result.validation;
  },

  /**
   * Archives (deactivates) a project by its ID.
   *
   * Sends a PATCH request to the API to deactivate ("archive") the specified project.
   *
   * @async
   * @method
   * @memberof projectService
   * @param {string} projectId - The unique identifier of the project to archive.
   * @returns {Promise<any>} Resolves with the updated project object from the API.
   * @throws {Error} If the archive operation fails or the server responds with an error.
   */
  archivateProject: async (projectId: string): Promise<any> => {
    const result = await apiFetch(`/project/${projectId}/deactivate`, {
      method: "PATCH",
    });
    return result.project;
  },

  /**
   * Reactivates (restores) an archived project by its ID.
   *
   * Sends a PATCH request to the API to reactivate the specified project.
   *
   * @async
   * @method
   * @memberof projectService
   * @param {string} projectId - The unique identifier of the project to reactivate.
   * @returns {Promise<any>} Resolves with the updated project object from the API.
   * @throws {Error} If the reactivation operation fails or the server responds with an error.
   */
  reactivateProject: async (projectId: string): Promise<any> => {
    const result = await apiFetch(`/project/${projectId}/reactivate`, {
      method: "PATCH",
    });
    return result.project;
  },

  /**
   * Permanently deletes a project by its ID.
   *
   * Sends a DELETE request to the API to remove the specified project.
   *
   * @async
   * @method
   * @memberof projectService
   * @param {string} projectId - The unique identifier of the project to delete.
   * @returns {Promise<any>} Resolves with the API response after deletion.
   * @throws {Error} If the deletion operation fails or the server responds with an error.
   */
  deleteProject: async (projectId: string): Promise<any> => {
    const result = await apiFetch(`/project/${projectId}`, {
      method: "DELETE",
    });
    return result;
  },
};
