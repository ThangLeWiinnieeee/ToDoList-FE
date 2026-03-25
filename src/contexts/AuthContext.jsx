/**
 * AuthContext
 * Global context to manage authentication state
 */

'use client';

import React, { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth';

const AuthContext = createContext();

/**
 * AuthProvider - Wraps application to provide auth context
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
 * Hook to use AuthContext
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}

export default AuthContext;
