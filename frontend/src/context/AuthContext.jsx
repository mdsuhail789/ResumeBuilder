import React, { createContext, useContext, useState, useEffect } from 'react';
import * as authService from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('resumecraft_user');
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [loading, setLoading] = useState(false);

  const login = async (credentials) => {
    setLoading(true);
    try {
      const data = await authService.loginUser(credentials);
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await authService.registerUser(userData);
      setUser(data);
      return data;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, register, logout }}>
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
