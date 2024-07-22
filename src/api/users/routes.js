const MONGO_URL = "http://localhost:3001/users";
import Swal from "sweetalert2";

export const registerUserFetch = async (data) => {
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

export async function loginUserFetch(data) {
  try {
    const response = await fetch(`${MONGO_URL}/login`, {
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
