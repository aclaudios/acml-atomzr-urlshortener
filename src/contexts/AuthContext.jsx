import React, { createContext, useContext, useEffect, useState } from 'react';

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
    const savedUser = localStorage.getItem('atom-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const signIn = async (email, password) => {
    // Mock authentication - replace with Supabase later
    const users = JSON.parse(localStorage.getItem('atom-users') || '[]');
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
      const userSession = { id: user.id, email: user.email, name: user.name };
      setUser(userSession);
      localStorage.setItem('atom-user', JSON.stringify(userSession));
      return { success: true };
    }
    
    return { success: false, error: 'Invalid credentials' };
  };

  const signUp = async (name, email, password) => {
    // Mock registration - replace with Supabase later
    const users = JSON.parse(localStorage.getItem('atom-users') || '[]');
    
    if (users.find(u => u.email === email)) {
      return { success: false, error: 'Email already exists' };
    }
    
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    localStorage.setItem('atom-users', JSON.stringify(users));
    
    const userSession = { id: newUser.id, email: newUser.email, name: newUser.name };
    setUser(userSession);
    localStorage.setItem('atom-user', JSON.stringify(userSession));
    
    return { success: true };
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem('atom-user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};