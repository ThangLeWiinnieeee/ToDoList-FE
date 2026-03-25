/**
 * API Error Codes
 */

export const API_ERROR_CODES = {
  // Auth errors
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  USER_NOT_FOUND: 'USER_NOT_FOUND',
  EMAIL_ALREADY_EXISTS: 'EMAIL_ALREADY_EXISTS',
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',

  // Todo errors
  TODO_NOT_FOUND: 'TODO_NOT_FOUND',
  TODO_ALREADY_DELETED: 'TODO_ALREADY_DELETED',

  // Tag errors
  TAG_NOT_FOUND: 'TAG_NOT_FOUND',

  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',

  // Server errors
  INTERNAL_ERROR: 'INTERNAL_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
};

export const ERROR_CODE_MESSAGES = {
  [API_ERROR_CODES.INVALID_CREDENTIALS]: 'Invalid email or password.',
  [API_ERROR_CODES.USER_NOT_FOUND]: 'User not found.',
  [API_ERROR_CODES.EMAIL_ALREADY_EXISTS]: 'Email already in use.',
  [API_ERROR_CODES.UNAUTHORIZED]: 'You need to login.',
  [API_ERROR_CODES.FORBIDDEN]: 'You do not have permission to perform this action.',
  [API_ERROR_CODES.TODO_NOT_FOUND]: 'Task not found.',
  [API_ERROR_CODES.TAG_NOT_FOUND]: 'Tag not found.',
  [API_ERROR_CODES.VALIDATION_ERROR]: 'Invalid data.',
  [API_ERROR_CODES.INTERNAL_ERROR]: 'Internal server error.',
  [API_ERROR_CODES.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable.',
};
