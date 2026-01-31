import { apiRequest } from "./client";

// ==============================
// Project API
// ==============================

export function getMyProjects() {
  return apiRequest("/api/projects", {
    method: "GET",
  });
}

export function createProject(payload) {
  return apiRequest("/api/projects", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
