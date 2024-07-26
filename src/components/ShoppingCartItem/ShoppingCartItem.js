"use client";
import Dropdown from "../Dropdown/Dropdown";
import MarcaSmallView from "../SmallViews/MarcaSmallView";
import { usePathname } from "next/navigation";
import { useState } from "react";
export default function ShoppingCartItem({ item, quantity }) {
  const { title, productImage, price, createdBy } = item;
  const pathname = usePathname();

  const [carrito, setCarrito] = useState([]);
  const [wish, setWish] = useState([]);

  const handleRemoveWish = (e) => {
    setWish(wish.slice(wish.indexOf(e.target.name, 1)));
  };
  const handleItemToCart = (e) => {
    setCarrito(carrito.push(e.target));
  };
  return (
    <>
      <div className="flex flex-row items-center bg-raw-sienna-50 py-5 px-4 lg:max-w-screen-lg">
        <img
          className="rounded-sm"
          src={productImage}
          width="100px"
          heigth="100px"
          alt="producto"
        />

        <div className="pl-10 flex flex-col w-full ">
          <h3 className="  text-lg ">{title}</h3>
          <MarcaSmallView
            brand={createdBy.username}
            profilePicture={createdBy.profilePicture}
          />
          <div className="flex flex-col md:flex-row pt-2">
            <div className="flex items-center mb-4 md:mb-0">
              <h4>Cantidad</h4>
              <Dropdown className="rounded-md" options={[1, 2, 3, 4, 5, 6]} />
            </div>
            {pathname !== "/carritoDeCompras" ? (
              <p className="flex gap-3">
                <a>Agregar al carrito</a>|
                <a onClick={handleRemoveWish}>Quitar de la lista</a>
              </p>
            ) : (
              <p className="flex gap-3 pt-2 md:pt-0">
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
      </div>
      <h3 className="bg-raw-sienna-50 text-xl w-full text-right pr-4 lg:max-w-screen-lg">
        ${price}
      </h3>

      <hr className="h-0.5 bg-raw-sienna-800 lg:max-w-screen-lg" />
    </>
  );
}
