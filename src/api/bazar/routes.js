const MONGO_URL = "http://localhost:3001/bazar";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";

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

export const registerBazarFetch = async (data) => {
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

export const dataUserBazarFetch = async (id) => {
  //extre los datos del user(Bazar)
  try {
    // const token = localStorage.getItem('jwtToken');
    // const decodedToken = jwtDecode(token);
    // const _id = decodedToken._id;

    const response = await fetch(`${MONGO_URL}/bazarUser/${id}`);

    if (!response.ok) {
      throw new Error("Error al obtener datos del servidor");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en dataUserBazarFetch:", error);
    throw error; // Puedes propagar el error para manejarlo en el lugar donde se llama a esta función
  }
};

export const datesBazarFetch = async (id) => {
  //extrae fechas de los bazares segun el usuario(Bazar)
  try {
    // const token = localStorage.getItem("jwtToken");
    // const decodedToken = jwtDecode(token);
    // const _id = decodedToken._id;

    const response = await fetch(`${MONGO_URL}/datesUser/${id}`);

    if (!response.ok) {
      throw new Error("Error al obtener datos del servidor");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en dataUserBazarFetch:", error);
    throw error; // Puedes propagar el error para manejarlo en el lugar donde se llama a esta función
  }
};

export const updateProfileBazar = async (userdata, userId) => {
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

export const createDateFetch = async (data) => {
  try {
    const response = await fetch(`${MONGO_URL}/createDate`, {
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

export const deleteEspecialEvent = async (bazarID, specialEventID) => {
  try {
    const response = await fetch(
      `${MONGO_URL}/datesBazares/${bazarID}/events/${specialEventID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const responseData = await response.json();
      Swal.fire({
        title: "Listo!",
        text: responseData.msg,
        icon: "success",
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

export const dateById = async (_idDate) => {
  //extrae fechas de los bazares segun el usuario(Bazar)
  try {
    const response = await fetch(`${MONGO_URL}/dateById/${_idDate}`);

    if (!response.ok) {
      throw new Error("Error al obtener datos del servidor");
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error en dataUserBazarFetch:", error);
    throw error; // Puedes propagar el error para manejarlo en el lugar donde se llama a esta función
  }
};

export const updateDateFetch = async (dateID, data) => {
  console.log(data);
  try {
    const response = await fetch(`${MONGO_URL}/updateDateBazar/${dateID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar datos");
    }
    const updatedData = await response.json();
    Toast.fire({
      icon: "success",
      title: "Fecha actualizada.",
    });
    // return updatedData;
  } catch (error) {
    console.error("Error en la petición de actualización:", error);
    throw error;
  }
};

export const subscribeToEvent = async (eventId, data) => {
  try {
    const response = await fetch(`${MONGO_URL}/updateMarcasCurso/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Error al inscribirse al bazar");
    }
    const brandToSubscribe = await response.json();
    Toast.fire({
      icon: "success",
      title: "Ya estás participando en el bazar",
    });
  } catch (error) {
    console.error("Error en la petición para participar", error);
    throw error;
  }
};

export const getSubscribedBrands = async (eventId) => {
  try {
    const response = await fetch(`${MONGO_URL}/getMarcasCurso/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Error al obtener las marcas suscritas");
    }

    const subscribedBrands = await response.json();
    return subscribedBrands;
  } catch (error) {
    console.error(
      "Error en la petición para obtener las marcas suscritas",
      error
    );
    throw error;
  }
};
