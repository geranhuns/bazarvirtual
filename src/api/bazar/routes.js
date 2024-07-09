const MONGO_URL = 'http://localhost:3001/bazar';
import Swal from 'sweetalert2'
 import {jwtDecode} from 'jwt-decode';


export const registerBazarFetch = async (data) => {
  try {
      const response = await fetch(`${MONGO_URL}/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      });

      if (response.ok) {
          const responseData = await response.json();
          Swal.fire({
            title: "Listo!",
            text: responseData.msg,
            icon: "success",
            footer: '<a href="/login">Iniciar sesion</a>'
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
      alert('Error al realizar la solicitud: ' + error.message);  // Mostrar error de solicitud
  }
};



export const dataUserBazarFetch = async () => {
  try {
    const token = localStorage.getItem('jwtToken');
    const decodedToken = jwtDecode(token);
    const _id = decodedToken._id;

    const response = await fetch(`${MONGO_URL}/bazarUser/${_id}`);

    if (!response.ok) {
        throw new Error('Error al obtener datos del servidor');
    }

    const data = await response.json();
   
    return data; 

} catch (error) {
    console.error('Error en dataUserBazarFetch:', error);
    throw error; // Puedes propagar el error para manejarlo en el lugar donde se llama a esta función
}
}










