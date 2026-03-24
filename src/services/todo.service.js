/**
 * Todo Service
 * Chứa các hàm API cho quản lý todos
 */

import axiosClient from './axiosClient';
import { API_ENDPOINTS } from '@/config/urls';

export const todoService = {
  /**
   * Lấy danh sách tất cả todos
   * @returns {Promise} Array of todos
   */
  getTodos: () => {
    return axiosClient.get(API_ENDPOINTS.TODOS.LIST);
  },

  /**
   * Lấy todo theo ID
   * @param {string} id - Todo ID
   * @returns {Promise} Todo object
   */
  getTodoById: (id) => {
    return axiosClient.get(API_ENDPOINTS.TODOS.GET_BY_ID(id));
  },

  /**
   * Tạo todo mới
   * @param {Object} payload - { title, description, dueDate, tags }
   * @returns {Promise} Todo object mới được tạo
   */
  createTodo: (payload) => {
    return axiosClient.post(API_ENDPOINTS.TODOS.CREATE, payload);
  },

  /**
   * Cập nhật todo
   * @param {string} id - Todo ID
   * @param {Object} payload - { title, description, isDone, dueDate, tags }
   * @returns {Promise} Todo object đã cập nhật
   */
  updateTodo: (id, payload) => {
    return axiosClient.put(API_ENDPOINTS.TODOS.UPDATE(id), payload);
  },

  /**
   * Xóa todo (soft delete)
   * @param {string} id - Todo ID
   * @returns {Promise} Response từ API
   */
  deleteTodo: (id) => {
    return axiosClient.delete(API_ENDPOINTS.TODOS.DELETE(id));
  },

  /**
   * Lấy danh sách todos đã hoàn thành
   * @returns {Promise} Array of completed todos
   */
  getCompletedTodos: () => {
    return axiosClient.get(API_ENDPOINTS.TODOS.GET_COMPLETED);
  },
};

export default todoService;
