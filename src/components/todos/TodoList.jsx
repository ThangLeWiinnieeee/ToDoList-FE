/**
 * TodoList Component
 * Wraps list of TodoItems
 */

'use client';

import React from 'react';
import { CheckCircle2, Circle, Trash2, Tag } from 'lucide-react';

const TAG_COLORS = {
  'backend': { bg: 'bg-green-100', text: 'text-green-700' },
  'frontend': { bg: 'bg-blue-100', text: 'text-blue-700' },
  'design': { bg: 'bg-purple-100', text: 'text-purple-700' },
  'urgent': { bg: 'bg-red-100', text: 'text-red-700' },
  'default': { bg: 'bg-gray-100', text: 'text-gray-700' },
};

export default function TodoList({ todos = [], onDelete, onUpdate }) {
  const getTagColor = (tag) => TAG_COLORS[tag?.toLowerCase()] || TAG_COLORS.default;

  const handleToggle = (todo) => {
    onUpdate?.(todo._id, { ...todo, completed: !todo.completed });
  };

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
      {todos.map((todo) => (
        <li
          key={todo._id}
          className="animate-fade-in-up group flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all bg-white"
        >
          <div className="flex items-start gap-4 flex-1">
            {/* Toggle Button */}
            <button
              onClick={() => handleToggle(todo)}
              className="mt-0.5 transition-colors flex-shrink-0"
              aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
            >
              {todo.completed ? (
                <CheckCircle2 className="w-[22px] h-[22px] text-green-500" strokeWidth={2} />
              ) : (
                <Circle className="w-[22px] h-[22px] text-gray-300 hover:text-blue-500" strokeWidth={2} />
              )}
            </button>

            {/* Todo Content */}
            <div className="flex-1 min-w-0">
              <span
                className={`text-base block transition-colors duration-300 break-words ${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-700 font-medium'
                }`}
              >
                {todo.title}
              </span>

              {/* Tags */}
              {todo.tag && (
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className={`text-[11px] px-2 py-0.5 rounded-md font-medium flex items-center gap-1 ${getTagColor(todo.tag).bg} ${getTagColor(todo.tag).text}`}>
                    <Tag className="w-2.5 h-2.5" strokeWidth={3} />
                    {todo.tag}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Delete Button */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0 ml-4">
            <button
              onClick={() => onDelete?.(todo._id)}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Delete task"
              aria-label="Delete todo"
            >
              <Trash2 className="w-[18px] h-[18px]" strokeWidth={2} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
