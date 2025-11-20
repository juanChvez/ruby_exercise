import client from "../apollo";
import { GET_TASK_LIST, GET_TASK } from "../graphql/queries/tasks";
import { type Task, type TaskDetails } from "../types/Task";

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

  /**
   * Retrieves a single task by its ID using the GraphQL query.
   *
   * @param {string} id - The ID of the task to retrieve.
   * @returns {Promise<Task | null>} The task object or null if not found.
   * @throws {Error} If unable to retrieve the task.
   */
  getTask: async (id: string): Promise<TaskDetails | null> => {
    try {
      const { data } = await client.query<{ task: TaskDetails }>({
        query: GET_TASK,
        variables: { id },
        fetchPolicy: "network-only"
      });
      return data?.task ?? null;
    } catch (error) {
      console.error("Failed to get task:", error);
      throw error;
    }
  },
};
