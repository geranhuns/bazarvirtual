import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
export default function DropdownMenu({ token }) {
  const [decodedToken, setDecodedToken] = useState(null);
  console.log(token);
  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  function handleLogout() {
    localStorage.removeItem("jwtToken");

    router.push("/login");
  }
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setDecodedToken(decoded);
      //   console.log("Role del usuario:", decoded.role);
    }
  }, [token]);

  return (
    <div className="bg-raw-sienna-400 w-44 px-2 py-2 ml-auto rounded-b-sm">
      <ul className="flex flex-col text-lg ">
        {decodedToken && decodedToken.role === "cliente" && (
          <>
            <li className="cursor-pointer">
              <a>Lista de Deseos</a>
            </li>
            <li className="cursor-pointer">
              <a>Carrito de Compras</a>
            </li>
          </>
        )}
        <li className=" border-b-2 border-raw-sienna-300 pb-2 cursor-pointer">
          <a>Editar Perfil</a>
        </li>
        <li className="pt-2 cursor-pointer" onClick={handleLogout}>
          <a>Cerrar sesión</a>
        </li>
      </ul>
    </div>
  );
}
