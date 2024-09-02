"use client";
import ShoppingCartItem from "@/components/ShoppingCartItem/ShoppingCartItem";
import { useState, useEffect } from "react";
import { useUserContext } from "@/components/UserContext/UserContext";
import { deleteProductFromWishList } from "@/api/users/productLists/routes";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function ListaDeDeseos() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { user, wishListDetails } = useUserContext();
  const [wishListItems, setWishListItems] = useState([]);

  // Elimina duplicados y establece los elementos de la lista de deseos
  useEffect(() => {
    if (wishListDetails) {
      const uniqueItems = Array.from(
        new Map(wishListDetails.map((item) => [item._id, item])).values()
      );
      setWishListItems(uniqueItems);
    }
  }, [wishListDetails]);

  const deleteItemFromWishList = async (userId, productId) => {
    try {
      await deleteProductFromWishList(userId, productId);
      setWishListItems((prevState) => {
        if (!prevState) return [];
        const updatedWishList = prevState.filter(
          (product) => product._id !== productId
        );
        return updatedWishList;
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

  // Este useEffect maneja la lógica de alerta después de la carga inicial
  useEffect(() => {
    if (!isLoading && user) {
      if (user.role === null) {
        Swal.fire({
          icon: "warning",
          title: "Inicia sesión para crear tu lista de deseos",
        }).then(() => {
          router.push("/home");
        });
      } else if (user.role !== "cliente") {
        Swal.fire({
          icon: "warning",
          title: "Inicia sesión como cliente para ver tu lista de deseos",
        }).then(() => {
          router.push("/home");
        });
      }
    }
  }, [isLoading, user, router]);

  useEffect(() => {
    if (user !== undefined) {
      setIsLoading(false);
    }
  }, [user]);

  if (isLoading) return <div>Cargando...</div>;

  return (
    <div className="flex flex-col md:w-10/12 lg:max-w-screen-xl mx-auto overflow-auto">
      <div className="flex flex-col pt-4 md:pt-10 pb-8 px-4 mx-auto">
        <h3 className="text-4xl font-semibold">Lista de Deseos</h3>
        {wishListItems.length === 0 ? (
          <p className="pb-4 md:pb-8">
            Aún no has guardado nada en tu lista de deseos
          </p>
        ) : (
          <p className="pb-4 md:pb-8">
            Consulta la página de detalle del producto para ver otras opciones
            de compra.
          </p>
        )}

        <hr className="h-0.5 bg-raw-sienna-800 lg:max-w-screen-lg" />
        {wishListItems.map((item) => (
          <ShoppingCartItem
            key={item._id}
            item={item}
            product={item.product}
            quantity={item.quantity}
            userId={user.id}
            deleteItemFromWishList={deleteItemFromWishList}
          />
        ))}
      </div>
    </div>
  );
}
