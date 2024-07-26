"use client";
import ShoppingCartItem from "@/components/ShoppingCartItem/ShoppingCartItem";
import PaymentTotalButton from "@/components/paymentTotalButton/PaymentTotalButton";
import { fetchShoppingCart } from "@/api/users/routes";
import { useContext, useState, useEffect } from "react";
import {
  UserContext,
  useUserContext,
} from "@/components/UserContext/UserContext";
import { getProductById } from "@/api/marcas/routes";
export default function CarritoDeCompras() {
  const carritoExample = [
    {
      id: 1,
      image: "https://picsum.photos/200/200",
      title: "Camiseta Deportiva",
      description: "Camiseta de alta calidad, ideal para hacer deporte.",
      price: 19.99,
      brand: "SportBrand",
    },
    {
      id: 2,
      image: "https://picsum.photos/200/200",
      title: "Zapatillas de Running",
      description:
        "Zapatillas ligeras y cómodas para correr largas distancias.",
      price: 49.99,
      brand: "RunFast",
    },
    {
      id: 3,
      image: "https://picsum.photos/200/200",
      title: "Auriculares Inalámbricos padrísimos",
      description:
        "Auriculares con cancelación de ruido y batería de larga duración.",
      price: 89.99,
      brand: "SoundMagic",
    },
    {
      id: 4,
      image: "https://picsum.photos/200/200",
      title: "Mochila para Laptop",
      description: "Mochila resistente al agua con múltiples compartimentos.",
      price: 39.99,
      brand: "UrbanGear",
    },
    {
      id: 5,
      image: "https://picsum.photos/200/200",
      title: "Reloj Inteligente",
      description:
        "Reloj con monitor de actividad física y notificaciones inteligentes.",
      price: 99.99,
      brand: "TechTime",
    },
  ];

  const [isLoading, setIsLoading] = useState(true);
  const { user, shoppingCart } = useUserContext();
  console.log(shoppingCart);
  // const [shoppingCart, setShoppingCart] = useState([]);
  // const [shoppingCartDetails, setShoppingCartDetails] = useState([]);

  // const getShoppingCartWithDetails = async (shoppingCart) => {
  //   try {
  //     // Promesas para obtener todos los productos
  //     const productPromises = shoppingCart.map(async (item) => {
  //       console.log(item);
  //       const product = await getProductById(item._id); // Obtiene el producto por ID
  //       return { ...product, quantity: item.quantity }; // Combina los detalles del producto con la cantidad
  //     });

  //     // Espera que todas las promesas se resuelvan
  //     const productsWithDetails = await Promise.all(productPromises);
  //     return productsWithDetails;
  //   } catch (error) {
  //     console.error("Error al obtener los detalles del carrito:", error);
  //     throw error; // Propaga el error para manejo adicional si es necesario
  //   }
  // };

  // useEffect(() => {
  //   if (user.id) {
  //     // Obtener los datos del shoppingCart
  //     fetchShoppingCart(user.id).then((data) => {
  //       console.log(data);
  //       setShoppingCart(data.shoppingCart);
  //     });
  //     getShoppingCartWithDetails(shoppingCart).then((result) => {
  //       setShoppingCartDetails(result);
  //     });
  //     setIsLoading(false);
  //   }
  // }, [user.id]);
  // useEffect(() => {
  //   console.log(shoppingCartDetails);
  // }, []);
  const totalPrice = shoppingCart.reduce(
    (total, product) => total + product.price,
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
        {shoppingCart.map((item) => {
          console.log(item);
          return (
            <ShoppingCartItem
              key={item._id}
              item={item}
              product={item.product}
              quantity={item.quantity}
            />
          );
        })}
        <PaymentTotalButton total={totalPrice} className={"pt-8"} />
      </div>
    </div>
  );
}
