require("dotenv").config();
import Swal from "sweetalert2";
const PRODUCTS_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  },
});


export const postNewProduct = async (userdata, marcaId) => {
  try {
    const response = await fetch(`${PRODUCTS_URL}/newProduct`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata), // Convierte el objeto a formato JSON
    });
    if (!response.ok) {
      throw new Error("Error al crear nuevo producto");
    }
    const data = await response.json(); // Si esperas una respuesta JSON del servidor
    Toast.fire({
      icon: "success",
      title: "Nuevo producto en catálogo",
    });
    return data;
  } catch (error) {
    console.error("Error al crear el producto:", error.message);
    // Puedes manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
    throw error; // Propaga el error para manejo adicional si es necesario
  }
};
export const editProduct = async (userdata, productId) => {
  try {

    let loadingToast = Swal.fire({
      title: "Actualizando producto...",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    const response = await fetch(`${PRODUCTS_URL}/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata), // Convierte el objeto a formato JSON
    });
    Swal.close();
    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }
    const data = await response.json(); // Si esperas una respuesta JSON del servidor
    Toast.fire({
      icon: "success",
      title: "Producto actualizdo en catálogo",
    });
    return data;
  } catch (error) {
    console.error("Error al actualizar el producto:", error.message);
    Toast.fire({
      icon: "error",
      title: "Error al actualizar el producto",
    });

    // Puedes manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
    throw error; // Propaga el error para manejo adicional si es necesario
  }
};

export const deleteProduct = async (productId) => {
  try {
    const response = await fetch(`${PRODUCTS_URL}/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }

    const data = await response.json(); // Si esperas una respuesta JSON del servidor
    Toast.fire({
      icon: "success",
      title: "Producto eliminado",
    });
    return data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error.message);
    Toast.fire({
      icon: "error",
      title: "Error al eliminar el producto",
    });
    throw error; // Propaga el error para manejo adicional si es necesario
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await fetch(`${PRODUCTS_URL}/${productId}`);

    if (!response.ok) {
      throw new Error("Error al obtener el producto");
    }

    const data = await response.json(); // Si esperas una respuesta JSON del servidor

    return data;
  } catch (error) {
    console.error("Error al obtener el producto:", error.message);
    throw error; // Propaga el error para manejo adicional si es necesario
  }
};
export const getAllProducts = async () => {
  try {
    const response = await fetch(`${PRODUCTS_URL}`);

    if (!response.ok) {
      throw new Error("Error al obtener todos los productos");
    }

    const data = await response.json(); // Si esperas una respuesta JSON del servidor

    return data;
  } catch (error) {
    console.error("Error al obtener todos los productos:", error.message);
    throw error; // Propaga el error para manejo adicional si es necesario
  }
};

export const getProductsByBrandId = async (brandId) => {
  try {
    const response = await fetch(`${PRODUCTS_URL}/brand/${brandId}`);
    if (!response.ok) {
      throw new Error("Error al obtener productos de la marca");
    }
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error al obtener productos de la marca", error.message);
    throw error;
  }
};
