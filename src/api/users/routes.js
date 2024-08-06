require("dotenv").config();
const USERS_URL = `${process.env.NEXT_PUBLIC_MONGO_URL}/users`;

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

    let loadingToast = Swal.fire({
      title: "Iniciando sesion...",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });


    const response = await fetch(`${USERS_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    

    if (response.ok) {
      const data = await response.json();
    
      localStorage.setItem("jwtToken", data.data);
      Swal.close();

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


export const updateProfileUser = async (userdata, userId) => {

  try {
  
   let loadingToast = Swal.fire({
      title: "Actualizando perfil...",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    const response = await fetch(`${USERS_URL}/updateProfileUser/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userdata),
    });

    

    Swal.close();

    if (!response.ok) {
      const errorData = await response.json();
      Swal.fire({
        title: "Error",
        text: errorData.msg || "Error al actualizar el perfil.",
        icon: "error",
      });
      return; // Salimos del bloque si hubo un error
    }

    const data = await response.json();
    Toast.fire({
      icon: "success",
      title: "Perfil actualizado.",
    });
    return data; 

  } catch (error) {
    if (loadingToast) Swal.close();

    Swal.fire({
      title: "Error",
      text: error.message || "Error al actualizar el perfil.",
      icon: "error",
    });

    throw error; 
  }
};