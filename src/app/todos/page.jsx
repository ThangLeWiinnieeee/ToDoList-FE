/**
 * Todos Page
 * Giao diện trang chính chứa To-Do List
 */

'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import TodoForm from '@/components/todos/TodoForm';
import TodoList from '@/components/todos/TodoList';
import TodoFilter from '@/components/todos/TodoFilter';
import useTodos from '@/hooks/useTodos';
import { useAuthContext } from '@/contexts/AuthContext';

export default function TodosPage() {
  const router = useRouter();
  const { isAuthenticated, loading: authLoading } = useAuthContext();
  const {
    filteredTodos,
    loading,
    error,
    filter,
    setFilter,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodos();

  React.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  if (authLoading || !isAuthenticated) {
    return (
      <div className="bg-gray-50 min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-8 py-12 text-center text-gray-400">
            Đang kiểm tra đăng nhập...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100">
          <h1 className="text-2xl font-bold text-gray-800">Công việc hôm nay</h1>
          <p className="text-gray-500 text-sm mt-1">Quản lý các task của bạn hiệu quả</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-8 mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Form Section */}
        <div className="px-8 py-4 bg-gray-50/50 border-b border-gray-100">
          <TodoForm onSubmit={createTodo} />
        </div>

        {/* Filter Section */}
        <div className="px-8 py-3 border-b border-gray-100 bg-white">
          <TodoFilter activeFilter={filter} onChange={setFilter} />
        </div>

        {/* Todos List */}
        <div className="px-8 py-6">
          {loading ? (
            <div className="text-center py-12 text-gray-400">
              <div className="inline-block">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              </div>
              <p className="mt-3">Đang tải...</p>
            </div>
          ) : (
            <TodoList
              todos={filteredTodos}
              onDelete={deleteTodo}
              onUpdate={updateTodo}
            />
          )}
        </div>
      </div>
    </div>
  );
}
