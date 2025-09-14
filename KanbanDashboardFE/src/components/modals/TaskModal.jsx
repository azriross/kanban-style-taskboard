import { useState, useEffect } from "react";
import "../../styles/components/modals/TaskModal.css";

export default function TaskModal({ isOpen, onClose, onTaskSaved, taskToEdit }) {
  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    status: "To Do",
    id: null,
  });

  // Populate form for editing, reset for adding
  useEffect(() => {
    if (taskToEdit) {
      setTaskData({
        title: taskToEdit.title || "",
        description: taskToEdit.description || "",
        status: taskToEdit.status || "To Do",
        id: taskToEdit.id,
      });
    } else {
      setTaskData({ title: "", description: "", status: "To Do", id: null });
    }
  }, [taskToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskData.title) return;

    try {
      if (taskData.id) {
        // Edit mode
        await onTaskSaved(taskData.id, taskData);
      } else {
        // Add mode
        const { id, ...payload } = taskData;
        await onTaskSaved(payload);
      }

      setTaskData({ title: "", description: "", status: "To Do", id: null });
      onClose();
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{taskData.id ? "Edit Task" : "Add New Task"}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="task-input"
            placeholder="Task title"
            value={taskData.title}
            onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
            required
          />
          <textarea
            className="task-textarea"
            placeholder="Description"
            value={taskData.description}
            onChange={(e) =>
              setTaskData({ ...taskData, description: e.target.value })
            }
          />
          <select
            className="task-select"
            value={taskData.status}
            onChange={(e) => setTaskData({ ...taskData, status: e.target.value })}
          >
            <option>To Do</option>
            <option>In Progress</option>
            <option>Done</option>
          </select>
          <div className="modal-actions">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit">
              {taskData.id ? "Update Task" : "Add Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
