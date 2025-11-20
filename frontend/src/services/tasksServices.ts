import client from "../apollo";
import { GET_TASK_LIST } from "../graphql/queries/tasks";
import { type Task } from "../types/Task";

/**
 * Service for managing task-related API operations.
 *
 * @namespace tasksService
 */
export const tasksService = {
  /**
   * Retrieves the list of all tasks using the GraphQL query.
   *
   * @returns {Promise<any>} An array of tasks.
   * @throws {Error} If unable to retrieve the task list.
   */
  getTaskList: async (): Promise<any> => {
    try {
      const { data } = await client.query<{ tasks: Task[] }>({
        query: GET_TASK_LIST,
        fetchPolicy: "network-only"
      });
      return data?.tasks ?? [];
    } catch (error) {
      console.error("Failed to get task list:", error);
      throw error;
    }
  },
};
