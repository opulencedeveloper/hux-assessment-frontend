"use client";

import React, { useState, useEffect } from "react";
import { ContextProviderProps, AuthContextType } from "../../shared/types";


const AuthContext = React.createContext<AuthContextType>({
  token: null,
  login: (token: string) => { },
  logout: () => { },
});

const retrieveStoredToken = (): { token: string } | null => {
  if (typeof window === "undefined") {
    return null;
  }

  const storedToken = localStorage.getItem("token");

  if (!storedToken) {
    return null;
  }

  return {
    token: storedToken,
  };
};



export const AuthContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const tokenData = retrieveStoredToken();

  let initialToken: string | null = tokenData ? tokenData.token : null;
  
  const [token, setToken] = useState<string | null>(initialToken);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken && storedToken !== token) {
        setToken(storedToken);
      }
    }
  }, [token]);

  const logoutHandler = () => {
    setToken(null);
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
    }
  };


  const loginHandler = (token: string) => {
    setToken(token);
    if (typeof window !== "undefined") {
      localStorage.setItem("token", token);
    }
  };

  const contextValue: AuthContextType = {
    token: token,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;


