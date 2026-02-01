// ==============================
// API Client
// ==============================
// Central place for all API requests

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Generic request helper
export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("protasker_token");

  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "API request failed");
  }

  return data;
}

