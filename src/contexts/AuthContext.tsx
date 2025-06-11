
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  walletBalance: number;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  showAuthModal: boolean;
  authMode: 'login' | 'signup';
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  openAuthModal: (mode: 'login' | 'signup') => void;
  closeAuthModal: () => void;
  updateWalletBalance: (amount: number) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem('divest_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock login - in real app, this would call an API
    const savedUsers = JSON.parse(localStorage.getItem('divest_users') || '[]');
    const foundUser = savedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (foundUser) {
      const user = {
        id: foundUser.id,
        email: foundUser.email,
        name: foundUser.name,
        walletBalance: foundUser.walletBalance,
        joinDate: foundUser.joinDate
      };
      setUser(user);
      localStorage.setItem('divest_user', JSON.stringify(user));
      setShowAuthModal(false);
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    // Mock signup
    const savedUsers = JSON.parse(localStorage.getItem('divest_users') || '[]');
    
    if (savedUsers.find((u: any) => u.email === email)) {
      return false; // User already exists
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      walletBalance: 500000, // ₹5L welcome bonus
      joinDate: new Date().toISOString()
    };

    savedUsers.push(newUser);
    localStorage.setItem('divest_users', JSON.stringify(savedUsers));

    const user = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      walletBalance: newUser.walletBalance,
      joinDate: newUser.joinDate
    };
    
    setUser(user);
    localStorage.setItem('divest_user', JSON.stringify(user));
    setShowAuthModal(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('divest_user');
  };

  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
  };

  const updateWalletBalance = (amount: number) => {
    if (user) {
      const updatedUser = { ...user, walletBalance: user.walletBalance + amount };
      setUser(updatedUser);
      localStorage.setItem('divest_user', JSON.stringify(updatedUser));
      
      // Update in users array too
      const savedUsers = JSON.parse(localStorage.getItem('divest_users') || '[]');
      const userIndex = savedUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        savedUsers[userIndex].walletBalance = updatedUser.walletBalance;
        localStorage.setItem('divest_users', JSON.stringify(savedUsers));
      }
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      showAuthModal,
      authMode,
      login,
      signup,
      logout,
      openAuthModal,
      closeAuthModal,
      updateWalletBalance
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
