import Dropdown from "@/components/Dropdown/Dropdown";
import Link from "next/link";
import { IoIosSearch } from "react-icons/io";

const options = [
  "Todo",
  "Alimentos y Bebidas",
  "Auto",
  "Bebé",
  "Belleza",
  "Deportes y Aire Libre",
  "Electrónicos",
  "Hecho a mano",
  "Herramientas y Mejoras del Hogar",
  "Hogar y Cocina",
  "Industria y Ciencia",
  "Instrumentos Musicales",
  "Jardín",
  "Juegos y juguetes",
  "Libros",
  "Mascotas",
  "Música",
  "Oficina y Papelería",
  "Otros productos",
  "Películas y Series de TV",
  "Ropa, Zapatos y Accesorios",
  "Salud y Cuidado Personal",
  "Software",
  "Videojuegos",
];

export default function HeaderSearch() {
  return (
    <div className="md:flex  items-center  w-4/12 gap-0  hidden ">
      <Dropdown className="rounded-l-lg" options={options} />
      <input
        type="text"
        className=" w-full p-1  "
        placeholder="Buscar productos..."
      />
      <div className=" bg-yellow-bazar p-1.5 rounded-r-lg">
        <Link href={"/busquedaProductos"}>
          <IoIosSearch size={20} />
        </Link>
      </div>
    </div>
  );
}
