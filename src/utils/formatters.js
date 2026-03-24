/**
 * Utility Functions - Formatters
 * Các hàm định dạng dữ liệu dùng chung
 */

/**
 * Format ngày tháng thành chuỗi dễ đọc
 * @param {Date|string} date - Ngày cần format
 * @param {string} format - Định dạng mong muốn (default: 'DD/MM/YYYY')
 * @returns {string} Ngày đã format
 */
export const formatDate = (date, format = 'DD/MM/YYYY') => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  
  if (format === 'DD/MM/YYYY') {
    return `${day}/${month}/${year}`;
  }
  
  if (format === 'YYYY-MM-DD') {
    return `${year}-${month}-${day}`;
  }
  
  return dateObj.toLocaleDateString('vi-VN');
};

/**
 * Format thời gian tương đối (e.g., "2 hours ago")
 * @param {Date|string} date - Ngày cần format
 * @returns {string} Thời gian tương đối
 */
export const formatTimeAgo = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const secondsAgo = Math.floor((now - dateObj) / 1000);
  
  if (secondsAgo < 60) return 'Vừa xong';
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} phút trước`;
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} giờ trước`;
  if (secondsAgo < 604800) return `${Math.floor(secondsAgo / 86400)} ngày trước`;
  
  return formatDate(dateObj);
};

/**
 * Cắt ngắn chuỗi và thêm "..."
 * @param {string} str - Chuỗi cần cắt
 * @param {number} maxLength - Độ dài tối đa
 * @returns {string} Chuỗi đã cắt
 */
export const truncateString = (str, maxLength = 50) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Format số tiền thành chuỗi dễ đọc
 * @param {number} amount - Số tiền
 * @param {string} currency - Loại tiền (default: 'VND')
 * @returns {string} Số tiền đã format
 */
export const formatCurrency = (amount, currency = 'VND') => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Capitalize chữ cái đầu
 * @param {string} str - Chuỗi cần capitalize
 * @returns {string} Chuỗi đã capitalize
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Chuyển đổi string thành slug cho URL
 * @param {string} str - Chuỗi cần chuyển
 * @returns {string} Slug
 */
export const toSlug = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-');
};
