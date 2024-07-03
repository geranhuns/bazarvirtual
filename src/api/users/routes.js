const MONGO_URL = 'http://localhost:3001/users';

export const registerUserFetch = async (data) => {
    try {
        const response = await fetch(`${MONGO_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        
        if (response.ok) {
          console.log('Registro exitoso');
          
        } else {
          console.error('Error al registrar');
        }
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      } 
}