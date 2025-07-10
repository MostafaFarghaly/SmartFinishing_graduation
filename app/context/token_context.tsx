"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState(null);

  function saveUserData() {
    const storedToken = localStorage.getItem("token");

    if (!storedToken || storedToken.split(".").length !== 3) {
      console.warn("Token is missing or malformed");
      return;
    }

    try {
      const decoded = jwtDecode(storedToken);
      setToken(storedToken);
      setUserData(decoded);
      // console.log("User data saved:", decoded);
    } catch (err) {
      // console.error("Error decoding token:", err);
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

export function useToken() {
  return useContext(TokenContext);
}
