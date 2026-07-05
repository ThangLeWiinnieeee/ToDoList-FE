/**
 * TodoItem Component
 * A single task row: view mode + inline edit mode.
 */

'use client';

import React, { useMemo, useState } from 'react';
import { CheckCircle2, Circle, Trash2, Pencil, Calendar, X, Check } from 'lucide-react';
import TagPicker from '@/components/tags/TagPicker';
import { formatDate } from '@/utils/formatters';

const toIds = (tagIds = []) => tagIds.map((t) => (typeof t === 'string' ? t : t?._id)).filter(Boolean);

const isOverdue = (dueDate, isDone) => {
  if (!dueDate || isDone) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(dueDate) < today;
};

export default function TodoItem({ todo, tags = [], tagsById = {}, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || '');
  const [dueDate, setDueDate] = useState(todo.dueDate ? formatDate(todo.dueDate, 'YYYY-MM-DD') : '');
  const [tagIds, setTagIds] = useState(toIds(todo.tagIds));
  const [saving, setSaving] = useState(false);

  // Resolve tag references (populated objects OR bare ids) to full tag objects.
  const resolvedTags = useMemo(
    () => toIds(todo.tagIds).map((id) => tagsById[id]).filter(Boolean),
    [todo.tagIds, tagsById]
  );

  const overdue = isOverdue(todo.dueDate, todo.isDone);

  const handleToggle = () => onUpdate?.(todo._id, { ...todo, isDone: !todo.isDone });

  const startEdit = () => {
    setTitle(todo.title);
    setDescription(todo.description || '');
    setDueDate(todo.dueDate ? formatDate(todo.dueDate, 'YYYY-MM-DD') : '');
    setTagIds(toIds(todo.tagIds));
    setEditing(true);
  };

  const handleSave = async () => {
    if (!title.trim() || saving) return;
    setSaving(true);
    try {
      await onUpdate?.(todo._id, {
        title: title.trim(),
        description: description.trim(),
        dueDate: dueDate || null,
        tagIds,
      });
      setEditing(false);
    } catch {
      /* error surfaced by parent */
    } finally {
      setSaving(false);
    }
  };

  if (editing) {
    return (
      <li className="p-4 rounded-lg border border-blue-200 bg-blue-50/30 space-y-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          maxLength={100}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium"
          autoFocus
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={2}
          maxLength={1000}
          className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
        />
        <label className="text-sm text-gray-600 flex items-center gap-2">
          <span className="font-medium">Due date</span>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="px-3 py-1.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </label>
        <TagPicker tags={tags} selectedIds={tagIds} onChange={setTagIds} />
        <div className="flex justify-end gap-2 pt-1">
          <button
            onClick={() => setEditing(false)}
            className="px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-md flex items-center gap-1"
          >
            <X className="w-4 h-4" /> Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving || !title.trim()}
            className="btn-primary !py-1.5 !px-3 text-sm disabled:opacity-50"
          >
            <Check className="w-4 h-4 mr-1" /> Save
          </button>
        </div>
      </li>
    );
  }

  return (
    <li className="animate-fade-in-up group flex items-start justify-between gap-4 p-4 rounded-lg border border-gray-100 hover:border-blue-100 hover:shadow-sm transition-all bg-white">
      <div className="flex items-start gap-4 flex-1 min-w-0">
        <button
          onClick={handleToggle}
          className="mt-0.5 transition-colors flex-shrink-0"
          aria-label={todo.isDone ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.isDone ? (
            <CheckCircle2 className="w-[22px] h-[22px] text-green-500" strokeWidth={2} />
          ) : (
            <Circle className="w-[22px] h-[22px] text-gray-300 hover:text-blue-500" strokeWidth={2} />
          )}
        </button>

        <div className="flex-1 min-w-0">
          <span
            className={`text-base block break-words transition-colors ${
              todo.isDone ? 'line-through text-gray-400' : 'text-gray-700 font-medium'
            }`}
          >
            {todo.title}
          </span>

          {todo.description && (
            <p className={`text-sm mt-1 break-words ${todo.isDone ? 'text-gray-300' : 'text-gray-500'}`}>
              {todo.description}
            </p>
          )}

          {(todo.dueDate || resolvedTags.length > 0) && (
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {todo.dueDate && (
                <span
                  className={`text-[11px] px-2 py-0.5 rounded-md font-medium flex items-center gap-1 ${
                    overdue ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <Calendar className="w-3 h-3" strokeWidth={2.5} />
                  {formatDate(todo.dueDate)}
                  {overdue && ' · overdue'}
                </span>
              )}
              {resolvedTags.map((tag) => (
                <span
                  key={tag._id}
                  className="text-[11px] px-2 py-0.5 rounded-full font-medium"
                  style={{ backgroundColor: `${tag.color}22`, color: tag.color }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
        <button
          onClick={startEdit}
          className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-md transition-colors"
          title="Edit task"
          aria-label="Edit todo"
        >
          <Pencil className="w-[18px] h-[18px]" strokeWidth={2} />
        </button>
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
  );
}
