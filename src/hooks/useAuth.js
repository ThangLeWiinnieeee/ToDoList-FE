/**
 * useAuth Hook
 * Quản lý trạng thái đăng nhập, lưu token, logout
 */

import { useState, useEffect, useCallback, useContext } from 'react';
import Cookies from 'js-cookie';
import authService from '@/services/auth.service';
import { AUTH_MESSAGES } from '@/constants/messages';

/**
 * Custom hook để quản lý authentication
 * @returns {Object} Auth state và methods
 */
export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Kiểm tra token khi component mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = Cookies.get('token');
        console.log('🔑 Token in cookies:', token ? 'Yes' : 'No');
        
        if (token) {
          // Lấy thông tin user từ API
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
        // Không xóa token ngay, có thể là network error
        // Chỉ xóa nếu là 401 (unauthorized)
        if (err.response?.status === 401) {
          console.log('🔓 Token invalid, removing...');
          Cookies.remove('token');
          setIsAuthenticated(false);
        }
        // Khác - giữ token, sau này lại thử
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Đăng nhập
  const login = useCallback(async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.login({ email, password });
      
      // Lưu token vào cookies - response.data chứa { user, token }
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

  // Đăng ký
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

  // Đăng xuất
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

  // Cập nhật hồ sơ
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
