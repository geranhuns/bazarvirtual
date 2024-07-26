"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ id: null, role: null });

  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        setToken(storedToken);
        console.log("Stored token found:", storedToken); // Verifica si el token se obtiene correctamente
      }
    }
  }, [token]);
  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUser({ id: decoded._id, role: decoded.role });
        console.log("Decoded token:", decoded); // Verifica si el token se decodifica correctamente
      } else {
        console.log("Decoded token is null");
      }
    }
  }, [token]);

  useEffect(() => {
    console.log("User state has been updated:", user); // Verifica si el estado del usuario se actualiza
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
