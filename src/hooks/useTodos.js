/**
 * useTodos Hook
 * Gọi todo.service, quản lý state danh sách todos, loading, error
 */

import { useState, useEffect, useCallback } from 'react';
import todoService from '@/services/todo.service';
import { TODO_MESSAGES } from '@/constants/messages';

/**
 * Custom hook để quản lý todos
 * @param {Object} options - Configuration options
 * @returns {Object} Todo state và methods
 */
export const useTodos = (options = {}) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(options.initialFilter || 'all');

  // Lấy danh sách todos
  const fetchTodos = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.getTodos();
      console.log('📋 fetchTodos response:', response);
      
      // Handle different response formats
      let todosList = [];
      if (Array.isArray(response)) {
        todosList = response;
      } else if (response.data?.todos && Array.isArray(response.data.todos)) {
        todosList = response.data.todos;
      } else if (response.todos && Array.isArray(response.todos)) {
        todosList = response.todos;
      } else if (response.data && Array.isArray(response.data)) {
        todosList = response.data;
      }
      
      setTodos(todosList);
      console.log('✅ Set todos:', todosList);
    } catch (err) {
      setError(err.message || TODO_MESSAGES.FETCH_FAILED);
      console.error('Fetch todos error:', err);
      setTodos([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  }, []);

  // Load todos khi component mount
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Tạo todo mới
  const createTodo = useCallback(async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.createTodo(payload);
      console.log('📝 Create response:', response);
      
      // Fetch lại danh sách mới (thay vì thêm local)
      await fetchTodos();
      return response;
    } catch (err) {
      setError(err.message || TODO_MESSAGES.CREATE_FAILED);
      console.error('Create todo error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTodos]);

  // Cập nhật todo
  const updateTodo = useCallback(
    async (id, payload) => {
      try {
        setLoading(true);
        setError(null);
        const response = await todoService.updateTodo(id, payload);
        const updatedTodo = response.data?.todo || response.todo || response;
        
        // Ensure todos is always an array
        const currentTodos = Array.isArray(todos) ? todos : [];
        setTodos(currentTodos.map((t) => (t._id === id ? updatedTodo : t)));
        return updatedTodo;
      } catch (err) {
        setError(err.message || TODO_MESSAGES.UPDATE_FAILED);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [todos]
  );

  // Xóa todo
  const deleteTodo = useCallback(
    async (id) => {
      try {
        setLoading(true);
        setError(null);
        await todoService.deleteTodo(id);
        
        // Ensure todos is always an array
        const currentTodos = Array.isArray(todos) ? todos : [];
        setTodos(currentTodos.filter((t) => t._id !== id));
      } catch (err) {
        setError(err.message || TODO_MESSAGES.DELETE_FAILED);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [todos]
  );

  // Filter todos theo status
  const getFilteredTodos = useCallback(() => {
    const currentTodos = Array.isArray(todos) ? todos : [];
    if (filter === 'completed') {
      return currentTodos.filter((t) => t.isDone);
    }
    if (filter === 'pending') {
      return currentTodos.filter((t) => !t.isDone);
    }
    return currentTodos;
  }, [todos, filter]);

  return {
    todos,
    filteredTodos: getFilteredTodos(),
    loading,
    error,
    filter,
    setFilter,
    fetchTodos,
    createTodo,
    updateTodo,
    deleteTodo,
  };
};

export default useTodos;
