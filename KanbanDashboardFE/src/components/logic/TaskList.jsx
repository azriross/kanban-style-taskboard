import { useState, useEffect } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../../api/api.js";
import TaskColumns from "../layout/TaskColumns";
import TaskModal from "../modals/TaskModal";
import { DragDropContext } from "@hello-pangea/dnd";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const loadTasks = async () => {
    try {
      const res = await getTasks();
      setTasks(res.data || []);
    } catch (error) {
      console.error("Error loading tasks:", error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleTaskSaved = async (idOrTask, maybeTask) => {
    try {
      if (maybeTask) {
        // Edit mode
        await updateTask(idOrTask, maybeTask);
      } else {
        // Add mode
        await createTask(idOrTask);
      }
      loadTasks();
      setTaskToEdit(null);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      loadTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return; // dropped outside

    // no position change
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const taskId = result.draggableId;
    const newStatus =
      destination.droppableId === "todo"
        ? "To Do"
        : destination.droppableId === "inProgress"
        ? "In Progress"
        : "Done";

    try {
      // find the task and update its status
      const task = tasks.find((t) => t.id.toString() === taskId);
      if (task && task.status !== newStatus) {
        await updateTask(task.id, { ...task, status: newStatus });
        loadTasks();
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  const todoTasks = tasks.filter((t) => t.status === "To Do");
  const inProgressTasks = tasks.filter((t) => t.status === "In Progress");
  const doneTasks = tasks.filter((t) => t.status === "Done");

  return (
    <div>
      <button
        onClick={() => {
          setTaskToEdit(null);
          setIsModalOpen(true);
        }}
      >
        Add New Task
      </button>

      <TaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        taskToEdit={taskToEdit}
        onTaskSaved={handleTaskSaved}
      />

      <DragDropContext onDragEnd={handleDragEnd}>
        <TaskColumns
          todoTasks={todoTasks}
          inProgressTasks={inProgressTasks}
          doneTasks={doneTasks}
          onEdit={(task) => {
            setTaskToEdit(task);
            setIsModalOpen(true);
          }}
          onDelete={handleDelete}
        />
      </DragDropContext>
    </div>
  );
}
