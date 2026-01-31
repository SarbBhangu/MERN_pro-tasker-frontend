// ==============================
// API Client
// ==============================
// Central place for all API requests

const API_URL = import.meta.env.VITE_API_URL;

// Generic request helper
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("protasker_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}
