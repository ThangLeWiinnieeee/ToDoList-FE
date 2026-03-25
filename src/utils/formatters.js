/**
 * Utility Functions - Formatters
 * Common data formatting functions
 */

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @param {string} format - Desired format (default: 'DD/MM/YYYY')
 * @returns {string} Formatted date
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
  
  return dateObj.toLocaleDateString('en-US');
};

/**
 * Format relative time (e.g., "2 hours ago")
 * @param {Date|string} date - Date to format
 * @returns {string} Relative time
 */
export const formatTimeAgo = (date) => {
  if (!date) return '';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();
  const secondsAgo = Math.floor((now - dateObj) / 1000);
  
  if (secondsAgo < 60) return 'Just now';
  if (secondsAgo < 3600) return `${Math.floor(secondsAgo / 60)} minutes ago`;
  if (secondsAgo < 86400) return `${Math.floor(secondsAgo / 3600)} hours ago`;
  if (secondsAgo < 604800) return `${Math.floor(secondsAgo / 86400)} days ago`;
  
  return formatDate(dateObj);
};

/**
 * Truncate string and add "..."
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export const truncateString = (str, maxLength = 50) => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Format amount to readable currency string
 * @param {number} amount - Amount
 * @param {string} currency - Currency type (default: 'USD')
 * @returns {string} Formatted amount
 */
export const formatCurrency = (amount, currency = 'VND') => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Capitalize first letter
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Convert string to URL slug
 * @param {string} str - String to convert
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
