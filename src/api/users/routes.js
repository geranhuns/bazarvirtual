require("dotenv").config();
const USERS_URL = `${process.env.NEXT_PUBLIC_MONGO_URL}/users`;

import Swal from "sweetalert2";

export const registerUserFetch = async (data) => {
  try {
    const response = await fetch(`${USERS_URL}/register`, {
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

export async function loginUserFetch(data) {
  try {
    const response = await fetch(`${USERS_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const data = await response.json();
      // console.log('Mensaje del servidor:', data.msg);
      // console.log('Token JWT recibido:', data.data);
      // Guardar el token JWT en el localStorage
      localStorage.setItem("jwtToken", data.data);

      return { success: true, data: data.data }; // Indica éxito y devuelve el token
    } else {
      const errorData = await response.json();
      if (errorData.msg === "user not found") {
        Swal.fire({
          icon: "error",
          title: "Usuario no registrado o incorrecto",
          text: "No tienes cuenta?",
          footer: '<a href="/register">Registrate aqui...</a>',
        });
      } else {
        if (errorData.msg === "Incorrect password") {
          Swal.fire({
            icon: "error",
            title: "Oops",
            text: "Password incorrecto",
          });
        }
      }
    }
  } catch (error) {
    return { success: false, error: error }; // Indica error de red
  }
}

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${USERS_URL}/${userId}`);

    if (!response.ok) {
      throw new Error(`Error fetching user: ${userId}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener usuario", error);
    throw error;
  }
};
