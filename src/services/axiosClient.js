/**
 * Axios Client Configuration
 * Cấu hình Axios + Interceptors (Tự động gắn Token, xử lý error)
 */

import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Tạo axios instance
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // ✅ Timeout 30s - tránh request hang
});

// Request Interceptor - Gắn token vào header
axiosClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor - Xử lý error & token hết hạn
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // ✅ Handle timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        message: 'Request timeout. Vui lòng thử lại.',
        timeout: true,
      });
    }

    // ✅ Handle abort (user cancel)
    if (error.name === 'AbortError') {
      return Promise.reject({
        message: 'Request bị hủy',
        aborted: true,
      });
    }

    // ✅ Handle 401 - token expired
    if (error.response?.status === 401) {
      Cookies.remove('token');
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
      return Promise.reject({
        message: 'Phiên đăng nhập hết hạn',
        unauthorized: true,
      });
    }

    // ✅ Handle 429 - rate limit
    if (error.response?.status === 429) {
      return Promise.reject({
        message: 'Quá nhiều request. Vui lòng thử lại sau.',
        rateLimited: true,
      });
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default axiosClient;
