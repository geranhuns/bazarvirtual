import { jwtDecode } from "jwt-decode";
import { useContext } from "react";
import { HeaderContext } from "@/components/HContext/HeaderContext";
import { useRouter } from "next/navigation";

export default function DropdownMenu({
  setDropdownActive,
  id,
  role,
  handleLogout,
}) {
  const { active, setActive } = useContext(HeaderContext);
  const router = useRouter();

  // const [decodedToken, setDecodedToken] = useState(null);
  // const decodeToken = (token) => {
  //   try {
  //     return jwtDecode(token);
  //   } catch (error) {
  //     console.error("Error decoding token:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   if (token) {
  //     const decoded = decodeToken(token);
  //     setDecodedToken(decoded);
  //     //   console.log("Role del usuario:", decoded.role);
  //   }
  // }, [token]);

  return (
    <div className="bg-raw-sienna-400 w-44 px-2 py-2 ml-auto rounded-b-sm">
      <ul className="flex flex-col text-lg ">
        {role === "cliente" && (
          <>
            <li className="cursor-pointer">
              <a href="/listaDeDeseos">Lista de Deseos</a>
            </li>
            <li className="cursor-pointer">
              <a href="/carritoDeCompras">Carrito de Compras</a>
            </li>
            <li>
              <a href="/misPedidos">Mis pedidos</a>
            </li>
          </>
        )}
        {role === "marca" && (
          <>
            <li className="cursor-pointer">
              <a href={`/marcas/${id}`}>Ver mi Marca</a>
            </li>
            <li className="cursor-pointer">
              <a href={`/miCatalogo/${id}`}>Editar mi catálogo</a>
            </li>
          </>
        )}
        <li className=" border-b-2 border-raw-sienna-300 pb-2 cursor-pointer">
          <a
            onClick={() => {
              if (role === "bazar") {
                router.push(`/bazares/${id}`);
                setActive(!active);
                setDropdownActive(false);
              }
              if (role === "marca") {
                router.push(`/editarPerfilMarca/${id}`);
                setDropdownActive(false);
              }
              if (role === "cliente") {
                router.push(`/editarPerfil/${id}`);
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
