/**
 * useAuth Hook
 * Manages login state, stores token, logout
 */

import { useState, useEffect, useCallback, useContext } from 'react';
import Cookies from 'js-cookie';
import authService from '@/services/auth.service';
import { AUTH_MESSAGES } from '@/constants/messages';

/**
 * Custom hook to manage authentication
 * @returns {Object} Auth state and methods
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check token when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('token');
        console.log('🔑 Token in cookies:', token ? 'Yes' : 'No');
        
        if (token) {
          // Get user info from API
          const response = await authService.getCurrentUser();
          console.log('✅ getCurrentUser success:', response);
          setUser(response.data || response);
          setIsAuthenticated(true);
        } else {
          console.log('ℹ️ No token found');
          setIsAuthenticated(false);
        }
      } catch (err) {
        console.error('❌ Auth check failed:', err);
        // Don't delete token immediately, could be network error
        // Only delete if 401 (unauthorized)
        if (err.response?.status === 401) {
          console.log('🔓 Token invalid, removing...');
          Cookies.remove('token');
          setIsAuthenticated(false);
        }
        // Others - keep token, retry later
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login({ email, password });
      
      // Save token to cookies - response.data contains { user, token }
      const token = response.data?.token || response.token;
      Cookies.set('token', token, { expires: 7 });
      
      const user = response.data?.user || response.user;
      setUser(user);
      setIsAuthenticated(true);
      return response;
    } catch (err) {
      const errorMessage = err.message || AUTH_MESSAGES.LOGIN_FAILED;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Register
  const register = useCallback(async (email, password, name) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.register({ email, password, name });
      return response;
    } catch (err) {
      const errorMessage = err.message || AUTH_MESSAGES.REGISTER_FAILED;
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      Cookies.remove('token');
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Update profile
  const updateProfile = useCallback(async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.updateProfile(payload);
      const user = response.data || response;
      setUser(user);
      return response;
    } catch (err) {
      setError(err.message || AUTH_MESSAGES.PROFILE_UPDATE_FAILED);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    user,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
  };
};

export default useAuth;
