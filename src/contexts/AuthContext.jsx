/**
 * AuthContext
 * Global context để quản lý trạng thái xác thực
 */

'use client';

import React, { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';

const AuthContext = createContext();

/**
 * AuthProvider - Bọc ứng dụng để cung cấp auth context
 */
export function AuthProvider({ children }) {
  const auth = useAuth();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook để sử dụng AuthContext
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext phải được sử dụng bên trong AuthProvider');
  }
  return context;
}

export default AuthContext;
