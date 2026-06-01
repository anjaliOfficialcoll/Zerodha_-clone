import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const AUTH_STORAGE_KEY = "zerodha-dashboard-auth";

const AuthContext = createContext({
  user: null,
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const readStoredAuth = () => {
  try {
    const storedAuth = window.localStorage.getItem(AUTH_STORAGE_KEY);

    return storedAuth ? JSON.parse(storedAuth) : null;
  } catch (error) {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const stored = readStoredAuth() || {};
  const [user, setUser] = useState(stored.user || null);
  const [token, setToken] = useState(stored.token || null);

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  const login = ({ user: nextUser, token: nextToken }) => {
    window.localStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify({ user: nextUser, token: nextToken })
    );
    setUser(nextUser);
    setToken(nextToken);
    axios.defaults.headers.common["Authorization"] = `Bearer ${nextToken}`;
  };

  const logout = () => {
    window.localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
    setToken(null);
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;