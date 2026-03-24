/**
 * User-facing Messages
 * Các thông báo gửi đến người dùng
 */

export const AUTH_MESSAGES = {
  REGISTER_SUCCESS: 'Đăng ký thành công! Vui lòng đăng nhập.',
  LOGIN_SUCCESS: 'Đăng nhập thành công!',
  LOGOUT_SUCCESS: 'Đăng xuất thành công!',
  LOGIN_FAILED: 'Email hoặc mật khẩu không đúng.',
  REGISTER_FAILED: 'Đăng ký thất bại. Vui lòng thử lại.',
  PASSWORD_CHANGED: 'Mật khẩu đã được thay đổi.',
  PASSWORD_CHANGE_FAILED: 'Thay đổi mật khẩu thất bại.',
  PROFILE_UPDATED: 'Cập nhật tài khoản thành công!',
  PROFILE_UPDATE_FAILED: 'Cập nhật tài khoản thất bại.',
  UNAUTHORIZED: 'Bạn cần đăng nhập để tiếp tục.',
  SESSION_EXPIRED: 'Phiên làm việc đã hết hạn. Vui lòng đăng nhập lại.',
};

export const TODO_MESSAGES = {
  CREATE_SUCCESS: 'Tạo công việc thành công!',
  CREATE_FAILED: 'Tạo công việc thất bại.',
  UPDATE_SUCCESS: 'Cập nhật công việc thành công!',
  UPDATE_FAILED: 'Cập nhật công việc thất bại.',
  DELETE_SUCCESS: 'Xóa công việc thành công!',
  DELETE_FAILED: 'Xóa công việc thất bại.',
  FETCH_FAILED: 'Không thể tải danh sách công việc.',
  EMPTY_TITLE: 'Vui lòng nhập tiêu đề công việc.',
};

export const TAG_MESSAGES = {
  CREATE_SUCCESS: 'Tạo thẻ thành công!',
  CREATE_FAILED: 'Tạo thẻ thất bại.',
  UPDATE_SUCCESS: 'Cập nhật thẻ thành công!',
  UPDATE_FAILED: 'Cập nhật thẻ thất bại.',
  DELETE_SUCCESS: 'Xóa thẻ thành công!',
  DELETE_FAILED: 'Xóa thẻ thất bại.',
  FETCH_FAILED: 'Không thể tải danh sách thẻ.',
};

export const VALIDATION_MESSAGES = {
  REQUIRED_FIELD: 'Trường này là bắt buộc.',
  INVALID_EMAIL: 'Email không hợp lệ.',
  PASSWORD_TOO_SHORT: 'Mật khẩu phải có ít nhất 6 ký tự.',
  PASSWORD_MISMATCH: 'Mật khẩu không khớp.',
  MIN_LENGTH: (field, min) => `${field} phải có ít nhất ${min} ký tự.`,
  MAX_LENGTH: (field, max) => `${field} không được vượt quá ${max} ký tự.`,
};

export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Lỗi kết nối. Vui lòng kiểm tra kết nối Internet.',
  SERVER_ERROR: 'Lỗi server. Vui lòng thử lại sau.',
  SOMETHING_WRONG: 'Có lỗi xảy ra. Vui lòng thử lại.',
  NOT_FOUND: 'Không tìm thấy tài nguyên.',
};
