import { apiRequest } from "./client";

// ==============================
// Auth API
// ==============================

export function registerUser(payload) {
  return apiRequest("/api/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function loginUser(payload) {
  return apiRequest("/api/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export function getMe() {
  return apiRequest("/api/auth/me", {
    method: "GET",
  });
}
