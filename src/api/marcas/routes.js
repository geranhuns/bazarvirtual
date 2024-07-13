const MONGO_URL = 'http://localhost:3001/marca';
import Swal from 'sweetalert2'



export const registerMarcaFetch = async (data) => {
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
  