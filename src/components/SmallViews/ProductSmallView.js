"use client";
import { useState } from "react";
import Button from "../Button/Button";
export default function ProductSmallView() {
  // const [carrito, setCarrito] = useState([]);

  return (
    <div className="flex flex-col items-center bg-raw-sienna-50 py-5 px-4 rounded-md ">
      <a
        className="flex flex-col items-center cursor-pointer"
        href="/vistaDetalladaProducto"
      >
        <img
          className="rounded-lg"
          src="https://picsum.photos/200/200"
          width="100px"
          heigth="100px"
          alt="producto"
        />
        <h3 className="pt-4 text-sm">Título detallado del producto</h3>
        <h3 className="pt-1"> $550.00</h3>
      </a>
      <Button
        text="Agregar al carrito"
        variant="yellow"
        href=""
        className={"text-sm h-7 mt-3 "}
        onClick={() => {
          // setCarrito(carrito.push("nuevoProductoId"));
        }}
      />
    </div>
  );
}
