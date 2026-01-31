import { apiRequest } from "./client";

// ==============================
// Task API (Nested Under Projects)
// ==============================

export function getTasks(projectId) {
  return apiRequest(`/api/projects/${projectId}/tasks`, {
    method: "GET",
  });
}

export function createTask(projectId, payload) {
  return apiRequest(`/api/projects/${projectId}/tasks`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function updateTask(projectId, taskId, payload) {
  return apiRequest(`/api/projects/${projectId}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(payload),
  });
}

export function deleteTask(projectId, taskId) {
  return apiRequest(`/api/projects/${projectId}/tasks/${taskId}`, {
    method: "DELETE",
  });
}
