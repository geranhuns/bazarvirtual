"use client";

import Button from "../Button/Button";
import LogoH from "../Logos/LogoH";
import Dropdown from "../Dropdown/Dropdown";
import { usePathname } from "next/navigation";
import { IoIosSearch } from "react-icons/io";
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link";

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

function Header() {
  const pathname = usePathname();
  const handleScroll = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      console.log("click en acerca de");
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <>
      <nav className="bg-raw-sienna-500 sticky h-16  left-0 right-0 top-0 shadow-md z-50">
        <div className="h-full flex justify-between items-center mx-auto   lg:max-w-7xl px-5">
          <LogoH />
          {/* <div className="flex"> */}
          {pathname === "/" && (
            <div className="flex items-center cursor-pointer">
              <ul className="flex flex-row items-center mr-10 gap-4 text-base text-color-text">
                <li
                  className="flex items-center justify-center  hover:bg-raw-sienna-200 h-10 w-24 rounded-xl hover:text-color-btnUnete "
                  onClick={() => handleScroll("section3")}
                >
                  Acerca de
                </li>
                <li
                  className="flex items-center justify-center  hover:bg-raw-sienna-200 h-10 w-24 rounded-xl hover:text-color-btnUnete "
                  onClick={() => handleScroll("section4")}
                >
                  Marcas
                </li>
                <li
                  className="flex items-center justify-center  hover:bg-raw-sienna-200 h-10 w-24 rounded-xl hover:text-color-btnUnete "
                  onClick={() => handleScroll("section2")}
                >
                  Bazares
                </li>
              </ul>
            </div>
          )}
          {pathname !== "/login" &&
            pathname !== "/register" &&
            pathname !== "/" && (
              <div className="flex items-center  w-4/12 gap-0">
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
            )}
          {pathname !== "/login" && pathname !== "/register" && (
            <div className="flex gap-4 items-center">
              <Button
                text="Iniciar sesión"
                href="/login"
                variant="transparent"
              />
              <Button text="Crear cuenta" href="/register" variant="yellow" />
              <div className="p-2 text-raw-sienna-50 cursor-pointer">
                <a href="/carritoDeCompras">
                  <MdOutlineShoppingCart size={25} />
                </a>
              </div>
            </div>
          )}
        </div>
        {/* </div> */}
      </nav>
    </>
  );
}

export default Header;
