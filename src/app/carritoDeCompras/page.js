"use client";
import ShoppingCartItem from "@/components/ShoppingCartItem/ShoppingCartItem";
import PaymentTotalButton from "@/components/paymentTotalButton/PaymentTotalButton";
import { useCallback, useState, useEffect } from "react";
import { useUserContext } from "@/components/UserContext/UserContext";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { deleteProductFromShoppingCart } from "@/api/users/productLists/routes";
import { newPaymentIntent } from "@/api/orders/routes";

export default function CarritoDeCompras() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const {
    user,
    userEmail,
    shoppingCartDetails,
    wishListDetails,
    updateShoppingCart,
  } = useUserContext();
  const [totalPrice, setTotalPrice] = useState(0);
  const [paymentIntent, setPaymentIntent] = useState();
  const [cartItems, setCartItems] = useState(shoppingCartDetails || []);

  useEffect(() => {
    if (shoppingCartDetails) {
      setCartItems(shoppingCartDetails);
    }
  }, [shoppingCartDetails]);

  const userId = user?.id || null;

  const items = cartItems.map((product) => ({
    id: product._id,
    quantity: product.quantity,
  }));

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

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      try {
        const paymentData = {
          amount: totalPrice,
          items,
          userId,
          userEmail,
        };

        const data = await newPaymentIntent(paymentData);
        if (data) {
          setPaymentIntent(data.paymentIntentId);
        }
      } catch (error) {
        console.error("Error al crear el PaymentIntent", error);
        Swal.fire({
          icon: "error",
          title: "Error al procesar el pago",
          text: error.message,
        });
      }
    };

    if (totalPrice && items.length > 0 && userId) {
      fetchPaymentIntent();
    }
  }, [totalPrice, items, userId, userEmail]);

  const deleteItemFromShoppingCart = async (userId, productId) => {
    try {
      await deleteProductFromShoppingCart(userId, productId);
      setCartItems((prevState) => {
        if (!prevState) return [];
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
    await deleteItemFromShoppingCart(userId, productId);
    calculateTotalPrice();
    await updateShoppingCart();
  };

  const handleQuantityChange = async (itemId, newQuantity) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      return updatedItems;
    });
    calculateTotalPrice();
    if (userId) {
      await updateShoppingCart();
    }
  };

  const handlePaymentClick = async () => {
    await updateShoppingCart();
    router.push(`/payment?paymentIntentId=${paymentIntent}&fromCart=true`);
  };

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

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
    <div className="flex flex-col lg:w-10/12 lg:max-w-screen-xl mx-auto overflow-auto">
      <div className="flex flex-col pt-4 md:pt-10 pb-8 lg:max-w-screen-lg mx-auto">
        <h3 className="text-4xl font-semibold">Carrito de Compras</h3>
        {cartItems.length === 0 ? (
          <p className="pb-4 md:pb-8">
            Aún no has guardado nada en tu Carrito de Compras
          </p>
        ) : (
          <p className="pb-8">
            Consulta la página de detalle del producto para ver otras opciones
            de compra.
          </p>
        )}

        {cartItems.length > 0 && (
          <>
            <PaymentTotalButton
              total={totalPrice}
              className="self-end"
              handlePaymentClick={handlePaymentClick}
            />
            <hr className="h-0.5 bg-raw-sienna-800 lg:max-w-screen-lg" />
            {cartItems.map((item) => (
              <ShoppingCartItem
                key={item._id}
                item={item}
                quantity={item.quantity}
                onQuantityChange={handleQuantityChange}
                userId={userId}
                deleteItemFromShoppingCart={handleDelete}
              />
            ))}
            <PaymentTotalButton
              total={totalPrice}
              className="pt-8"
              handlePaymentClick={handlePaymentClick}
            />
          </>
        )}
      </div>
    </div>
  );
}
