/**
 * Request Cleanup Utilities
 * Tools to manage request state - reset, clear, timeout
 */

/**
 * Create AbortController for each request
 * Auto cancel request after timeout
 */
export const createAbortController = (timeoutMs = 30000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, timeoutId };
};

/**
 * Cleanup function - call when component unmounts
 */
export const cleanupRequest = (controller, timeoutId) => {
  if (timeoutId) clearTimeout(timeoutId);
  if (controller) controller.abort();
};

/**
 * Reset state helper
 * Used to reset all request-related state
 */
export const resetRequestState = {
  error: null,
  loading: false,
  data: null,
};

/**
 * Handle error response helper
 * Standardize error messages
 */
export const handleErrorResponse = (error) => {
  if (error.name === 'AbortError') {
    return 'Request cancelled (timeout or component unmount)';
  }
  
  if (error.response?.status === 401) {
    return 'Login session expired. Please login again.';
  }

  if (error.response?.status === 400) {
    return error.response?.data?.message || 'Invalid data';
  }

  if (error.response?.status === 429) {
    return 'Too many requests. Please try again later.';
  }

  if (error.response?.status === 500) {
    return 'Server error. Please try again later.';
  }

  if (error.message === 'Network Error') {
    return 'Connection error. Check your internet connection.';
  }

  return error.message || 'Something went wrong. Please try again.';
};

/**
 * Batch cleanup - used when logout or unmount multiple components
 */
export const batchCleanup = (controllers = []) => {
  controllers.forEach(({ controller, timeoutId }) => {
    cleanupRequest(controller, timeoutId);
  });
};
