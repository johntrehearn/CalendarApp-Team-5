"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";

// Interface for the AuthContext
interface AuthContextType {
  isLoggedIn: boolean;
  login: (idToken: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Props type for the AuthProvider component
interface AuthProviderProps {
  children: ReactNode;
}

// Provider for AuthContext
const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(async (idToken: string) => {
    // Send a POST request to the backend with the ID token
    const response = await fetch("http://localhost:8080/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ idToken }),
      credentials: "include", // Include cookies
    });

    if (response.ok) {
      // If the login was successful, set isLoggedIn to true
      setIsLoggedIn(true);
    } else {
      // If the login failed, show an error message
      const data = await response.json();
      console.error("Failed to log in:", data.error);
    }
  }, []);

  const logout = useCallback(async () => {
    // Send a POST request to the backend to log out
    const response = await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies
    });

    if (response.ok) {
      // If the logout was successful, set isLoggedIn to false
      setIsLoggedIn(false);
    } else {
      // If the logout failed, show an error message
      const data = await response.json();
      console.error("Failed to log out:", data.error);
    }
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
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
// const useAuthContext = () => useContext(AuthContext);
const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
