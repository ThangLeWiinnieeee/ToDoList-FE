/**
 * Authentication Service
 * Chứa các hàm API cho xác thực
 */

import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '@/config/urls';

export const authService = {
  /**
   * Đăng ký tài khoản mới
   * @param {Object} payload - { email, password, name }
   * @returns {Promise} Response từ API
   */
  register: (payload) => {
    return axiosClient.post(API_ENDPOINTS.AUTH.REGISTER, payload);
  },

  /**
   * Đăng nhập
   * @param {Object} payload - { email, password }
   * @returns {Promise} Response từ API với token
   */
  login: (payload) => {
    return axiosClient.post(API_ENDPOINTS.AUTH.LOGIN, payload);
  },

  /**
   * Đăng xuất
   * @returns {Promise} Response từ API
   */
  logout: () => {
    return axiosClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },

  /**
   * Lấy thông tin user hiện tại
   * @returns {Promise} User object
   */
  getCurrentUser: () => {
    return axiosClient.get(API_ENDPOINTS.AUTH.CURRENT_USER);
  },

  /**
   * Cập nhật hồ sơ user
   * @param {Object} payload - { name, email, ... }
   * @returns {Promise} User object đã cập nhật
   */
  updateProfile: (payload) => {
    return axiosClient.put(API_ENDPOINTS.AUTH.UPDATE_PROFILE, payload);
  },

  /**
   * Thay đổi mật khẩu
   * @param {Object} payload - { oldPassword, newPassword }
   * @returns {Promise} Response từ API
   */
  changePassword: (payload) => {
    return axiosClient.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, payload);
  },
};

export default authService;
