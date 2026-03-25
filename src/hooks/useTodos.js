/**
 * useTodos Hook
 * Calls todo.service, manages todos list state, loading, error
 */

import { useState, useEffect, useCallback } from 'react';
import todoService from '@/services/todo.service';
import { TODO_MESSAGES } from '@/constants/messages';

/**
 * Custom hook to manage todos
 * @param {Object} options - Configuration options
 * @returns {Object} Todo state and methods
 */
export const useTodos = (options = {}) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState(options.initialFilter || 'all');

  // Get todos list
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
    } catch (err) {
      let errorMessage = err.message || TODO_MESSAGES.FETCH_FAILED;
      if (err.unauthorized) {
        errorMessage = 'Your session has expired. Please login again.';
      } else if (err.rateLimited) {
        errorMessage = 'Too many requests. Please try again later.';
      }
      setError(errorMessage);
      console.error('Fetch todos error:', err);
      setTodos([]); // Fallback to empty array
    } finally {
      setLoading(false);
    }
  }, []);

  // Load todos when component mounts
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Create new todo
  const createTodo = useCallback(async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const response = await todoService.createTodo(payload);
      console.log('📝 Create response:', response);
      
      // Re-fetch the new list (instead of adding locally)
      await fetchTodos();
      return response;
    } catch (err) {
      let errorMessage = err.message || TODO_MESSAGES.CREATE_FAILED;
      if (err.unauthorized) {
        errorMessage = 'Your session has expired. Please login again.';
      } else if (err.rateLimited) {
        errorMessage = 'Too many requests. Please try again later.';
      }
      setError(errorMessage);
      console.error('Create todo error:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchTodos]);

  // Update todo
  const updateTodo = useCallback(
    async (id, payload) => {
      if (!id) {
        console.error('Update todo error: ID is undefined');
        return;
      }
      try {
        setLoading(true);
        setError(null);

        // Sanitize payload to only include fields allowed by the backend
        const { title, description, isDone, dueDate, tagIds } = payload;
        const sanitizedPayload = { title, description, isDone, dueDate, tagIds };

        const response = await todoService.updateTodo(id, sanitizedPayload);
        const updatedTodo = response.data?.todo || response.todo || response.data || response;
        
        // Ensure todos is always an array and update the specific todo in state
        setTodos((prevTodos) => {
          const currentTodos = Array.isArray(prevTodos) ? prevTodos : [];
          return currentTodos.map((t) => (t._id === id ? updatedTodo : t));
        });
        return updatedTodo;
      } catch (err) {
        let errorMessage = err.message || TODO_MESSAGES.UPDATE_FAILED;
        if (err.unauthorized) {
          errorMessage = 'Your session has expired. Please login again.';
        } else if (err.rateLimited) {
          errorMessage = 'Too many requests. Please try again later.';
        }
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [todos]
  );

  // Delete todo
  const deleteTodo = useCallback(
    async (id) => {
      if (!id) {
        console.error('Delete todo error: ID is undefined');
        return;
      }
      try {
        setLoading(true);
        setError(null);
        await todoService.deleteTodo(id);
        
        // Ensure todos is always an array
        const currentTodos = Array.isArray(todos) ? todos : [];
        setTodos(currentTodos.filter((t) => t._id !== id));
      } catch (err) {
        let errorMessage = err.message || TODO_MESSAGES.DELETE_FAILED;
        if (err.unauthorized) {
          errorMessage = 'Your session has expired. Please login again.';
        } else if (err.rateLimited) {
          errorMessage = 'Too many requests. Please try again later.';
        }
        setError(errorMessage);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [todos]
  );

  // Filter todos by status
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
