require("dotenv").config();
import Swal from "sweetalert2";
const USERS_URL = `${process.env.NEXT_PUBLIC_MONGO_URL}/users`;
const SHOPPING_CART_URL = `${USERS_URL}/shoppingCart`;
const WISH_LIST_URL = `${USERS_URL}/wishList`;

export const addOneToWishList = async (userId, newWishListProduct) => {
  const newProductToWishList = {
    quantity: 1,
    productId: newWishListProduct,
  };

  try {
    // Paso 1: Obtener la lista actual de deseos del usuario
    const userResponse = await fetch(`${USERS_URL}/${userId}`);
    if (!userResponse.ok) {
      throw new Error(`Error fetching user data: ${userResponse.statusText}`);
    }

    const user = await userResponse.json();
    const currentWishList = user.data.wishList || [];

    // Paso 2: Verificar si el producto ya está en la lista
    const productExists = currentWishList.some(
      (item) => item.productId === newProductToWishList.productId
    );

    if (productExists) {
      Swal.fire({
        icon: "success",
        title: "El producto ya está en lista de deseos",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Agregar el nuevo producto a la lista de deseos
    const updatedWishList = [...currentWishList, newProductToWishList];

    // Paso 3: Enviar la lista actualizada al backend
    const response = await fetch(`${WISH_LIST_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ wishList: updatedWishList }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    Swal.fire({
      icon: "success",
      title: "Producto agregado a lista de deseos",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error al actualizar el wishList:", error);
  }
};
export const addOneToShoppingCart = async (userId, newShoppingCartProduct) => {
  const newProductToShoppingCart = {
    quantity: 1,
    productId: newShoppingCartProduct,
  };

  try {
    // Paso 1: Obtener la lista actual del carrito de compras del usuario
    const userResponse = await fetch(`${USERS_URL}/${userId}`);
    if (!userResponse.ok) {
      throw new Error(`Error fetching user data: ${userResponse.statusText}`);
    }

    const user = await userResponse.json();
    const currentShoppingCart = user.data.shoppingCart || [];

    // Paso 2: Verificar si el producto ya está en el carrito
    const productExists = currentShoppingCart.some(
      (item) => item.productId === newProductToShoppingCart.productId
    );

    if (productExists) {
      Swal.fire({
        icon: "success",
        title: "El producto ya está en el carrito",
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    // Agregar el nuevo producto al carrito de compras
    const updatedShoppingCart = [
      ...currentShoppingCart,
      newProductToShoppingCart,
    ];

    // Paso 3: Enviar la lista actualizada al backend
    const response = await fetch(`${SHOPPING_CART_URL}/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ shoppingCart: updatedShoppingCart }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.json();
    Swal.fire({
      icon: "success",
      title: "Producto agregado al carrito",
      showConfirmButton: false,
      timer: 1500,
    });
  } catch (error) {
    console.error("Error al actualizar el shoppingCart:", error);
  }
};

export const fetchShoppingCart = async (userId) => {
  try {
    const response = await fetch(`${SHOPPING_CART_URL}/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching shopping cart: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Devuelve los artículos del carrito
  } catch (error) {
    console.error("Error al obtener los artículos del carrito:", error);
    throw error; // Lanza el error para que pueda ser manejado por quien llame a esta función
  }
};

export const fetchWishList = async (userId) => {
  try {
    const response = await fetch(`${WISH_LIST_URL}/${userId}`);

    if (!response.ok) {
      throw new Error(`Error fetching wish list: ${response.statusText}`);
    }

    const data = await response.json();
    return data; // Devuelve los artículos de la lista de deseos
  } catch (error) {
    console.error(
      "Error al obtener los artículos de la lista de deseos:",
      error
    );
    throw error; // Lanza el error para que pueda ser manejado por quien llame a esta función
  }
};

//Modificar para que busque en el nuevo modelo
export const fetchPurchaseHistory = async (userId) => {
  try {
    const response = await fetch(`${USERS_URL}/${userId}`);
    if (!response.ok) {
      throw new Error(`Error fetching purchase history`);
    }
    const data = await response.json();
    const purchaseHistory = data.data.purchaseHistory;
    return purchaseHistory;
  } catch (error) {
    console.error(
      "Error al obtener los artículos del historial de pedidos",
      error
    );
    throw error;
  }
};
export const deleteProductFromShoppingCart = async (userId, productId) => {
  try {
    const response = await fetch(
      `${USERS_URL}/deleteShoppingCartItem/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: productId }),
      }
    );
    if (!response.ok) {
      throw new Error(
        `Error al obtener el carrito de compras: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al borrar producto del carrito", error);
    throw error;
  }
};

export const deleteProductFromWishList = async (userId, productId) => {
  try {
    const response = await fetch(`${USERS_URL}/deleteWishListItem/${userId}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ productId: productId }),
    });
    if (!response.ok) {
      throw new Error(
        `Error al obtener la lista de deseos: ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al borrar producto de lista de deseos", error);
  }
};

export const quantityProductEdit = async (userId, productId, quantity) => {
  try {
    const response = await fetch(
      `${USERS_URL}/updateQuantityShoppingCart/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity }), // Enviar productId y quantity directamente
      }
    );

    if (!response.ok) {
      throw new Error(`Error updating quantity: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Quantity updated:", data);
  } catch (error) {
    console.error("Error updating quantity:", error);
  }
};

export const deleteShoppingCart = async (clientId) => {
  try {
    const response = await fetch(
      `${USERS_URL}/deleteShoppingCart/${clientId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error al borrar el carrito: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Carrito de compras borrado con éxito:", data);
    return data; // Retorna la respuesta en caso de que la necesites en otra parte de tu código
  } catch (error) {
    console.error("Error al intentar borrar el carrito de compras:", error);
    throw error; // Lanza el error para que pueda ser manejado por la función que llame a esta
  }
};

//Editar para que se vaya al nuevo modelo
// export const purchaseToHistory = async (
//   userId,
//   purchaseId,
//   itemsString,
//   purchaseDate
// ) => {
//   // Convertir la cadena itemsString a un objeto
//   const items = itemsString.split(",").reduce((acc, item) => {
//     const [productId, quantity] = item.split(":");
//     acc[productId.trim()] = parseInt(quantity.trim(), 10);
//     return acc;
//   }, {});

//   // Imprimir los items recibidos para depuración
//   console.log("Converted items:", items);

//   // Transformar items
//   const transformedItems = Object.keys(items).map((productId) => ({
//     productId,
//     quantity: items[productId],
//   }));

//   // Imprimir los items transformados para depuración
//   console.log("Transformed items:", transformedItems);

//   const requestBody = { purchaseId, items: transformedItems, purchaseDate };
//   console.log("Sending request body:", requestBody);

//   try {
//     const response = await fetch(`${USERS_URL}/purchase-history/${userId}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(requestBody),
//     });

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error(
//         `Error updating purchase history: ${response.statusText}, ${errorText}`
//       );
//       throw new Error(
//         `Error updating purchase history: ${response.statusText}`
//       );
//     }

//     const data = await response.json();
//     console.log("Purchase history updated:", data);
//   } catch (error) {
//     console.error("Error updating purchase history:", error);
//   }
// };
