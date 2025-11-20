import client from "../apollo";
import type { DashboardData } from "../types/Dashboard";
import { DASHBOARD_QUERY } from "../graphql/queries/dashboard";

/**
 * Default/empty dashboard state.
 * Used as fallback or initial value for dashboard UI.
 */
export const emptyState: DashboardData = {
  totalProjects: 0,
  totalTasks: 0,
  completed: 0,
  inProgress: 0,
  toDo: 0,
};

/**
 * Service class for dashboard operations.
 */
export const dashboardService = {
  /**
   * Fetch the dashboard summary/statistics for the authenticated user.
   *
   * Makes a network request to the backend to retrieve the project/task
   * stats for the dashboard view. Returns fallback state on absence of data.
   *
   * @returns {Promise<DashboardData>} Resolved with dashboard stats or `emptyState`.
   * @throws {Error} If the network request fails or the query errors.
   */
  getDashboard: async (): Promise<DashboardData> => {
    try {
      const { data } = await client.query<{ dashboard: DashboardData }>({
        query: DASHBOARD_QUERY,
        fetchPolicy: "network-only",
      });
      return data?.dashboard ?? emptyState;
    } catch (error) {
      console.error("Error fetching dashboard:", error);
      throw error;
    }
  }
};
