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
  const [userEmail, setUserEmail] = useState("");

  const [shoppingCart, setShoppingCart] = useState([]);
  const [shoppingCartDetails, setShoppingCartDetails] = useState([]);
  const [wishList, setWishList] = useState([]);
  const [wishListDetails, setWishListDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const getShoppingCartWithDetails = async (shoppingCart) => {
    try {
      const productPromises = shoppingCart.map(async (item) => {
        const product = await getProductById(item.productId);
        return { ...product.data, quantity: item.quantity };
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
        return product.data;
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
      if (user.id && user.role === "cliente") {
        try {
          const shoppingCartData = await fetchShoppingCart(user.id);
          setShoppingCart(shoppingCartData.shoppingCart);

          const shoppingCartDetails = await getShoppingCartWithDetails(
            shoppingCartData.shoppingCart
          );
          setShoppingCartDetails(shoppingCartDetails);

          const wishListData = await fetchWishList(user.id);
          setWishList(wishListData.wishList);

          const wishListDetailsRaw = await getWishListWithDetails(
            wishListData.wishList
          );

          // Elimina duplicados basados en el ID del producto
          const uniqueWishListDetails = Array.from(
            new Map(wishListDetailsRaw.map((item) => [item._id, item])).values()
          );

          setWishListDetails(uniqueWishListDetails);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [user.id, user.role]);

  const updateShoppingCart = async () => {
    if (user.id && user.role === "cliente") {
      try {
        const shoppingCartData = await fetchShoppingCart(user.id);
        setShoppingCart(shoppingCartData.shoppingCart);

        const updatedShoppingCartDetails = await getShoppingCartWithDetails(
          shoppingCartData.shoppingCart
        );
        setShoppingCartDetails(updatedShoppingCartDetails);
      } catch (error) {
        console.error("Error updating shopping cart:", error);
      }
    }
  };

  const getMarca = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/marca/${user.id}`
      );
      const data = await response.json();

      localStorage.setItem("brandProfilePicture", data.data.profilePicture);
      localStorage.setItem("brandUsername", data.data.username);
      localStorage.setItem("marcaID", data.data._id);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user.id && user.role === "marca") {
      getMarca();
    }
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
        setUserEmail(decoded.email);
      } catch (error) {
        console.error("Error decoding token:", error);
        setToken(null);
      }
    }
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        user,
        userEmail,
        setUser,
        shoppingCartDetails,
        wishListDetails,
        updateShoppingCart,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUserContext() {
  return useContext(UserContext);
}
