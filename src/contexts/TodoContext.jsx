/**
 * TodoContext
 * Global context để quản lý trạng thái todos
 */

'use client';

import React, { createContext, useContext } from 'react';
import useTodos from '@/hooks/useTodos';

const TodoContext = createContext();

/**
 * TodoProvider - Bọc ứng dụng để cung cấp todo context
 */
export function TodoProvider({ children }) {
  const todos = useTodos();

  return (
    <TodoContext.Provider value={todos}>
      {children}
    </TodoContext.Provider>
  );
}

/**
 * Hook để sử dụng TodoContext
 */
export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext phải được sử dụng bên trong TodoProvider');
  }
  return context;
}

export default TodoContext;
