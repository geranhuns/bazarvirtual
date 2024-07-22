import { jwtDecode } from "jwt-decode";
import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { HeaderContext } from "@/components/HContext/HeaderContext";
export default function DropdownMenu({ token, setDropdownActive, setToken }) {
  const { active, setActive } = useContext(HeaderContext);

  const router = useRouter();
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
    setDropdownActive(false);
    setToken(null);
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
            <li>
              <a>Mis pedidos</a>
            </li>
          </>
        )}
        <li className=" border-b-2 border-raw-sienna-300 pb-2 cursor-pointer">
          <a
            onClick={() => {
              if (decodedToken && decodedToken.role === "bazar") {
                setActive(!active);
                setDropdownActive(false);
              }
              if (decodedToken && decodedToken.role === "marca") {
                router.push(`/editarPerfilMarca/${decodedToken._id}`);
                setDropdownActive(false);
              }
              if (decodedToken && decodedToken.role === "cliente") {
                router.push(`/editarPerfil/${decodedToken._id}`);
                setDropdownActive(false);
              }
            }}
          >
            Editar Perfil
          </a>
        </li>
        <li className="pt-2 cursor-pointer" onClick={handleLogout}>
          <a>Cerrar sesión</a>
        </li>
      </ul>
    </div>
  );
}
