import React, { createContext, useState, useEffect } from 'react';
import { getCurrentUser as fetchCurrentUser } from '../services/auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('token');

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const data = await fetchCurrentUser(token);
          setUser(data);
        } catch (error) {
          console.error('Failed to fetch current user', error);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = (userData, tokenValue) => {
    localStorage.setItem('token', tokenValue);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
