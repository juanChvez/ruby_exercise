/**
 * Dashboard statistics data structure.
 *
 * @typedef {Object} DashboardData
 * @property {number} totalProjects - Total number of projects.
 * @property {number} totalTask - Total number of tasks.
 * @property {number} completed - Number of completed tasks.
 * @property {number} inProgress - Number of tasks in progress.
 * @property {number} toDO - Number of tasks to do.
 */
export type DashboardData = {
  totalProjects: number;
  totalTasks: number;
  completed: number;
  inProgress: number;
  toDo: number;
};
