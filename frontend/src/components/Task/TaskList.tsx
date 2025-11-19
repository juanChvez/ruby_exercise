import React, { useState } from "react";
import TaskCard from "./TaskCard";
import type { Task } from "../../types/Task";
import ModalNewTask from "./ModalNewTask";

// Mock data for tasks
const mockTasks: Task[] = [
  {
    id: 1,
    title: "Implement authentication",
    description: "Add login, signup, and password reset functionality",
    status: "TODO",
    date: "19/11/2025",
  },
  {
    id: 2,
    title: "Design database schema",
    description: "Create ER diagrams and define all tables and relationships",
    status: "IN_PROGRESS",
    date: "19/11/2025",
    assigned: "Jane Smith",
  },
  {
    id: 3,
    title: "Set up project structure",
    description:
      "Initialize the project with proper folder structure and dependencies",
    status: "DONE",
    date: "19/11/2025",
    assigned: "John Doe",
  },
];

const TaskList: React.FC = () => {
  /** Search term controlled by user input */
  const [searchTerm, setSearchTerm] = useState("");
  // State for modal visibility
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);

  /**
   * Filter tasks based on the current search term.
   * The filter matches the search term against task titles and descriptions.
   */
  const filteredTasks = mockTasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle opening the modal
  const handleCreateTaskClick = () => setShowNewTaskModal(true);
  // Handle closing the modal
  const handleCloseModal = () => setShowNewTaskModal(false);

  // For now, this just closes the modal. In the future, you can add logic to update the task list.
  const handleCreateTask = (task: any) => {
    setShowNewTaskModal(false);
    // Could add logic to insert into task list here
  };

  return (
    <div className="uk-container uk-margin-top uk-width-1-1">
      {/* --- New Task Modal --- */}
      <ModalNewTask show={showNewTaskModal} onClose={handleCloseModal} onCreate={handleCreateTask} />

      {/* --- Header --- */}
      <div className="uk-flex uk-flex-middle uk-flex-between uk-margin-medium-bottom">
        <div>
          <h1 className="uk-margin-remove">Tasks</h1>
          <p className="uk-text-meta uk-margin-remove">
            View, manage, and organize your tasks
          </p>
        </div>
        {/* Create Task Button */}
        <button
          className="uk-button uk-flex uk-flex-middle uk-background-secondary"
          style={{ color: "#fff" }}
          type="button"
          onClick={handleCreateTaskClick}
        >
          <span
            className="uk-icon uk-margin-small-right"
            data-uk-icon="icon: plus; ratio: 1"
          ></span>
          Create Task
        </button>
      </div>

      {/* --- Search Bar --- */}
      <div className="uk-margin-medium-bottom">
        <form className="uk-search uk-search-default uk-width-1-1">
          <span data-uk-search-icon></span>
          <input
            className="uk-search-input uk-width-1-1"
            type="search"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </form>
      </div>

      {/* --- Task List --- */}
      {filteredTasks.length > 0 ? (
        <ul className="uk-list uk-list-large">
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} layout="compact" />
          ))}
        </ul>
      ) : (
        <div className="uk-background-muted uk-text-center uk-padding uk-margin">
          No tasks found.
        </div>
      )}
    </div>
  );
};

export default TaskList;
