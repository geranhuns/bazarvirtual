require("dotenv").config();
const MARCA_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/marca`;
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
  try {
    const response = await fetch(`${MARCA_URL}/register`, {
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
  try {
    let loadingToast = Swal.fire({
      title: "Actualizando perfil...",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    const response = await fetch(`${MARCA_URL}/updateProfile/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        // Puedes incluir otros headers si son necesarios, como tokens de autenticación
      },
      body: JSON.stringify(userdata), // Convierte el objeto a formato JSON
    });

    Swal.close();

    if (!response.ok) {
      throw new Error("Error al actualizar el usuario");
    }

    const data = await response.json(); // Si esperas una respuesta JSON del servidor
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

export const getBrandById = async (brandId) => {
  try {
    const response = await fetch(`${MARCA_URL}/${brandId}`);
    if (!response.ok) {
      throw new Error("Error al obtener la marca");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener la marca;", error.message);
    throw error;
  }
};
