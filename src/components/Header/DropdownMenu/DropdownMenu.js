"use client";
import { useContext, useState, useEffect, useRef } from "react";
import { HeaderContext } from "@/components/HContext/HeaderContext";
import { useRouter } from "next/navigation";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";

export default function DropdownMenu({
  setDropdownActive,
  id,
  role,
  handleLogout,
  dropdownActive,
}) {
  const { active, setActive } = useContext(HeaderContext);
  const router = useRouter();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const menuRef = useRef(null); // Ref para el contenedor del menú

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setDropdownActive(false);
      }
    };

    if (dropdownActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownActive, setDropdownActive]);

  const toggleMenu = () => {
    setDropdownActive((prev) => !prev);
  };

  if (isSmallScreen) {
    return (
      <div className="flex relative justify-end" ref={menuRef}>
        <button className="rounded-full p-2" onClick={toggleMenu}>
          <IoMdMenu className="w-full h-full text-raw-sienna-50 text-3xl" />
        </button>
        <div
          className={`fixed top-16 left-0 w-full h-[100vh] bg-raw-sienna-200  z-50 transform ${
            dropdownActive ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-500 ease-in-out`}
        >
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-raw-sienna-900 text-xl"
          >
            <IoCloseOutline className="text-2xl" />
          </button>
          <ul className="space-y-6 pt-4 px-6 text-xl text-raw-sienna-900">
            {role === "cliente" && (
              <>
                <li className="cursor-pointer">
                  <a href="/listaDeDeseos">Lista de Deseos</a>
                </li>
                <hr className="h-1 bg-raw-sienna-50" />

                <li className="cursor-pointer">
                  <a href="/carritoDeCompras">Carrito de Compras</a>
                </li>
                <hr className="h-1 bg-raw-sienna-50" />

                <li>
                  <a href="/misPedidos">Mis pedidos</a>
                </li>
                <hr className="h-1 bg-raw-sienna-50" />
              </>
            )}
            {role === "marca" && (
              <>
                <li>
                  <a href="/misPedidos">Mis pedidos</a>
                </li>
                <hr className="h-1 bg-raw-sienna-50" />

                <li className="cursor-pointer">
                  <a href={`/marcas/${id}`}>Ver mi Marca</a>
                </li>
                <hr className="h-1 bg-raw-sienna-50" />

                <li className="cursor-pointer">
                  <a href={`/miCatalogo/${id}`}>Editar mi catálogo</a>
                </li>
                <hr className="h-1 bg-raw-sienna-50" />
              </>
            )}
            {role === "bazar" && (
              <>
                <li className="cursor-pointer">
                  <a href={`/bazares/${id}`}>Ver mi Perfil</a>
                </li>
                <hr className="h-1 bg-raw-sienna-50" />
              </>
            )}
            <li className="pb-2 cursor-pointer">
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
            <hr className="h-1 bg-raw-sienna-50" />

            <li className="pt-2 cursor-pointer" onClick={handleLogout}>
              <a>Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </div>
    );
  } else {
    return (
      <div
        className="bg-raw-sienna-500 w-52 px-4 py-4 ml-auto rounded-b-sm drop-shadow-md  border-t-2 border-raw-sienna-300"
        ref={menuRef}
      >
        <ul className="flex flex-col text-lg space-y-2 text-raw-sienna-50">
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
              <li>
                <a href="/misPedidos">Mis pedidos</a>
              </li>
              <li className="cursor-pointer">
                <a href={`/marcas/${id}`}>Ver mi Marca</a>
              </li>
              <li className="cursor-pointer">
                <a href={`/miCatalogo/${id}`}>Editar mi catálogo</a>
              </li>
            </>
          )}
          {role === "bazar" && (
            <>
              <li className="cursor-pointer">
                <a href={`/bazares/${id}`}>Ver mi Perfil</a>
              </li>
            </>
          )}
          <li className=" pb-2 cursor-pointer">
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
          <li
            className="border-t-2 border-raw-sienna-300 pt-2 cursor-pointer"
            onClick={handleLogout}
          >
            <a>Cerrar sesión</a>
          </li>
        </ul>
      </div>
    );
  }
}
