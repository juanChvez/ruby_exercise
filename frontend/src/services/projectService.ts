import client from "../apollo";
import { PROJECT_LIST } from "../graphql/queries/projects";
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

};
