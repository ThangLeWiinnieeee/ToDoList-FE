/**
 * Tag Service
 * Contains API functions for tag management
 */

import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '@/config/urls';

export const tagService = {
  /**
   * Get all tags list
   * @returns {Promise} Array of tags
   */
  getTags: () => {
    return axiosClient.get(API_ENDPOINTS.TAGS.LIST);
  },

  /**
   * Get tag by ID
   * @param {string} id - Tag ID
   * @returns {Promise} Tag object
   */
  getTagById: (id) => {
    return axiosClient.get(API_ENDPOINTS.TAGS.GET_BY_ID(id));
  },

  /**
   * Create new tag
   * @param {Object} payload - { name, color }
   * @returns {Promise} Newly created tag object
   */
  createTag: (payload) => {
    return axiosClient.post(API_ENDPOINTS.TAGS.CREATE, payload);
  },

  /**
   * Update tag
   * @param {string} id - Tag ID
   * @param {Object} payload - { name, color }
   * @returns {Promise} Updated tag object
   */
  updateTag: (id, payload) => {
    return axiosClient.put(API_ENDPOINTS.TAGS.UPDATE(id), payload);
  },

  /**
   * Delete tag
   * @param {string} id - Tag ID
   * @returns {Promise} Response from API
   */
  deleteTag: (id) => {
    return axiosClient.delete(API_ENDPOINTS.TAGS.DELETE(id));
  },
};

export default tagService;
