"use client";
import ShoppingCartItem from "@/components/ShoppingCartItem/ShoppingCartItem";
import PaymentTotalButton from "@/components/paymentTotalButton/PaymentTotalButton";
import { fetchShoppingCart } from "@/api/users/productLists/routes";
import { useContext, useState, useEffect } from "react";
import { useUserContext } from "@/components/UserContext/UserContext";
import { getProductById } from "@/api/marcas/products/routes";
export default function CarritoDeCompras() {
  const [isLoading, setIsLoading] = useState(true);
  const { user, shoppingCartDetails } = useUserContext();
  console.log(shoppingCartDetails);

  useEffect(() => {}, []);

  const totalPrice = shoppingCartDetails.reduce(
    (total, product) => total + parseFloat(product.price),
    0
  );

  if (isLoading) <div>loading...</div>;
  return (
    <div className="flex flex-col   lg:w-10/12    lg:max-w-screen-xl mx-auto overflow-auto ">
      <div className=" flex flex-col pt-4 md:pt-10 pb-8 mx-full lg:max-w-screen-lg mx-auto">
        <h3 className="text-2xl">Carrito de Compras</h3>
        <p className="pb-8">
          Consulta la página de detalle del producto para ver otras opciones de
          compra.
        </p>
        <PaymentTotalButton total={totalPrice} className="self-end " />

        <hr className="h-0.5 bg-raw-sienna-800 lg:max-w-screen-lg" />
        {shoppingCartDetails.map((item) => {
          console.log(item);
          return (
            <ShoppingCartItem
              key={item._id}
              item={item}
              quantity={item.quantity}
            />
          );
        })}
        <PaymentTotalButton total={totalPrice} className={"pt-8"} />
      </div>
    </div>
  );
}
