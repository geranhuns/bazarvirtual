"use client";
import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, role: null });
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    // Simular la obtención del ID del usuario desde el almacenamiento local o una API
    const fetchUserId = async () => {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId && storedUserRole) {
        setUser({ id: storedUserId, role: storedUserRole });
      }
    };

    fetchUserId();
  }, []);
  //   const decodeToken = (token) => {
  //     try {
  //       return jwtDecode(token);
  //     } catch (error) {
  //       console.error("Error decoding token:", error);
  //       return null;
  //     }
  //   };
  //   useEffect(() => {
  //     if (token) {
  //       const decoded = decodeToken(token);
  //       setDecodedToken(decoded);
  //       //   console.log("Role del usuario:", decoded.role);
  //     }
  //   }, [token]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
