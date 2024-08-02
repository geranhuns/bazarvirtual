"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";

import {
  fetchWishList,
  fetchShoppingCart,
} from "@/api/users/productLists/routes";
import { getProductById } from "@/api/marcas/products/routes";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState({ id: null, role: null });

  const [shoppingCart, setShoppingCart] = useState([]);
  const [shoppingCartDetails, setShoppingCartDetails] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [wishListDetails, setWishListDetails] = useState([]);

  const getShoppingCartWithDetails = async (shoppingCart) => {
    try {
      const productPromises = shoppingCart.map(async (item) => {
        const product = await getProductById(item.productId);
        return { ...product.data, quantity: item.quantity }; // Accede a la propiedad `data`
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
        return product.data; // Accede a la propiedad `data`
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
      if (user.role === "cliente") {
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
  }, [user.id, user.role]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, []);

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUser({ id: decoded._id, role: decoded.role });
      } catch (error) {
        console.error("Error decoding token:", error);
        setToken(null);
      }
    }
  }, [token]);

  // if (user.role === "client") {
  return (
    <UserContext.Provider
      value={{ user, setUser, shoppingCartDetails, wishListDetails }}
    >
      {children}
    </UserContext.Provider>
  );
  // }
  // if (!user.role === "client") {
  //   return (
  //     <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
  //   );
  // }
};

export function useUserContext() {
  return useContext(UserContext);
}
