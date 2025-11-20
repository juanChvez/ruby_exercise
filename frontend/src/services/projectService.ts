import client from "../apollo";
import { PROJECT_LIST, CREATE_PROJECT } from "../graphql/queries/projects";
import { type ProjectListItem } from "../types/Project";

/**
 * Service for managing project-related API operations.
 *
 * @namespace projectService
 */
export const projectService = {

  /**
   * Gets a list of projects for the authenticated user.
   *
   * @returns {Promise<Array<ProjectListItem>>} Array of project list items.
   * @throws {Error} If unable to retrieve projects.
   */
  getListProjects: async (): Promise<Array<ProjectListItem>> => {
    try {
      const { data } = await client.query<{ projects: Array<ProjectListItem> }>({
        query: PROJECT_LIST,
        fetchPolicy: "network-only",
      });
      return data?.projects ?? [];
    } catch (error) {
      console.error("Failed to get project list:", error);
      throw error;
    }
  },

  /**
   * Creates a new project.
   *
   * @param {Object} params - Parameters to create a project.
   * @param {string} params.name - Name of the new project.
   * @param {string} [params.description] - Description of the new project.
   * @returns {Promise<{ project: ProjectListItem | null; errors: string[] }>} The created project and errors if any.
   * @throws {Error} If unable to create project.
   */
  createProject: async ({
    name,
    description,
  }: {
    name: string;
    description?: string;
  }): Promise<{ project: ProjectListItem | null; errors: string[] }> => {
    try {
      const { data } = await client.mutate<{
        createProject: { project: ProjectListItem | null; errors: string[] };
      }>({
        mutation: CREATE_PROJECT,
        variables: { name, description },
      });
      return data?.createProject ?? { project: null, errors: ["Unknown error"] };
    } catch (error) {
      console.error("Failed to create project:", error);
      throw error;
    }
  },

};
