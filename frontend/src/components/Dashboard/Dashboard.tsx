import { useEffect, useState, type JSX } from "react";

import type { DashboardData } from "../../types/Dashboard";
import { dashboardService, emptyState } from "../../services/dashboardService";

import StateCard from "./StateCard";
import StatusPanel from "./StatusPanel";
import QuickActions from "./QuickAccions";

import { useLoading } from "../../context";

/**
 * Dashboard component.
 *
 * Renders an overview of the user's projects and tasks, including summary statistics (total projects,
 * total tasks, in-progress, completed), a visual task status panel, and section for quick navigation/actions.
 * Data is fetched from the dashboard service when the component mounts, and global loading state is managed via context.
 *
 * @returns {JSX.Element} The dashboard overview UI.
 */
const Dashboard = (): JSX.Element => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(emptyState);
  const { setLoading, setMessage } = useLoading();

  useEffect(() => {
    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Fetch dashboard data and manage loading state/messages.
   * Sets dashboardData with API response or shows an error message if failed.
   */
  const fetchDashboardData = async () => {
    setLoading(true);
    setMessage("Fetching dashboard data...");
    try {
      await dashboardService.getDashboard().then(setDashboardData).catch(console.error);
    } catch (error) {
      setMessage("Failed to fetch dashboard data.");
    } finally {
      setLoading(false);
      setMessage(undefined);
    }
  };

  return (
    <div className="uk-container uk-margin-top uk-width-1-1">
      <div className="uk-flex uk-flex-middle uk-flex-between uk-margin-medium-bottom">
        <div>
          <h1 className="uk-margin-remove">Dashboard</h1>
          <p className="uk-text-meta uk-margin-remove">
            Welcome back! Here's your project overview.
          </p>
        </div>
      </div>

      {/* State summary cards */}
      <div
        className="uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-match"
        data-uk-grid
      >
        <div>
          <StateCard icon="folder" label="Total Projects" value={dashboardData.totalProjects} />
        </div>
        <div>
          <StateCard icon="list" label="Total Tasks" value={dashboardData.totalTasks} />
        </div>
        <div>
          <StateCard icon="clock" label="In Progress" value={dashboardData.inProgress} />
        </div>
        <div>
          <StateCard icon="check" label="Completed" value={dashboardData.completed} />
        </div>
      </div>

      {/* Status panel and quick actions */}
      <div className="uk-child-width-1-2@m uk-margin-large-top" data-uk-grid>
        <div>
          <StatusPanel
            toDo={dashboardData.toDo}
            inProgress={dashboardData.inProgress}
            completed={dashboardData.completed}
          />
        </div>
        <div>
          <QuickActions />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
