"use client";
import ProductoConEstrella from "@/components/ProductoConEstrella/ProductoConEstrella";
import Swal from "sweetalert2";

import MarcaSmallView from "@/components/SmallViews/MarcaSmallView";
import Button from "@/components/Button/Button";
import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useUserContext } from "@/components/UserContext/UserContext";
import {
  updateWishList,
  updateShoppingCart,
} from "@/api/users/productLists/routes";

export default function VistaDetalladaProducto() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [wishList, setWishList] = useState([]);

  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [amount, setAmount] = useState();

  const { user, setUser } = useUserContext();

  // const handleBuyNow = () => {
  //   const amount = product.price;
  //   router.push(`/payment/${product.price}`);
  // };

  const addToWishList = async () => {
    if (!user.id) {
      console.log("No user logged in");
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión para crear tu lista de deseos",
      });
      return;
    } else if (user.role !== "cliente") {
      Swal.fire({
        icon: "warning",
        title: "Crea una cuenta de cliente para crear tu lista de deseos",
      });
      return;
    }

    const newWishList = [...wishList, id];
    setWishList(newWishList);

    try {
      await updateWishList(user.id, newWishList);
      Swal.fire({
        icon: "success",
        title: "Producto agregado a la lista de deseos",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al agregar a la lista de deseos",
        text: error.message,
      });
    }
  };

  const handleAddToShoppingCart = async () => {
    if (!user.id) {
      console.log("No user logged in");
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
      await updateShoppingCart(user.id, id);
    } else {
      console.error("ID de usuario o producto no disponible");
    }
  };

  const getProduct = async () => {
    try {
      const response = await fetch(`http://localhost:3001/products/${id}`);
      const data = await response.json();
      setProduct(data.data);
      setLogo(data.data.createdBy.profilePicture);
      setAmount(data.data.price);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProduct();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className="flex  items-center lg:max-w-screen-xl mx-auto overflow-auto ">
        <div className=" flex flex-col md:flex-row ">
          <div className="flex flex-col justify-center w-full md:w-7/12 items-center md:inline-block relative p-6 md:pl-10 pt-10 pb-2 md:pb-8 ">
            <ProductoConEstrella
              imageUrl={product.productImage}
              altText={product.text}
              addToWishList={addToWishList}
            />
            <div className="flex gap-1  justify-evenly pt-4">
              <Button
                href=""
                text="Agregar al carrito"
                variant="raw-sienna-50"
                className={"text-xs lg:text-lg"}
                onClick={handleAddToShoppingCart}
              />
              <Button
                href=""
                text="Comprar Ahora"
                variant="raw-sienna-50"
                className={"text-xs lg:text-lg"}
                onClick={() => {
                  if (amount > 0) {
                    router.push(`/payment?amount=${amount}`);
                  } else {
                    console.error("Amount must be a positive number");
                  }
                }}
              />
            </div>
          </div>
          <div className="  md:pt-10 pr-10  w-full pl-6">
            <h3 className=" text-2xl">{product.title}</h3>
            <MarcaSmallView
              className="pt-4 cursor-pointer underline "
              createdBy={product.createdBy}
              profilePicture={logo}
            />
            <h4 className="text-2xl py-4 md:py-8">{`$${product.price}`}</h4>
            <h4 className="italic"> Acerca de este artículo</h4>
            <p className="  pt-2 text-justify pb-10 text-xl">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
