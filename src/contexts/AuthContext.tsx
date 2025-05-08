
import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, nickname: string) => Promise<void>;
  logout: () => void;
  updateNickname: (nickname: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
  deleteAccount: (password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login functionality
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate authentication
    const mockUser: User = {
      id: '1',
      nickname: '사용자',
      email: email
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const signup = async (email: string, password: string, nickname: string) => {
    // Mock signup functionality
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate registration
    const mockUser: User = {
      id: '1',
      nickname: nickname,
      email: email
    };
    
    localStorage.setItem('user', JSON.stringify(mockUser));
    setUser(mockUser);
    setLoading(false);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const updateNickname = async (nickname: string) => {
    if (!user) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const updatedUser = { ...user, nickname };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    setUser(updatedUser);
    setLoading(false);
  };

  const updatePassword = async (password: string) => {
    if (!user) return;
    
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, would call an API to update password
    setLoading(false);
  };

  const deleteAccount = async (password: string) => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    localStorage.removeItem('user');
    setUser(null);
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login, 
      signup, 
      logout, 
      updateNickname, 
      updatePassword,
      deleteAccount
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
