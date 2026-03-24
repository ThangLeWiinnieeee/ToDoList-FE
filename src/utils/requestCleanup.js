/**
 * Request Cleanup Utilities
 * Công cụ để quản lý state requests - reset, clear, timeout
 */

/**
 * Tạo AbortController cho mỗi request
 * Tự động hủy request sau timeout
 */
export const createAbortController = (timeoutMs = 30000) => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  return { controller, timeoutId };
};

/**
 * Cleanup function - gọi khi component unmount
 */
export const cleanupRequest = (controller, timeoutId) => {
  if (timeoutId) clearTimeout(timeoutId);
  if (controller) controller.abort();
};

/**
 * Reset state helper
 * Dùng để reset tất cả state liên quan đến request
 */
export const resetRequestState = {
  error: null,
  loading: false,
  data: null,
};

/**
 * Handle error response helper
 * Chuẩn hoá error messages
 */
export const handleErrorResponse = (error) => {
  if (error.name === 'AbortError') {
    return 'Request bị hủy (timeout hoặc component unmount)';
  }
  
  if (error.response?.status === 401) {
    return 'Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.';
  }

  if (error.response?.status === 400) {
    return error.response?.data?.message || 'Dữ liệu không hợp lệ';
  }

  if (error.response?.status === 429) {
    return 'Quá nhiều request. Vui lòng thử lại sau.';
  }

  if (error.response?.status === 500) {
    return 'Lỗi server. Vui lòng thử lại sau.';
  }

  if (error.message === 'Network Error') {
    return 'Lỗi kết nối. Kiểm tra kết nối internet.';
  }

  return error.message || 'Có lỗi xảy ra. Vui lòng thử lại.';
};

/**
 * Batch cleanup - dùng khi logout hoặc umount multiple components
 */
export const batchCleanup = (controllers = []) => {
  controllers.forEach(({ controller, timeoutId }) => {
    cleanupRequest(controller, timeoutId);
  });
};
