/**
 * Tag Service
 * Chứa các hàm API cho quản lý tags
 */

import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '@/config/urls';

export const tagService = {
  /**
   * Lấy danh sách tất cả tags
   * @returns {Promise} Array of tags
   */
  getTags: () => {
    return axiosClient.get(API_ENDPOINTS.TAGS.LIST);
  },

  /**
   * Lấy tag theo ID
   * @param {string} id - Tag ID
   * @returns {Promise} Tag object
   */
  getTagById: (id) => {
    return axiosClient.get(API_ENDPOINTS.TAGS.GET_BY_ID(id));
  },

  /**
   * Tạo tag mới
   * @param {Object} payload - { name, color }
   * @returns {Promise} Tag object mới được tạo
   */
  createTag: (payload) => {
    return axiosClient.post(API_ENDPOINTS.TAGS.CREATE, payload);
  },

  /**
   * Cập nhật tag
   * @param {string} id - Tag ID
   * @param {Object} payload - { name, color }
   * @returns {Promise} Tag object đã cập nhật
   */
  updateTag: (id, payload) => {
    return axiosClient.put(API_ENDPOINTS.TAGS.UPDATE(id), payload);
  },

  /**
   * Xóa tag
   * @param {string} id - Tag ID
   * @returns {Promise} Response từ API
   */
  deleteTag: (id) => {
    return axiosClient.delete(API_ENDPOINTS.TAGS.DELETE(id));
  },
};

export default tagService;
