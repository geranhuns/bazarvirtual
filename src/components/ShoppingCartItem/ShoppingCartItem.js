"use client";
import Dropdown from "../Dropdown/Dropdown";
import MarcaSmallView from "../SmallViews/MarcaSmallView";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function ShoppingCartItem() {
  const pathname = usePathname();

  // const [carrito, setCarrito] = useState([]);
  // const [wish, setWish] = useState([]);

  // const handleRemoveWish = (e) => {
  //   setWish(wish.slice(wish.indexOf(e.target.name, 1)));
  // };
  // const handleItemToCart = (e)=>{
  //   setCarrito(carrito.push(e.target))
  // }
  return (
    <>
      <div className="flex  items-center bg-raw-sienna-50 py-5 px-4 rounded-md">
        <img
          className="rounded-sm"
          src="https://picsum.photos/200/200"
          width="100px"
          heigth="100px"
          alt="producto"
        />

        <div className="px-10 flex flex-col w-full ">
          <h3 className="  text-lg ">Título detallado del producto</h3>
          <MarcaSmallView />
          <div className="flex">
            <div className="flex items-center">
              <h4>Cantidad</h4>
              <Dropdown className="rounded-md" options={[1, 2, 3, 4, 5, 6]} />
            </div>
            {pathname !== "/carritoDeCompras" ? (
              <p className="flex gap-3">
                <a>Agregar al carrito</a>|
                <a onClick={handleRemoveWish}>Quitar de la lista</a>
              </p>
            ) : (
              <p className="flex gap-3">
                <a
                  onClick={() => {
                    // setCarrito(carrito.push("nuevoProductoId"));
                  }}
                >
                  Eliminar
                </a>
                | <a>Guardar para más tarde</a>
              </p>
            )}
          </div>
        </div>
        <h3 className="text-xl "> $550.00</h3>
      </div>

      <hr className="h-0.5 bg-raw-sienna-800" />
    </>
  );
}
