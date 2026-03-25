/**
 * Todo Service
 * Contains API functions for todo management
 */

import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '@/config/urls';

export const todoService = {
  /**
   * Get all todos list
   * @returns {Promise} Array of todos
   */
  getTodos: () => {
    return axiosClient.get(API_ENDPOINTS.TODOS.LIST);
  },

  /**
   * Get todo by ID
   * @param {string} id - Todo ID
   * @returns {Promise} Todo object
   */
  getTodoById: (id) => {
    return axiosClient.get(API_ENDPOINTS.TODOS.GET_BY_ID(id));
  },

  /**
   * Create new todo
   * @param {Object} payload - { title, description, dueDate, tags }
   * @returns {Promise} Newly created todo object
   */
  createTodo: (payload) => {
    return axiosClient.post(API_ENDPOINTS.TODOS.CREATE, payload);
  },

  /**
   * Update todo
   * @param {string} id - Todo ID
   * @param {Object} payload - { title, description, isDone, dueDate, tags }
   * @returns {Promise} Updated todo object
   */
  updateTodo: (id, payload) => {
    return axiosClient.put(API_ENDPOINTS.TODOS.UPDATE(id), payload);
  },

  /**
   * Delete todo (soft delete)
   * @param {string} id - Todo ID
   * @returns {Promise} Response from API
   */
  deleteTodo: (id) => {
    return axiosClient.delete(API_ENDPOINTS.TODOS.DELETE(id));
  },

  /**
   * Get completed todos list
   * @returns {Promise} Array of completed todos
   */
  getCompletedTodos: () => {
    return axiosClient.get(API_ENDPOINTS.TODOS.GET_COMPLETED);
  },
};

export default todoService;
