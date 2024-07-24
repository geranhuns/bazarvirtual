"use client";
import { IoMdMenu } from "react-icons/io";
import { useState, useEffect } from "react";
export default function HeaderLoginHamburguer() {
  const [hamburguerActive, setHamburguerActive] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      {isSmallScreen && (
        <menu className="flex relative justify-end ">
          <button
            className="rounded-full p-2   "
            onClick={() => setHamburguerActive(!hamburguerActive)}
          >
            <IoMdMenu className="w-full h-full  text-raw-sienna-50 text-3xl " />
          </button>
          {hamburguerActive && (
            <div className="bg-raw-sienna-400 w-44 px-2 py-2 ml-auto rounded-b-sm absolute top-14 ">
              <ul>
                <li className="cursor-pointer">
                  <a href="/login">Iniciar sesión</a>
                </li>
                <li className="cursor-pointer">
                  <a href="/register">Crear cuenta</a>
                </li>
                <li>
                  <a href="/carritoDeCompras">Carrito de Compras</a>
                </li>
              </ul>
            </div>
          )}
        </menu>
      )}
    </>
  );
}
