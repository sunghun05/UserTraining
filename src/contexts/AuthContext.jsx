import { createContext, useContext, useState, useEffect } from "react";
import { verifyTokens } from "../utils/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    verifyTokens().then(setLoggedIn);
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}