import { useState, createContext, useContext, ReactNode, useEffect } from "react";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export interface User {
  id: number;
  email: string;
  is_admin: boolean;
}

interface AuthContextType {
    user: User | null;
    login: (credentials: {email: string, password: string}) => Promise<{ success: boolean }>;
    logout: () => void;
}

export const AuthProvider = ({children} : { children: ReactNode}) => {
  let startingVal : User | null = null;
  if (localStorage.getItem('user')) {
    startingVal = JSON.parse(localStorage.getItem('user') || '{}');
  }
  const [user, setUser] = useState(startingVal);

  


  /*
  const fetchUser = async (token: string) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL +'/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userData = await response.json();
      if (response.ok) {
        setUser(userData);
      } else {
        localStorage.removeItem('token');
      }
    } catch {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };
    */

  const login = async (credentials : {email: string, password: string}) => {
    
    const response = await fetch(import.meta.env.VITE_API_URL + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...credentials }),
    });

    if (response.ok) {
      const data = await response.json();
      setUser(data.user); // Example response structure
      localStorage.setItem("user", JSON.stringify(data.user));
      return { success: true };
    }
    return { success: false };
  };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};