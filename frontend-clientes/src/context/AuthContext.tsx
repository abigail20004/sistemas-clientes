import React, { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
  token: string | null;
  role: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

// Crear contexto
export const AuthContext = createContext<AuthContextType>({
  token: null,
  role: null,
  login: () => {},
  logout: () => {}
});

// Proveedor
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  const login = (tok: string, rol: string) => {
    setToken(tok);
    setRole(rol);
    localStorage.setItem("token", tok);
    localStorage.setItem("role", rol);
  };

  const logout = () => {
    setToken(null);
    setRole(null);
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

  return (
    <AuthContext.Provider value={{ token, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ Hook para usar el contexto
export const useAuth = () => useContext(AuthContext);
