import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";
require("dotenv").config();

const BAZAR_URL = `${process.env.NEXT_PUBLIC_MONGO_URL}/bazar`;



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



export const getBazarById = async (bazarId) => {
  try {
    const response = await fetch(`${BAZAR_URL}/bazarUser/${bazarId}`);
    if (!response.ok) {
      throw new Error("Error al obtener datos del bazar");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener datos del bazar", error);
    throw error;
  }
};
export const registerBazarFetch = async (data) => {
  try {
    const response = await fetch(`${BAZAR_URL}/register`, {
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

    const response = await fetch(`${BAZAR_URL}/bazarUser/${id}`);

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


    const response = await fetch(`${BAZAR_URL}/datesUser/${id}`);

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
  
   let loadingToast = Swal.fire({
      title: "Actualizando perfil...",
      didOpen: () => {
        Swal.showLoading();
      },
      allowOutsideClick: false,
    });

    const response = await fetch(`${BAZAR_URL}/updateProfile/${userId}`, {
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

export const createDateFetch = async (data) => {
  try {
    const response = await fetch(`${BAZAR_URL}/createDate`, {
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
      `${BAZAR_URL}/datesBazares/${bazarID}/events/${specialEventID}`,
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
    const response = await fetch(`${BAZAR_URL}/dateById/${_idDate}`);

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
    const response = await fetch(`${BAZAR_URL}/updateDateBazar/${dateID}`, {
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
    const response = await fetch(`${BAZAR_URL}/updateMarcasCurso/${eventId}`, {
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
    const response = await fetch(`${BAZAR_URL}/getMarcasCurso/${eventId}`, {
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
