import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockUsers } from '../data/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      // Find user by email
      const foundUser = mockUsers.find(u => u.email === credentials.email);
      
      if (foundUser && credentials.password) {
        const userWithRole = {
          ...foundUser,
          role: foundUser.role || 'user' // Default to 'user' if no role specified
        };
        
        setUser(userWithRole);
        localStorage.setItem('currentUser', JSON.stringify(userWithRole));
        
        return {
          success: true,
          user: userWithRole
        };
      }
      
      return {
        success: false,
        error: 'Invalid credentials'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Login failed'
      };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const updateUserRole = (userId, newRole) => {
    if (user && user.role === 'superadmin') {
      // Update in mock data
      const userIndex = mockUsers.findIndex(u => u.id === userId);
      if (userIndex !== -1) {
        mockUsers[userIndex].role = newRole;
        
        // If updating current user's role
        if (user.id === userId) {
          const updatedUser = { ...user, role: newRole };
          setUser(updatedUser);
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
        }
        
        return true;
      }
    }
    return false;
  };

  const hasPermission = (requiredRole) => {
    if (!user) return false;
    
    const roleHierarchy = {
      'user': 1,
      'admin': 2,
      'superadmin': 3
    };
    
    const userLevel = roleHierarchy[user.role] || 0;
    const requiredLevel = roleHierarchy[requiredRole] || 0;
    
    return userLevel >= requiredLevel;
  };

  const value = {
    user,
    login,
    logout,
    updateUserRole,
    hasPermission,
    loading,
    isAuthenticated: !!user,
    isUser: user?.role === 'user',
    isAdmin: user?.role === 'admin',
    isSuperAdmin: user?.role === 'superadmin'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};