import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosClient from '@/api/client/axiosClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [isLoadingPublicSettings, setIsLoadingPublicSettings] = useState(false);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    checkUserAuth();
  }, []);

  const checkUserAuth = async () => {
    try {
      setIsLoadingAuth(true);
      setAuthError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoadingAuth(false);
        return;
      }

      const res = await axiosClient.get('/users/me');
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
      
      // Set auth error if needed
      if (error.response?.status === 401) {
        setAuthError({ type: 'auth_required', message: 'Please login' });
      }
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const login = async credentials => {
    try {
      setAuthError(null);
      setIsLoadingAuth(true);

      const res = await axiosClient.post('/auth/login', credentials);

      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
      }

      setUser(res.data.user);
      setIsAuthenticated(true);

      return res.data;
    } catch (error) {
      setAuthError(error.response?.data?.message || 'Login failed');
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const logout = async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }

    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    isLoadingAuth,
    isLoadingPublicSettings,
    authError,
    login,
    logout,
    checkUserAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};