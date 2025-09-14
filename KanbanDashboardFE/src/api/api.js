// api.js
import axios from "axios";

const API_URL = "https://localhost:5001/api/tasks";

// Get all tasks
export const getTasks = () => axios.get(API_URL);

// Add a task
export const createTask = (task) =>
  axios.post(API_URL, task, {
    headers: { "Content-Type": "application/json" },
  });

// Update a task
export const updateTask = (id, task) =>
  axios.put(`${API_URL}/${id}`, task, {
    headers: { "Content-Type": "application/json" },
  });

// Delete a task
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
