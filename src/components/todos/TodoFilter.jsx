/**
 * TodoFilter Component
 * Filter (All, Completed, Pending...)
 */

'use client';

import React from 'react';

const FILTER_OPTIONS = [
  { value: 'all', label: 'All' },
  { value: 'completed', label: 'Completed' },
  { value: 'pending', label: 'Pending' },
];

export default function TodoFilter({ activeFilter, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {FILTER_OPTIONS.map((option) => (
        <button
          key={option.value}
          onClick={() => onChange?.(option.value)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeFilter === option.value
              ? 'bg-blue-500 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
