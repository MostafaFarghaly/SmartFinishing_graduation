"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

type UserData = {
  [key: string]: any;
};

type TokenContextType = {
  token: string | null;
  userData: UserData | null;
  saveUserData: () => void;
  logOut: () => void;
};

const TokenContext = createContext<TokenContextType | undefined>(undefined);

export function TokenProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);

  function saveUserData() {
    const storedToken = localStorage.getItem("token");
    if (!storedToken || storedToken.split(".").length !== 3) return;

    try {
      const decoded = jwtDecode<UserData>(storedToken);
      setToken(storedToken);
      setUserData(decoded);
    } catch (err) {
      setToken(null);
      setUserData(null);
    }
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      saveUserData();
    }
  }, []);

  function logOut() {
    localStorage.clear();
    setToken(null);
    setUserData(null);
    window.location.href = "/";
  }

  return (
    <TokenContext.Provider value={{ token, userData, saveUserData, logOut }}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken(): TokenContextType {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error("useToken must be used within a TokenProvider");
  }
  return context;
}
