import React, { createContext, useContext, useState, useEffect } from 'react';
import { checkSession, login as apiLogin, logout as apiLogout } from '../lib/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check session on load
    checkSession()
      .then(user => {
        setSession(user);
        setLoading(false);
      })
      .catch(err => {
        console.error("Session check error:", err);
        setSession(null);
        setLoading(false);
      });
  }, []);

  const login = async (email, password) => {
    const data = await apiLogin(email, password);
    setSession(data.user);
    return data;
  };

  const logout = async () => {
    await apiLogout();
    setSession(null);
  };

  return (
    <AuthContext.Provider value={{ session, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
