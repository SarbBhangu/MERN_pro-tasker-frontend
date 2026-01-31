import { createContext, useEffect, useMemo, useState } from "react";

// ==============================
// Auth Context
// ==============================
// Stores login state (token + user) for the whole app.

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState("");
  const [user, setUser] = useState(null);

  // ------------------------------
  // Load saved auth from localStorage
  // ------------------------------
  useEffect(() => {
    const savedToken = localStorage.getItem("protasker_token");
    const savedUser = localStorage.getItem("protasker_user");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // ------------------------------
  // Login helper
  // ------------------------------
  const login = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);

    localStorage.setItem("protasker_token", newToken);
    localStorage.setItem("protasker_user", JSON.stringify(newUser));
  };

  // ------------------------------
  // Logout helper
  // ------------------------------
  const logout = () => {
    setToken("");
    setUser(null);

    localStorage.removeItem("protasker_token");
    localStorage.removeItem("protasker_user");
  };

  const value = useMemo(
    () => ({
      token,
      user,
      isLoggedIn: Boolean(token),
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
