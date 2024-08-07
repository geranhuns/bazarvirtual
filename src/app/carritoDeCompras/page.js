"use client";
import ShoppingCartItem from "@/components/ShoppingCartItem/ShoppingCartItem";
import PaymentTotalButton from "@/components/paymentTotalButton/PaymentTotalButton";
import { useCallback, useState, useEffect } from "react";
import { useUserContext } from "@/components/UserContext/UserContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { deleteProductFromShoppingCart } from "@/api/users/productLists/routes";

export default function CarritoDeCompras() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { user, shoppingCartDetails, wishListDetails, updateShoppingCart } =
    useUserContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [wishList, setWishList] = useState([]);

  const [wishListItems, setWishListItems] = useState(wishListDetails || []);

  const [cartItems, setCartItems] = useState(shoppingCartDetails || []);
  useEffect(() => {
    if (shoppingCartDetails) {
      setCartItems(shoppingCartDetails);
    }
  }, [shoppingCartDetails, setCartItems]);

  const deleteItemFromShoppingCart = async (userId, productId) => {
    try {
      await deleteProductFromShoppingCart(userId, productId); // Espera a que la promesa se resuelva
      setCartItems((prevState) => {
        if (!prevState) return []; // Maneja el caso donde prevState es undefined
        const updatedCart = prevState.filter(
          (product) => product._id !== productId
        );
        return updatedCart;
      });
    } catch (error) {
      console.error("Error al eliminar el producto", error);
      Swal.fire({
        icon: "error",
        title: "Error al eliminar el producto",
        text: error.message,
      });
    }
  };
  const handleDelete = async (userId, productId) => {
    deleteItemFromShoppingCart(userId, productId);
    await updateShoppingCart();
  };
  const calculateTotalPrice = useCallback(() => {
    const newTotalPrice = cartItems.reduce(
      (total, item) => total + parseFloat(item.price * item.quantity),
      0
    );
    const roundedTotalPrice = Math.round(newTotalPrice * 100) / 100;

    setTotalPrice(roundedTotalPrice);
  }, [cartItems]);

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItems, calculateTotalPrice]);

  const handleQuantityChange = async (itemId, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      return updatedItems;
    });
    calculateTotalPrice();
    if (user.id) {
      await updateShoppingCart();
    }
  };

  const handlePaymentClick = () => {
    router.push(`/payment?amount=${totalPrice}`);
  };

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  // Este useEffect maneja la lógica de alerta después de la carga inicial
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === null) {
        Swal.fire({
          icon: "warning",
          title: "Inicia sesión para crear tu carrito de compras",
        }).then(() => {
          router.push("/home");
        });
      } else if (user.role !== "cliente") {
        Swal.fire({
          icon: "warning",
          title: "Inicia sesión como cliente para ver tu carrito de compras",
        }).then(() => {
          router.push("/home");
        });
      }
    }
  }, [isLoading, user, router]);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col   lg:w-10/12    lg:max-w-screen-xl mx-auto overflow-auto ">
      <div className=" flex flex-col pt-4 md:pt-10 pb-8 mx-full lg:max-w-screen-lg mx-auto">
        <h3 className="text-2xl">Carrito de Compras</h3>
        {cartItems.length === 0 ? (
          <p className="pb-4 md:pb-8">
            Aún no has guardado nada en tu Carrito de Compras{" "}
          </p>
        ) : (
          <p className="pb-8">
            Consulta la página de detalle del producto para ver otras opciones
            de compra.
          </p>
        )}

        <PaymentTotalButton
          total={totalPrice}
          className="self-end"
          handlePaymentClick={handlePaymentClick}
        />

        <hr className="h-0.5 bg-raw-sienna-800 lg:max-w-screen-lg" />
        {cartItems.map((item) => {
          return (
            <ShoppingCartItem
              key={item._id}
              item={item}
              quantity={item.quantity}
              onQuantityChange={handleQuantityChange}
              userId={user.id}
              handleDelete={handleDelete}
              deleteItemFromShoppingCart={deleteItemFromShoppingCart}
            />
          );
        })}
        <PaymentTotalButton
          total={totalPrice}
          className={"pt-8"}
          handlePaymentClick={handlePaymentClick}
        />
      </div>
    </div>
  );
}
