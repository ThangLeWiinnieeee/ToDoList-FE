'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';

export default function Home() {
  const router = useRouter();
  const { isAuthenticated, loading } = useAuthContext();

  React.useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace('/todos');
    }
  }, [loading, isAuthenticated, router]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-gray-500">Đang kiểm tra phiên đăng nhập...</div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <section className="w-full max-w-2xl bg-white border border-gray-200 shadow-sm rounded-2xl p-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Todo App</h1>
        <p className="mt-3 text-gray-600">
          Bạn cần đăng nhập để quản lý danh sách công việc cá nhân.
        </p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Đăng nhập
          </button>
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="px-5 py-2.5 bg-gray-100 text-gray-800 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            Đăng ký
          </button>
        </div>
      </section>
    </main>
  );
}
