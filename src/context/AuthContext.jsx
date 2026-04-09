import React, { createContext, useContext, useState, useEffect } from 'react';
import { login as loginService, logout as logoutService, getProfile } from '../utils/AuthService';
import { saveTokens, saveUser, getTokens, getUser, removeTokens, isAuthenticated } from '../utils/AuthStorage';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in on mount
    const initAuth = async () => {
      if (isAuthenticated()) {
        try {
          const tokens = getTokens();
          const profileData = await getProfile(tokens.access.token);
          const userData = profileData.data.attributes;
          setUser(userData);
          saveUser(userData);
        } catch (error) {
          console.error('Failed to fetch user profile:', error);
          removeTokens();
        }
      } else {
        // Try to load from localStorage
        const storedUser = getUser();
        if (storedUser) {
          setUser(storedUser);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await loginService(email, password);
      const userData = response.data.attributes;
      const tokenData = response.data.token;

      saveUser(userData);
      saveTokens(tokenData);
      setUser(userData);

      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const refreshToken = localStorage.getItem('auth_token') 
      ? JSON.parse(localStorage.getItem('auth_token')).refresh?.token 
      : null;
    
    await logoutService(refreshToken);
    removeTokens();
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: isAuthenticated(),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
