import { gql } from "@apollo/client";
import client from "../apollo";
import type { DashboardData } from "../types/Dashboard";

/**
 * GraphQL query to retrieve dashboard summary data.
 */
const DASHBOARD_QUERY = gql`
  query Dashboard {
    dashboard
  }
`;

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
 * Fetch the dashboard summary/statistics for the authenticated user.
 *
 * Makes a network request to the backend to retrieve the project/task
 * stats for the dashboard view. Returns fallback state on absence of data.
 *
 * @returns {Promise<DashboardData>} Resolved with dashboard stats or `emptyState`.
 * @throws {Error} If the network request fails or the query errors.
 */
export async function getDashboard(): Promise<DashboardData> {
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
