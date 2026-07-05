/**
 * TagPicker Component
 * Multi-select tag chips. Value is an array of tag id strings.
 */

'use client';

import React from 'react';
import { Check } from 'lucide-react';

export default function TagPicker({ tags = [], selectedIds = [], onChange }) {
  if (!tags.length) {
    return (
      <p className="text-xs text-gray-400">
        No tags yet. Create one from “Manage tags”.
      </p>
    );
  }

  const toggle = (id) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    onChange?.(next);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const active = selectedIds.includes(tag._id);
        return (
          <button
            key={tag._id}
            type="button"
            onClick={() => toggle(tag._id)}
            className="text-xs px-2.5 py-1 rounded-full border font-medium flex items-center gap-1 transition-all"
            style={
              active
                ? { backgroundColor: tag.color, borderColor: tag.color, color: '#fff' }
                : { borderColor: tag.color, color: tag.color, backgroundColor: 'transparent' }
            }
          >
            {active && <Check className="w-3 h-3" strokeWidth={3} />}
            {tag.name}
          </button>
        );
      })}
    </div>
  );
}
