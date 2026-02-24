import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import React from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    const token = localStorage.getItem('vetstudy-token');
    const user = localStorage.getItem('vetstudy-user');
    
    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        setState({
          user: parsedUser,
          token,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('vetstudy-token');
        localStorage.removeItem('vetstudy-user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el login');
      }

      const { user, token } = data;
      
      localStorage.setItem('vetstudy-token', token);
      localStorage.setItem('vetstudy-user', JSON.stringify(user));

      setState({
        user,
        token,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }));
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      const { user, token } = data;
      
      localStorage.setItem('vetstudy-token', token);
      localStorage.setItem('vetstudy-user', JSON.stringify(user));

      setState({
        user,
        token,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setState(prev => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }));
    }
  };

  const logout = () => {
    localStorage.removeItem('vetstudy-token');
    localStorage.removeItem('vetstudy-user');
    setState({
      user: null,
      token: null,
      isLoading: false,
      error: null,
    });
  };

  const clearError = () => {
    setState(prev => ({ ...prev, error: null }));
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return React.createElement(
    AuthContext.Provider,
    { value },
    children
  );
};
