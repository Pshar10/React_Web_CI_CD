import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  username: string;
  role: 'admin';
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasPermission: (permission: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Get from env (public for frontend, so not truly secure)
const ADMIN_USER = {
  id: '1',
  username: import.meta.env.VITE_ADMIN_USERNAME || '',
  password: import.meta.env.VITE_ADMIN_PASSWORD || '',
  role: 'admin' as const,
  permissions: ['analytics:read', 'analytics:export', 'analytics:manage']
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('analytics_user');
    const sessionExpiry = sessionStorage.getItem('analytics_session_expiry');

    if (storedUser && sessionExpiry) {
      const expiry = parseInt(sessionExpiry);
      if (Date.now() < expiry) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } else {
        sessionStorage.removeItem('analytics_user');
        sessionStorage.removeItem('analytics_session_expiry');
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 500));

    if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
      const userData: User = {
        id: ADMIN_USER.id,
        username: ADMIN_USER.username,
        role: ADMIN_USER.role,
        permissions: ADMIN_USER.permissions
      };

      setUser(userData);
      setIsAuthenticated(true);

      const expiryTime = Date.now() + 24 * 60 * 60 * 1000;
      sessionStorage.setItem('analytics_user', JSON.stringify(userData));
      sessionStorage.setItem('analytics_session_expiry', expiryTime.toString());

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    sessionStorage.removeItem('analytics_user');
    sessionStorage.removeItem('analytics_session_expiry');
  };

  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      isAuthenticated,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};
