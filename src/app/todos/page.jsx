/**
 * Todos Page
 * Main page UI containing the To-Do List.
 */

'use client';

import React, { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Tag as TagIcon } from 'lucide-react';
import TodoForm from '@/components/todos/TodoForm';
import TodoList from '@/components/todos/TodoList';
import TodoFilter from '@/components/todos/TodoFilter';
import TagManager from '@/components/tags/TagManager';
import useTodos from '@/hooks/useTodos';
import useTags from '@/hooks/useTags';
import { useAuthContext } from '@/contexts/AuthContext';

const hasTag = (todo, tagId) =>
  (todo.tagIds || []).some((t) => (typeof t === 'string' ? t : t?._id) === tagId);

export default function TodosPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuthContext();
  const {
    todos,
    filteredTodos,
    loading,
    error,
    filter,
    setFilter,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();
  const {
    tags,
    error: tagError,
    createTag,
    updateTag,
    deleteTag,
  } = useTags();

  const [tagManagerOpen, setTagManagerOpen] = useState(false);
  const [activeTagId, setActiveTagId] = useState(null);

  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  const visibleTodos = useMemo(
    () => (activeTagId ? filteredTodos.filter((t) => hasTag(t, activeTagId)) : filteredTodos),
    [filteredTodos, activeTagId]
  );

  const stats = useMemo(() => {
    const list = Array.isArray(todos) ? todos : [];
    const completed = list.filter((t) => t.isDone).length;
    return { total: list.length, completed, active: list.length - completed };
  }, [todos]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto card">
          <div className="px-8 py-12 text-center text-gray-400">Checking login...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto card">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-blue-600 to-indigo-600">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white">Today&apos;s Tasks</h1>
              <p className="text-blue-100 text-sm mt-1">
                {stats.active} active · {stats.completed} done · {stats.total} total
              </p>
            </div>
            <button
              onClick={() => setTagManagerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/15 text-white text-sm font-medium hover:bg-white/25 transition-colors"
            >
              <TagIcon className="w-4 h-4" />
              Tags
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-8 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Form Section */}
        <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-100">
          <TodoForm onSubmit={createTodo} tags={tags} onManageTags={() => setTagManagerOpen(true)} />
        </div>

        {/* Filter Section */}
        <div className="px-8 py-3 border-b border-gray-100 bg-white space-y-3">
          <TodoFilter activeFilter={filter} onChange={setFilter} />
          {tags.length > 0 && (
            <div className="flex gap-2 flex-wrap items-center">
              <button
                onClick={() => setActiveTagId(null)}
                className={`text-xs px-2.5 py-1 rounded-full border transition-all ${
                  activeTagId === null
                    ? 'bg-gray-800 text-white border-gray-800'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
              >
                All tags
              </button>
              {tags.map((tag) => (
                <button
                  key={tag._id}
                  onClick={() => setActiveTagId(activeTagId === tag._id ? null : tag._id)}
                  className="text-xs px-2.5 py-1 rounded-full border font-medium transition-all"
                  style={
                    activeTagId === tag._id
                      ? { backgroundColor: tag.color, borderColor: tag.color, color: '#fff' }
                      : { borderColor: tag.color, color: tag.color, backgroundColor: 'transparent' }
                  }
                >
                  {tag.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Todos List */}
        <div className="px-8 py-6">
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
              <p className="mt-3">Loading...</p>
            </div>
          ) : (
            <TodoList todos={visibleTodos} tags={tags} onDelete={deleteTodo} onUpdate={updateTodo} />
          )}
        </div>
      </div>

      <TagManager
        isOpen={tagManagerOpen}
        onClose={() => setTagManagerOpen(false)}
        tags={tags}
        onCreate={createTag}
        onUpdate={updateTag}
        onDelete={deleteTag}
        error={tagError}
      />
    </div>
  );
}
