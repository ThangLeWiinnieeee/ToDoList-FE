/**
 * TodoForm Component
 * Quick-add task, with an expandable panel for description, due date and tags.
 */

'use client';

import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Settings2 } from 'lucide-react';
import TagPicker from '@/components/tags/TagPicker';

export default function TodoForm({ onSubmit, tags = [], onManageTags }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tagIds, setTagIds] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);

  const reset = () => {
    setTitle('');
    setDescription('');
    setDueDate('');
    setTagIds([]);
    setExpanded(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || loading) return;

    try {
      setLoading(true);
      await onSubmit?.({
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate || null,
        tagIds,
      });
      reset();
    } catch (error) {
      console.error('Submit error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Add new task..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
            className="w-full pl-4 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>
        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          className="p-3 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors"
          title={expanded ? 'Hide details' : 'Add details'}
          aria-label="Toggle details"
        >
          {expanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
        <button
          type="submit"
          disabled={loading || !title.trim()}
          className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={loading ? 'Adding...' : 'Add task'}
        >
          <Plus className="w-5 h-5" strokeWidth={3} />
        </button>
      </div>

      {expanded && (
        <div className="p-4 rounded-lg border border-gray-200 bg-white space-y-4 animate-fade-in-up">
          <textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            maxLength={1000}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none text-sm"
          />

          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm text-gray-600 flex items-center gap-2">
              <span className="font-medium">Due date</span>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
            </label>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">Tags</span>
              <button
                type="button"
                onClick={onManageTags}
                className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Manage tags
              </button>
            </div>
            <TagPicker tags={tags} selectedIds={tagIds} onChange={setTagIds} />
          </div>
        </div>
      )}
    </form>
  );
}
