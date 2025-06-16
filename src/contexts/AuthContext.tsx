
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
  investments: Investment[];
  joinDate: string;
}

interface Investment {
  propertyId: string;
  propertyName: string;
  amountInvested: number;
  sharesOwned: number;
  purchaseDate: string;
  currentValue: number;
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
  addInvestment: (investment: Omit<Investment, 'currentValue'>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  useEffect(() => {
    const savedUser = localStorage.getItem('divest-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const savedUsers = JSON.parse(localStorage.getItem('divest-users') || '[]');
    const existingUser = savedUsers.find((u: any) => u.email === email && u.password === password);
    
    if (existingUser) {
      const userToLogin: User = {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        walletBalance: existingUser.walletBalance || 10000,
        investments: existingUser.investments || [],
        joinDate: existingUser.joinDate
      };
      
      setUser(userToLogin);
      localStorage.setItem('divest-user', JSON.stringify(userToLogin));
      setShowAuthModal(false);
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    const savedUsers = JSON.parse(localStorage.getItem('divest-users') || '[]');
    const userExists = savedUsers.some((u: any) => u.email === email);
    
    if (userExists) {
      return false;
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      walletBalance: 10000, // Start with ₹10,000 instead of ₹5L
      investments: [],
      joinDate: new Date().toISOString()
    };

    savedUsers.push(newUser);
    localStorage.setItem('divest-users', JSON.stringify(savedUsers));
    
    const userToLogin: User = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      walletBalance: newUser.walletBalance,
      investments: newUser.investments,
      joinDate: newUser.joinDate
    };
    
    setUser(userToLogin);
    localStorage.setItem('divest-user', JSON.stringify(userToLogin));
    setShowAuthModal(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('divest-user');
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
      localStorage.setItem('divest-user', JSON.stringify(updatedUser));
      
      // Update in users array
      const savedUsers = JSON.parse(localStorage.getItem('divest-users') || '[]');
      const userIndex = savedUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        savedUsers[userIndex].walletBalance = updatedUser.walletBalance;
        localStorage.setItem('divest-users', JSON.stringify(savedUsers));
      }
    }
  };

  const addInvestment = (investment: Omit<Investment, 'currentValue'>) => {
    if (user) {
      const newInvestment: Investment = {
        ...investment,
        currentValue: investment.amountInvested * 1.12 // 12% return simulation
      };
      
      const updatedUser = {
        ...user,
        investments: [...user.investments, newInvestment]
      };
      
      setUser(updatedUser);
      localStorage.setItem('divest-user', JSON.stringify(updatedUser));
      
      // Update in users array
      const savedUsers = JSON.parse(localStorage.getItem('divest-users') || '[]');
      const userIndex = savedUsers.findIndex((u: any) => u.id === user.id);
      if (userIndex !== -1) {
        savedUsers[userIndex].investments = updatedUser.investments;
        localStorage.setItem('divest-users', JSON.stringify(savedUsers));
      }
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    showAuthModal,
    authMode,
    login,
    signup,
    logout,
    openAuthModal,
    closeAuthModal,
    updateWalletBalance,
    addInvestment
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
