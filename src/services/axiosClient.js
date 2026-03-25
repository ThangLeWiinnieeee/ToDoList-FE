/**
 * Axios Client Configuration
 * Axios configuration + Interceptors (Auto attach Token, error handling)
 */

import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';

// Create axios instance
const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // ✅ Timeout 30s - prevent request hang
});

// Request Interceptor - Attach token to header
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

// Response Interceptor - Handle error & expired token
axiosClient.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // ✅ Handle timeout
    if (error.code === 'ECONNABORTED') {
      return Promise.reject({
        message: 'Request timeout. Please try again.',
        timeout: true,
      });
    }

    // ✅ Handle abort (user cancel)
    if (error.name === 'AbortError') {
      return Promise.reject({
        message: 'Request cancelled',
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
        message: 'Login session expired',
        unauthorized: true,
      });
    }

    // ✅ Handle 429 - rate limit
    if (error.response?.status === 429) {
      return Promise.reject({
        message: 'Too many requests. Please try again later.',
        rateLimited: true,
      });
    }

    return Promise.reject(error.response?.data || error);
  }
);

export default axiosClient;
