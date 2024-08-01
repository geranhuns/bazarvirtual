"use client";
import Dropdown from "../Dropdown/Dropdown";
import MarcaSmallView from "../SmallViews/MarcaSmallView";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  addOneToShoppingCart,
  addOneToWishList,
} from "@/api/users/productLists/routes";
import { useUserContext } from "../UserContext/UserContext";

import Swal from "sweetalert2";
export default function ShoppingCartItem({
  item,
  quantity,
  onQuantityChange,
  userId,
  deleteItemFromShoppingCart,
  deleteItemFromWishList,
}) {
  const { title, productImage, price, createdBy, _id } = item;
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const pathname = usePathname();
  const [selectedOption, setSelectedOption] = useState("Todos");

  const [carrito, setCarrito] = useState([]);
  const [wish, setWish] = useState([]);

  useEffect(() => {
    setCurrentQuantity(quantity);
  }, [quantity]);

  const handleQuantityChange = (event) => {
    const newQuantity = parseInt(event.target.value, 10);
    setCurrentQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(item._id, newQuantity);
    }
  };

  const handleForLater = async (userId, productId) => {
    await addOneToWishList(userId, productId);
    await deleteItemFromShoppingCart(userId, productId);
  };

  const handleItemToCart = async (userId, productId) => {
    await addOneToShoppingCart(userId, productId);
    await deleteItemFromWishList(userId, productId);
  };

  const handleRemoveWish = (userId, productId) => {
    deleteItemFromWishList(userId, productId);
  };
  console.log(createdBy);
  console.log(createdBy.username);
  console.log(createdBy.profilePicture);
  return (
    <>
      <div className="flex flex-row items-center bg-raw-sienna-50 py-5 px-4 lg:max-w-screen-lg">
        <a
          className="w-36 h-36 overflow-hidden flex justify-center items-center rounded-lg"
          href={`/productos/${_id}`}
        >
          <img
            className="w-full h-full object-cover"
            src={productImage}
            width="100px"
            heigth="100px"
            alt="producto"
          />
        </a>

        <div className="pl-10 flex flex-col w-full ">
          <a className="  text-lg " href={`/productos/${_id}`}>
            {title}
          </a>
          <MarcaSmallView
            brand={createdBy.username}
            profilePicture={createdBy.profilePicture}
            brandId={createdBy._id}
          />
          <div className="flex flex-col md:flex-row pt-2">
            <div className="flex items-center mb-4 md:mb-0">
              {pathname === "/carritoDeCompras" && (
                <>
                  <h4>Cantidad</h4>
                  <Dropdown
                    className="rounded-md"
                    options={[1, 2, 3, 4, 5, 6]}
                    quantity={quantity}
                    handleDropdown={handleQuantityChange}
                  />
                </>
              )}
            </div>
            {pathname !== "/carritoDeCompras" ? (
              <p className="flex gap-3 cursor-pointer">
                <a
                  onClick={() => {
                    handleItemToCart(userId, _id);
                  }}
                >
                  Agregar al carrito
                </a>
                |
                <a
                  onClick={() => {
                    handleRemoveWish(userId, _id);
                    console.log(userId);
                    console.log(_id);
                  }}
                >
                  Quitar de la lista
                </a>
              </p>
            ) : (
              <p className="flex gap-3 pt-2 md:pt-0 cursor-pointer">
                <a
                  onClick={() => {
                    deleteItemFromShoppingCart(userId, _id);
                  }}
                >
                  Eliminar
                </a>
                |{" "}
                <a
                  onClick={() => {
                    handleForLater(userId, _id);
                  }}
                >
                  Guardar para más tarde
                </a>
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
