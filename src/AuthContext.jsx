import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem("token"));
  const navigate = useNavigate();

  const login = (token) => {
    localStorage.setItem("token", token);
    setAuthToken(token);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthToken(null);
    navigate("/login");
  };

  useEffect(() => {
    if (!authToken) return;

    try {
      const decoded = jwtDecode(authToken);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        logout();
      }
    } catch (error) {
      logout();
    }
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{
        authToken,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
