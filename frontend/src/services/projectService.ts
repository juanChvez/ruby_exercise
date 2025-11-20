import client from "../apollo";
import {
  PROJECT_LIST,
  GET_PROJECT,
  GET_PROJECTS_SELECT,
} from "../graphql/queries/projects";
import { CREATE_PROJECT } from "../graphql/mutations/projects";
import {
  type ProjectListItem,
  type Project,
  type ProjectSelectItem,
} from "../types/Project";

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
      const { data } = await client.query<{ projects: Array<ProjectListItem> }>(
        {
          query: PROJECT_LIST,
          fetchPolicy: "network-only",
        }
      );
      return data?.projects ?? [];
    } catch (error) {
      console.error("Failed to get project list:", error);
      throw error;
    }
  },

  /**
   * Gets detailed information about a single project by its ID using clent graphql.
   *
   * @param {number | string} id - The unique identifier of the project.
   * @returns {Promise<Project>} The detailed project data.
   * @throws {Error} If unable to retrieve the project.
   */
  getProject: async (id: number | string): Promise<Project> => {
    try {
      const { data } = await client.query<{ project: Project }>({
        query: GET_PROJECT,
        variables: { id },
        fetchPolicy: "network-only",
      });
      if (!data?.project) {
        throw new Error("Project not found");
      }
      return data.project;
    } catch (error) {
      console.error("Failed to get project:", error);
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
      return (
        data?.createProject ?? { project: null, errors: ["Unknown error"] }
      );
    } catch (error) {
      console.error("Failed to create project:", error);
      throw error;
    }
  },

  /**
   * Retrieves a list of projects with id and title for selection menus.
   *
   * @returns {Promise<Array<ProjectSelectItem>>} The list of projects for select inputs.
   * @throws {Error} If unable to fetch the project list.
   */
  getProjectsSelect: async (): Promise<Array<ProjectSelectItem>> => {
    try {
      const { data } = await client.query<{
        projects: Array<ProjectSelectItem>;
      }>({
        query: GET_PROJECTS_SELECT,
        fetchPolicy: "network-only",
      });
      return data?.projects!;
    } catch (error) {
      console.error("Failed to get project list for select:", error);
      throw error;
    }
  },
};
