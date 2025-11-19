import StateCard from "./StateCard";
import StatusPanel from "./StatusPanel";
import QuickActions from "./QuickAccions";
import type { JSX } from "react";

/**
 * Dashboard Component
 *
 * Displays an overview of projects and tasks, including summary cards,
 * a task status panel, and quick navigation actions.
 *
 * @component
 * @returns {JSX.Element} The dashboard view.
 */
const Dashboard = (): JSX.Element => {
  /**
   * Dashboard summary data.
   * Mook
   * @type {{ totalProjects: number, totalTasks: number, inProgress: number, completed: number, toDo: number }}
   */
  const data = {
    totalProjects: 12,
    totalTasks: 47,
    inProgress: 18,
    completed: 29,
    toDo: 0,
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

      <div
        className="uk-child-width-1-2@s uk-child-width-1-4@m uk-grid-match"
        data-uk-grid
      >
        <div>
          <StateCard icon="folder" label="Total Projects" value={data.totalProjects} />
        </div>
        <div>
          <StateCard icon="list" label="Total Tasks" value={data.totalTasks} />
        </div>
        <div>
          <StateCard icon="clock" label="In Progress" value={data.inProgress} />
        </div>
        <div>
          <StateCard icon="check" label="Completed" value={data.completed} />
        </div>
      </div>

      <div className="uk-child-width-1-2@m uk-margin-large-top" data-uk-grid>
        <div>
          <StatusPanel
            toDo={data.toDo}
            inProgress={data.inProgress}
            completed={data.completed}
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
