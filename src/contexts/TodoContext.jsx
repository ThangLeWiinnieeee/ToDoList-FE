/**
 * TodoContext
 * Global context to manage todos state
 */

'use client';

import React, { createContext, useContext } from 'react';
import useTodos from '@/hooks/useTodos';

const TodoContext = createContext();

/**
 * TodoProvider - Wraps application to provide todo context
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
 * Hook to use TodoContext
 */
export function useTodoContext() {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within TodoProvider');
  }
  return context;
}

export default TodoContext;
