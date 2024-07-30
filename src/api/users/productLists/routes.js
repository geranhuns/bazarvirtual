require("dotenv").config();
const USERS_URL = `${process.env.NEXT_PUBLIC_MONGO_URL}/users`;
const SHOPPING_CART_URL = `${USERS_URL}/shoppingCart`;
const WISH_LIST_URL = `${USERS_URL}/wishList`;

export const updateWishList = async (userId, newWishListProduct) => {
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
export const updateShoppingCart = async (userId, newShoppingCartProduct) => {
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
