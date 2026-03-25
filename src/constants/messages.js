/**
 * User-facing Messages
 * Messages sent to users
 */

export const AUTH_MESSAGES = {
  REGISTER_SUCCESS: 'Registration successful! Please login.',
  LOGIN_SUCCESS: 'Login successful!',
  LOGOUT_SUCCESS: 'Logout successful!',
  LOGIN_FAILED: 'Invalid email or password.',
  REGISTER_FAILED: 'Registration failed. Please try again.',
  PASSWORD_CHANGED: 'Password has been changed.',
  PASSWORD_CHANGE_FAILED: 'Password change failed.',
  PROFILE_UPDATED: 'Profile updated successfully!',
  PROFILE_UPDATE_FAILED: 'Profile update failed.',
  UNAUTHORIZED: 'You need to login to continue.',
  SESSION_EXPIRED: 'Session expired. Please login again.',
};

export const TODO_MESSAGES = {
  CREATE_SUCCESS: 'Task created successfully!',
  CREATE_FAILED: 'Failed to create task.',
  UPDATE_SUCCESS: 'Task updated successfully!',
  UPDATE_FAILED: 'Failed to update task.',
  DELETE_SUCCESS: 'Task deleted successfully!',
  DELETE_FAILED: 'Failed to delete task.',
  FETCH_FAILED: 'Unable to load task list.',
  EMPTY_TITLE: 'Please enter a task title.',
};

export const TAG_MESSAGES = {
  CREATE_SUCCESS: 'Tag created successfully!',
  CREATE_FAILED: 'Failed to create tag.',
  UPDATE_SUCCESS: 'Tag updated successfully!',
  UPDATE_FAILED: 'Failed to update tag.',
  DELETE_SUCCESS: 'Tag deleted successfully!',
  DELETE_FAILED: 'Failed to delete tag.',
  FETCH_FAILED: 'Unable to load tag list.',
};

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'This field is required.',
  INVALID_EMAIL: 'Invalid email.',
  PASSWORD_TOO_SHORT: 'Password must be at least 6 characters.',
  PASSWORD_MISMATCH: 'Passwords do not match.',
  MIN_LENGTH: (field, min) => `${field} must be at least ${min} characters.`,
  MAX_LENGTH: (field, max) => `${field} must not exceed ${max} characters.`,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Connection error. Please check your Internet connection.',
  SERVER_ERROR: 'Server error. Please try again later.',
  SOMETHING_WRONG: 'Something went wrong. Please try again.',
  NOT_FOUND: 'Resource not found.',
};
