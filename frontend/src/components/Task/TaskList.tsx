import React, { useState, useEffect } from "react";
import TaskCard from "./TaskCard";
import type { NewTask, Task } from "../../types/Task";
import ModalNewTask from "./ModalNewTask";
import { tasksService } from "../../services";
import { useLoading, useAuth } from "../../context";

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const { setLoading, setMessage } = useLoading();
  const { isAdmin } = useAuth();

  useEffect(() => {
    fetchTaskList();
  }, []);

  /**
   * Filter tasks based on the current search term.
   * The filter matches the search term against task titles and descriptions.
   */
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle opening the modal
  const handleCreateTaskClick = () => setShowNewTaskModal(true);
  // Handle closing the modal
  const handleCloseModal = () => setShowNewTaskModal(false);

  /**
   * Creates a new task using the tasksService.
   *
   * @param {NewTask} newTask - The new task data to be created.
   * @returns {Promise<Task | null>} The created task or null if failed.
   */
  const handleCreateTask = async (newTask: NewTask): Promise<Task | null> => {
    setLoading(true);
    setMessage("Creating new task...");
    try {
      const createdTask = await tasksService.createTask(newTask);
      if (createdTask) {
        setTasks((prevTasks) => [createdTask, ...prevTasks]);
        setMessage("Task created successfully!");
        return createdTask;
      } else {
        setMessage("Failed to create new task.");
        return null;
      }
    } catch (error) {
      console.error("Failed to create new task:", error);
      setMessage("Failed to create new task.");
      return null;
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(undefined), 1000);
      setShowNewTaskModal(false);
    }
  };

  /**
   * Fetches the list of tasks from the backend service.
   * Replaces the current tasks usage by fetching real data from API.
   */
  const fetchTaskList = async () => {
    setLoading(true);
    setMessage("Loading tasks...");
    try {
      const taskList = await tasksService.getTaskList();
      setTasks(taskList);
    } catch (error) {
      setMessage("Failed to load tasks");
    } finally {
      setLoading(false);
      setMessage(undefined);
    }
  };

  return (
    <div className="uk-container uk-margin-top uk-width-1-1">
      {/* --- New Task Modal --- */}
      <ModalNewTask
        show={showNewTaskModal && isAdmin}
        onClose={handleCloseModal}
        onCreate={handleCreateTask}
      />

      {/* --- Header --- */}
      <div className="uk-flex uk-flex-middle uk-flex-between uk-margin-medium-bottom">
        <div>
          <h1 className="uk-margin-remove">Tasks</h1>
          <p className="uk-text-meta uk-margin-remove">
            View, manage, and organize your tasks
          </p>
        </div>
        {/* Create Task Button */}
        {isAdmin && (
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
        )}
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
        <ul
          className="uk-list uk-list-large"
          style={{ maxHeight: "60vh", overflow: "auto" }}
        >
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
