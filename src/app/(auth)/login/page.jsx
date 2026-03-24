/**
 * Login Page
 * Giao diện trang Đăng nhập
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from '@/contexts/AuthContext';
import { Mail, Lock, Loader } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  let contextData = null;
  
  try {
    contextData = useAuthContext();
  } catch (contextErr) {
    return <div className="text-red-500">Lỗi: {contextErr.message}</div>;
  }

  const { user, login, loading, error } = contextData;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const hasRedirected = useRef(false);

  // Redirect nếu đã login
  useEffect(() => {
    if (user && !hasRedirected.current) {
      hasRedirected.current = true;
      router.push('/todos'); 
    }
  }, [user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    
    try {
      const result = await login(email, password);
      console.log('Login successful:', result);
      // Router.push sẽ được gọi từ useEffect khi user thay đổi
    } catch (err) {
      console.error('Login error:', err);
      setLocalError(err.message || 'Đăng nhập thất bại');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-xl shadow-md border border-gray-200">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Đăng Nhập</h1>
          <p className="text-gray-600 text-sm">Quay lại với công việc của bạn</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Error messages */}
          {(error || localError) && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-700">{error || localError}</p>
            </div>
          )}

          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            onClick={() => {
              console.log('🖱️ Button clicked - loading:', loading);
              console.log('✉️ Form data - Email:', email, 'Password:', password.length, 'chars');
            }}
            disabled={loading}
            className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 active:bg-blue-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Loader className="w-4 h-4 animate-spin" />}
            {loading ? 'Đang đăng nhập...' : 'Đăng Nhập'}
          </button>
        </form>

        {/* Link to Register */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Chưa có tài khoản?{' '}
            <Link href="/register" className="text-blue-600 hover:text-blue-700 font-medium">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
