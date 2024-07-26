"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchShoppingCart, fetchWishList } from "@/api/users/routes";
import { getProductById } from "@/api/marcas/routes";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ id: null, role: null });

  const [shoppingCart, setShoppingCart] = useState([]);
  const [shoppingCartDetails, setShoppingCartDetails] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [wishListDetails, setWishListDetails] = useState([]);

  const getShoppingCartWithDetails = async (shoppingCart) => {
    console.log("ShoppingCart", shoppingCart);
    try {
      const productPromises = shoppingCart.map(async (item) => {
        const product = await getProductById(item.productId);
        return { ...product, quantity: item.quantity };
      });

      const productsWithDetails = await Promise.all(productPromises);
      return productsWithDetails;
    } catch (error) {
      console.error("Error al obtener los detalles del carrito:", error);
      throw error;
    }
  };

  const getWishListWithDetails = async (wishList) => {
    try {
      const productPromises = wishList.map(async (item) => {
        const product = await getProductById(item.productId);
        return { ...product, quantity: item.quantity };
      });

      const productsWithDetails = await Promise.all(productPromises);
      return productsWithDetails;
    } catch (error) {
      console.error(
        "Error al obtener los detalles de la lista de deseos:",
        error
      );
      throw error;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (user.id) {
        try {
          const shoppingCartData = await fetchShoppingCart(user.id);
          setShoppingCart(shoppingCartData.shoppingCart);

          const shoppingCartDetails = await getShoppingCartWithDetails(
            shoppingCartData.shoppingCart
          );
          setShoppingCartDetails(shoppingCartDetails);

          const wishListData = await fetchWishList(user.id);
          setWishList(wishListData.wishList);

          const wishListDetails = await getWishListWithDetails(
            wishListData.wishList
          );
          setWishListDetails(wishListDetails);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user.id]);

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
    <UserContext.Provider value={{ user, shoppingCart, wishList }}>
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
