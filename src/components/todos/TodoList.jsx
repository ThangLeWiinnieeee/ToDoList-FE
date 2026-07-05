/**
 * TodoList Component
 * Wraps list of TodoItems.
 */

'use client';

import React, { useMemo } from 'react';
import TodoItem from './TodoItem';

export default function TodoList({ todos = [], tags = [], onDelete, onUpdate }) {
  const tagsById = useMemo(
    () => Object.fromEntries(tags.map((t) => [t._id, t])),
    [tags]
  );

  if (!todos.length) {
    return (
      <div className="text-center py-12 text-gray-400">
        <p className="text-lg">No tasks</p>
        <p className="text-sm mt-1">Add a new task to get started</p>
      </div>
    );
  }

  return (
    <ul className="space-y-3">
      {todos.map((todo, index) => (
        <TodoItem
          key={todo._id || `todo-${index}`}
          todo={todo}
          tags={tags}
          tagsById={tagsById}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
