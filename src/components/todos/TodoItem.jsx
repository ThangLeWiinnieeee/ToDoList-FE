/**
 * TodoItem Component
 * Từng dòng công việc (có checkbox, title, nút xóa)
 */

'use client';

import React from 'react';

export default function TodoItem({ todo, onDelete, onUpdate }) {
  return (
    <div
      style={{
        padding: '12px',
        border: '1px solid #e0e0e0',
        borderRadius: '4px',
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
      }}
    >
      <input
        type="checkbox"
        checked={todo.isDone || false}
        onChange={(e) => onUpdate?.(todo._id, { isDone: e.target.checked })}
        style={{ cursor: 'pointer' }}
      />
      
      <span
        style={{
          flex: 1,
          textDecoration: todo.isDone ? 'line-through' : 'none',
          opacity: todo.isDone ? 0.6 : 1,
        }}
      >
        {todo.title}
      </span>
      
      <button
        onClick={() => onDelete?.(todo._id)}
        style={{
          padding: '4px 8px',
          backgroundColor: '#f5222d',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Xóa
      </button>
    </div>
  );
}
