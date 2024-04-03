'use client';

import { createContext, useContext, useState, useMemo, useCallback, ReactNode } from 'react';

// Interface for the AuthContext
interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Provider for AuthContext
// Returns the AuthContext.Provider component which provides the context value to its children.
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Here, useCallback and useMemo memoize the functions and context value. This is to prevent unnecessary re-renders.
  // Functions to update isLoggedIn state
  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  // Construct and memoize the context value
  const authContextValue = useMemo(() => {
    return {
      isLoggedIn,
      login,
      logout,
    };
  }, [isLoggedIn, login, logout]);

  // Provide the context value to its children
  return <AuthContext.Provider value={authContextValue}>{children}</AuthContext.Provider>;
};

// Custom Hook to use AuthContext
// const useAuthContext = () => useContext(AuthContext);
const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};

export { AuthProvider, useAuthContext };
