/**
 * Represents a single task in the system, suitable for basic task listings and cards.
 * @typedef {Object} Task
 * @property {number} id - Unique identifier for the task.
 * @property {string} title - The short, descriptive title of the task.
 * @property {string} description - A detailed description of what the task entails.
 * @property {TaskStatus} status - Current status of the task ("TODO", "IN_PROGRESS", or "DONE").
 * @property {string} date - Task's creation or due date (ISO or display string).
 * @property {string} [assigned] - Name of the person assigned to the task (optional).
 */
export type Task = {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
    date: string;
    assigned?: string;
};

/**
 * Represents grouped tasks by their status for a project.
 * `todo`: List of tasks with status "TODO"
 * `inProgress`: List of tasks with status "IN_PROGRESS"
 * `done`: List of tasks with status "DONE"
 * @property {Task[]} todo - Tasks with status "TODO".
 * @property {Task[]} inProgress - Tasks with status "IN_PROGRESS".
 * @property {Task[]} done - Tasks with status "DONE".
 */
export type GroupedTasks = {
    todo: Task[];
    inProgress: Task[];
    done: Task[];
  };

/**
 * The allowed status values for a task.
 * @typedef {"TODO" | "IN_PROGRESS" | "DONE"} TaskStatus
 */
export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

/**
 * Represents a single activity event attached to a task (e.g., status change, comment, creation).
 * @typedef {Object} TaskActivity
 * @property {string} user - User performing the activity.
 * @property {string} time - Timestamp or display string indicating when the activity occurred.
 * @property {string} text - Textual description of the activity.
 * @property {"status" | "comment" | "creation"} type - Type of activity event.
 */
export type TaskActivity = {
    user: string;
    time: string;
    text: string;
    type: "status" | "comment" | "creation";
};

/**
 * Detailed information about a task, typically for full task view or modal.
 * @typedef {Object} TaskDetails
 * @property {string} projectTitle - The title of the project this task belongs to.
 * @property {string} taskTitle - The full title of the task.
 * @property {string} description - Detailed description of the task.
 * @property {TaskStatus} status - Current status of the task.
 * @property {string} assignee - Name of the person assigned to the task.
 * @property {string} createdDate - When the task was created (display string or ISO).
 * @property {TaskActivity[]} activity - Chronological list of activity events for the task.
 */
export type TaskDetails = {
    projectTitle: string;
    taskTitle: string;
    description: string;
    status: TaskStatus;
    assignee: string;
    createdDate: string;
    activity: TaskActivity[];
};
