/**
 * API Endpoints Configuration
 * Centralized management of all API endpoints
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

export const API_ENDPOINTS = {
  // Auth endpoints
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    CURRENT_USER: `${API_BASE_URL}/auth/me`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/profile`,
    CHANGE_PASSWORD: `${API_BASE_URL}/auth/change-password`,
  },

  // Todo endpoints
  TODOS: {
    LIST: `${API_BASE_URL}/todos`,
    CREATE: `${API_BASE_URL}/todos`,
    GET_BY_ID: (id) => `${API_BASE_URL}/todos/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/todos/${id}`,
    DELETE: (id) => `${API_BASE_URL}/todos/${id}`,
    GET_COMPLETED: `${API_BASE_URL}/todos/status/completed`,
  },

  // Tag endpoints
  TAGS: {
    LIST: `${API_BASE_URL}/tags`,
    CREATE: `${API_BASE_URL}/tags`,
    GET_BY_ID: (id) => `${API_BASE_URL}/tags/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/tags/${id}`,
    DELETE: (id) => `${API_BASE_URL}/tags/${id}`,
  },

  // Health check
  HEALTH: `${API_BASE_URL.replace('/api', '')}/health`,
};

export default API_ENDPOINTS;
