/**
 * Authentication Service
 * Contains API functions for authentication
 */

import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '@/config/urls';

export const authService = {
  /**
   * Register new account
   * @param {Object} payload - { email, password, name }
   * @returns {Promise} Response from API
   */
  register: (payload) => {
    return axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  },

  /**
   * Login
   * @param {Object} payload - { email, password }
   * @returns {Promise} Response from API with token
   */
  login: (payload) => {
    return axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  },

  /**
   * Logout
   * @returns {Promise} Response from API
   */
  logout: () => {
    return axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  /**
   * Get current user info
   * @returns {Promise} User object
   */
  getCurrentUser: () => {
    return axiosClient.get(API_ENDPOINTS.AUTH.CURRENT_USER);
  },

  /**
   * Update user profile
   * @param {Object} payload - { name, email, ... }
   * @returns {Promise} Updated user object
   */
  updateProfile: (payload) => {
    return axiosClient.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, payload);
  },

  /**
   * Change password
   * @param {Object} payload - { oldPassword, newPassword }
   * @returns {Promise} Response from API
   */
  changePassword: (payload) => {
    return axiosClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, payload);
  },
};

export default authService;
