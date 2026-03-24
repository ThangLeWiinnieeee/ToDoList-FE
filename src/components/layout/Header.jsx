/**
 * Header Component
 * Thanh điều hướng trên cùng
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Menu, LogOut, User } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const { user, logout } = useAuthContext();
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    setIsDropdownOpen(false);
    router.push('/login');
  };

  return (
    <header className="relative z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">✓</div>
            Todo App
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {user && (
              <>
                <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                  Trang chủ
                </Link>
                <Link href="/todos" className="text-gray-600 hover:text-gray-900 transition-colors text-sm font-medium">
                  Công việc
                </Link>
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.name || 'User'}</span>
                  <Menu className="w-4 h-4 text-gray-600" />
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name || 'User'}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                type="button"
                onClick={() => router.push('/login')}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
