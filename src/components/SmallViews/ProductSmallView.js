"use client";
import { useState } from "react";
import { useUserContext } from "@/components/UserContext/UserContext";
import { useRouter } from "next/navigation";
import Button from "../Button/Button";
import { addOneToShoppingCart } from "@/api/users/productLists/routes";
import Swal from "sweetalert2";

export default function ProductSmallView({ item }) {
  const [shoppingCart, setShoppingCart] = useState([]);
  const { user, setUser } = useUserContext();

  const router = useRouter();
  const { productImage, title, price, _id } = item;
  const redirectProductView = () => router.push(`/productos/${_id}`);

  const handleAddToShoppingCart = async (id) => {
    if (!user.id) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión para crear tu carrito de compras",
      });
      return;
    } else if (user.role !== "cliente") {
      Swal.fire({
        icon: "warning",
        title: "Crea una cuenta de cliente para crear tu carrito de compras",
      });
      return;
    } else if (user.id && id) {
      await addOneToShoppingCart(user.id, id);
    } else {
      console.error("ID de usuario o producto no disponible");
    }
  };

  return (
    <div className="flex flex-col items-center bg-raw-sienna-50 py-5 px-2 rounded-md w-44">
      <div
        onClick={() => {
          redirectProductView();
        }}
      >
        <div
          className="flex flex-col items-center cursor-pointer"
          // href={`products/${_id}`}
        >
          <div className="w-24 h-24 overflow-hidden rounded-lg">
            <img
              className=" object-contain "
              src={productImage}
              width="100px"
              height="100px"
              alt={title}
            />
          </div>
          <h3 className="pt-4  text-sm line-clamp -1 ">{title}</h3>
          <h3 className="pt-1">${price}</h3>
        </div>
      </div>
      <Button
        text="Agregar al carrito"
        variant="yellow"
        type="button"
        className={"text-sm h-7 mt-auto"}
        onClick={() => {
          handleAddToShoppingCart(_id);
        }}
      />
    </div>
  );
}
