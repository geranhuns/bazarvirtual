"use client";
import { IoMdMenu } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";

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

  const toggleMenu = () => {
    setHamburguerActive(!hamburguerActive);
  };

  return (
    <>
      {isSmallScreen && (
        <menu className="flex relative justify-end">
          <button className="rounded-full p-2" onClick={toggleMenu}>
            <IoMdMenu className="w-full h-full text-raw-sienna-50 text-3xl" />
          </button>
          <div
            className={`fixed top-16 left-0 w-full h-full bg-raw-sienna-200 z-50 transform ${
              hamburguerActive ? "translate-x-0" : "-translate-x-full"
            } transition-transform duration-500 ease-in-out`}
          >
            <button
              onClick={toggleMenu}
              className="absolute top-4 right-4 text-raw-sienna-900 text-xl"
            >
              <IoCloseOutline className="text-2xl" />
            </button>
            <ul className="space-y-6 pt-4 px-6 text-xl text-raw-sienna-900">
              <li className="cursor-pointer">
                <a href="/login">Iniciar sesión</a>
              </li>
              <hr className="h-1 bg-raw-sienna-50" />
              <li className="cursor-pointer">
                <a href="/register">Crear cuenta</a>
              </li>
              <hr className="h-1 bg-raw-sienna-50" />
              <li className="cursor-pointer">
                <a href="/carritoDeCompras">Carrito de Compras</a>
              </li>
              <hr className="h-1 bg-raw-sienna-50" />
            </ul>
          </div>
        </menu>
      )}
    </>
  );
}
