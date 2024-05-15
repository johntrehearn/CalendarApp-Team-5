"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  ReactNode,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { setPersistence, browserSessionPersistence } from "firebase/auth";
import { auth } from "@/firebase/firebase";

// Interface for the AuthContext
interface AuthContextType {
  uid: string | null;
  isLoggedIn: boolean;
  isLoading: boolean;
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
  const [uid, setUid] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        // Check if the user is logged in when the component mounts and set the state accordingly
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          setIsLoading(true);
          if (user) {
            // User is signed in
            setIsLoggedIn(true);
            setUid(user.uid);
          } else {
            // User is signed out
            setIsLoggedIn(false);
            setUid(null);
          }
          setIsLoading(false);
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
      })
      .catch((error) => {
        // Handle Errors here.
        let errorCode = error.code;
        let errorMessage = error.message;
      });
  }, []);

  const login = useCallback(async (idToken: string) => {
    setIsLoading(true);
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

      // Assuming the response includes the uid
      const data = await response.json();
      setUid(data.user.uid);
      console.log("Logged in as:", data.user.uid);
    } else {
      // If the login failed, show an error message
      const data = await response.json();
      console.error("Failed to log in:", data.error);
    }
    setIsLoading(false);
  }, []);

  const logout = useCallback(async () => {
    setIsLoading(true);
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
      setUid(null);
    } else {
      // If the logout failed, show an error message
      const data = await response.json();
      console.error("Failed to log out:", data.error);
    }
    setIsLoading(false);
  }, []);

  // Construct and memoize the context value
  const authContextValue = useMemo(() => {
    return {
      uid,
      isLoggedIn,
      login,
      logout,
      isLoading,
    };
  }, [isLoggedIn, login, logout, isLoading]);

  // Provide the context value to its children
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to use AuthContext
const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuthContext };
