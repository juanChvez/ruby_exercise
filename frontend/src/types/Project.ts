import { type GroupedTasks } from "./Task";

/**
 * Represents a brief summary of a project, suitable for display in a project list.
 * @typedef {Object} ProjectListItem
 * @property {number} id - Unique identifier for the project.
 * @property {string} title - The name of the project.
 * @property {string} description - A short summary of the project.
 * @property {number} tasks - Total number of tasks in the project.
 * @property {string} date - Creation or last updated date for the project (ISO or display string).
 */
export type ProjectListItem = {
    id: number;
    title: string;
    description: string;
    tasks: number;
    date: string;
};

/**
 * Represents the detailed structure of a project including categorized tasks.
 * @typedef {Object} Project
 * @property {number} id - Unique identifier for the project.
 * @property {string} title - The name of the project.
 * @property {string} description - A detailed project description.
 * @property {string} date - Creation or last updated date for the project (ISO or display string).
 * @property {GroupedTasks} tasks - Categorized tasks in the project.
 */
export type Project = {
    id: number;
    title: string;
    description: string;
    date: string;
    tasks: GroupedTasks;
};

/**
 * Represents a minimal project object used in select menus.
 * @typedef {Object} ProjectSelectItem
 * @property {string} id - Unique identifier for the project.
 * @property {string} title - The name of the project.
 */
export type ProjectSelectItem = {
    id: string;
    title: string;
};
