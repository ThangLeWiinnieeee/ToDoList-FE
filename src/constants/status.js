/**
 * Status Constants
 * Quản lý các trạng thái dùng trong ứng dụng
 */

export const TODO_STATUS = {
  PENDING: 'pending',
  COMPLETED: 'completed',
  ARCHIVED: 'archived',
};

export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const ASYNC_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
};

export const AUTH_STATUS = {
  AUTHENTICATED: 'authenticated',
  UNAUTHENTICATED: 'unauthenticated',
  LOADING: 'loading',
};
