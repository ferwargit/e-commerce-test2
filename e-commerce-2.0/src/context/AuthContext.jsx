import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // 🔄 Cargar desde localStorage si existe
  const storedUser = localStorage.getItem("user");
  const storedIsAdmin = localStorage.getItem("isAdmin") === "true";

  const [user, setUser] = useState(storedUser || null);
  const [admin, setAdmin] = useState(storedUser ? storedIsAdmin : false);

  const login = (username) => {
    const token = `fake-token-${username}`;
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", username);

    const isAdmin = username === "admin";
    localStorage.setItem("isAdmin", isAdmin.toString());

    setUser(username);
    setAdmin(isAdmin);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    localStorage.removeItem("isAdmin");
    setUser(null);
    setAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, admin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
