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
  [API_ERROR_CODES.INVALID_CREDENTIALS]: 'Email hoặc mật khẩu không đúng.',
  [API_ERROR_CODES.USER_NOT_FOUND]: 'Người dùng không được tìm thấy.',
  [API_ERROR_CODES.EMAIL_ALREADY_EXISTS]: 'Email đã được sử dụng.',
  [API_ERROR_CODES.UNAUTHORIZED]: 'Bạn cần đăng nhập.',
  [API_ERROR_CODES.FORBIDDEN]: 'Bạn không có quyền thực hiện hành động này.',
  [API_ERROR_CODES.TODO_NOT_FOUND]: 'Công việc không được tìm thấy.',
  [API_ERROR_CODES.TAG_NOT_FOUND]: 'Thẻ không được tìm thấy.',
  [API_ERROR_CODES.VALIDATION_ERROR]: 'Dữ liệu không hợp lệ.',
  [API_ERROR_CODES.INTERNAL_ERROR]: 'Lỗi server nội bộ.',
  [API_ERROR_CODES.SERVICE_UNAVAILABLE]: 'Dịch vụ tạm thời không khả dụng.',
};
