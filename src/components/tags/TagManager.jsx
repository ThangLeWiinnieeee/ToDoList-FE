/**
 * TagManager Component
 * Modal to create / edit / delete tags.
 */

'use client';

import React, { useState } from 'react';
import { X, Plus, Pencil, Trash2, Check } from 'lucide-react';

const DEFAULT_COLOR = '#3b82f6';

export default function TagManager({
  isOpen,
  onClose,
  tags = [],
  onCreate,
  onUpdate,
  onDelete,
  error,
}) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(DEFAULT_COLOR);
  const [editingId, setEditingId] = useState(null);
  const [busy, setBusy] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setName('');
    setColor(DEFAULT_COLOR);
    setEditingId(null);
  };

  const startEdit = (tag) => {
    setEditingId(tag._id);
    setName(tag.name);
    setColor(tag.color);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || busy) return;
    setBusy(true);
    try {
      if (editingId) {
        await onUpdate?.(editingId, { name: name.trim(), color });
      } else {
        await onCreate?.({ name: name.trim(), color });
      }
      resetForm();
    } catch {
      /* error surfaced via `error` prop */
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white rounded-xl shadow-xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Manage tags</h2>
          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Create / edit form */}
        <form onSubmit={handleSubmit} className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 p-0.5 rounded-md border border-gray-200 cursor-pointer flex-shrink-0"
              title="Tag color"
            />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={editingId ? 'Edit tag name...' : 'New tag name...'}
              maxLength={50}
              className="input-field"
            />
            <button
              type="submit"
              disabled={busy || !name.trim()}
              className="btn-primary flex-shrink-0 !px-3"
              title={editingId ? 'Save' : 'Add tag'}
            >
              {editingId ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="btn-icon text-gray-500 hover:bg-gray-100 flex-shrink-0"
                title="Cancel edit"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </form>

        {/* Tag list */}
        <div className="px-5 py-4 max-h-72 overflow-y-auto">
          {tags.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">No tags yet.</p>
          ) : (
            <ul className="space-y-2">
              {tags.map((tag) => (
                <li
                  key={tag._id}
                  className="group flex items-center justify-between px-3 py-2 rounded-lg border border-gray-100 hover:bg-gray-50"
                >
                  <span className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-4 h-4 rounded-full flex-shrink-0"
                      style={{ backgroundColor: tag.color }}
                    />
                    <span className="text-sm text-gray-700 truncate">{tag.name}</span>
                  </span>
                  <span className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => startEdit(tag)}
                      className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
                      title="Edit tag"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDelete?.(tag._id)}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      title="Delete tag"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
