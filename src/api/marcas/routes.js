const MONGO_URL = "http://localhost:3001/marca";
import Swal from "sweetalert2";

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
export const registerMarcaFetch = async (data) => {
  console.log(data);
  try {
    const response = await fetch(`${MONGO_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      Swal.fire({
        title: "Listo!",
        text: responseData.msg,
        icon: "success",
        footer: '<a href="/login">Iniciar sesion</a>',
      });
    } else {
      const errorData = await response.json();
      Swal.fire({
        title: "Oops!",
        text: errorData.msg,
        icon: "error",
      });
    }
  } catch (error) {
    alert("Error al realizar la solicitud: " + error.message); // Mostrar error de solicitud
  }
};

export const updateProfileMarca = async (userdata, userId) => {
  console.log(userdata);
  try {
    const response = await fetch(`${MONGO_URL}/updateProfile/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Puedes incluir otros headers si son necesarios, como tokens de autenticación
      },
      body: JSON.stringify(userdata), // Convierte el objeto a formato JSON
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const data = await response.json(); // Si esperas una respuesta JSON del servidor
    console.log("Usuario actualizado con éxito:", data);
    Toast.fire({
      icon: "success",
      title: "Perfil actualizado.",
    });
    return data; // Puedes retornar los datos actualizados si lo necesitas
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
    // Puedes manejar el error adecuadamente, por ejemplo, mostrando un mensaje al usuario
    throw error; // Propaga el error para manejo adicional si es necesario
  }
};

export const postNewProduct = async (userdata, marcaId) => {
  console.log(userdata);
  try {
    const response = await fetch(`http://localhost:3001/products/newProduct`, {
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
    console.log("Nuevo producto creado con éxito:", data);
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
  console.log(userdata);
  try {
    const response = await fetch(
      `http://localhost:3001/products/${productId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userdata), // Convierte el objeto a formato JSON
      }
    );
    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }
    const data = await response.json(); // Si esperas una respuesta JSON del servidor
    console.log("Producto actualizado con éxito:", data);
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
    const response = await fetch(
      `http://localhost:3001/products/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Error al eliminar el producto");
    }

    const data = await response.json(); // Si esperas una respuesta JSON del servidor
    console.log("Producto eliminado con éxito:", data);
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
    const response = await fetch(`http://localhost:3001/products/${productId}`);

    if (!response.ok) {
      throw new Error("Error al obtener el producto");
    }

    const data = await response.json(); // Si esperas una respuesta JSON del servidor
    console.log("Producto obtenido con éxito:", data);

    return data;
  } catch (error) {
    console.error("Error al obtener el producto:", error.message);
    throw error; // Propaga el error para manejo adicional si es necesario
  }
};
