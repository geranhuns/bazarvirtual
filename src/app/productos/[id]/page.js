"use client";
require("dotenv").config();

import ProductoConEstrella from "@/components/ProductoConEstrella/ProductoConEstrella";
import Swal from "sweetalert2";

import MarcaSmallView from "@/components/SmallViews/MarcaSmallView";
import Button from "@/components/Button/Button";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useUserContext } from "@/components/UserContext/UserContext";
import {
  addOneToWishList,
  addOneToShoppingCart,
  deleteProductFromWishList,
} from "@/api/users/productLists/routes";
import { newPaymentIntent } from "@/api/orders/routes";

export default function VistaDetalladaProducto() {
  const [wishList, setWishList] = useState([]);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);
  const [logo, setLogo] = useState("");
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const [price, setPrice] = useState();
  const [amount, setAmount] = useState();
  const [quantity, setQuantity] = useState(1);
  const [paymentIntent, setPaymentIntent] = useState();

  const options = [1, 2, 3, 4, 5, 6];
  const { user, userEmail } = useUserContext();

  const handleDropdown = (quantity) => {
    setQuantity(Number(quantity)); // Convertir a número
    const total = price * Number(quantity);
    setAmount(total);
  };

  const addToWishList = async () => {
    if (!user.id) {
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

    // Verifica si el producto ya está en la lista de deseos
    if (wishList.includes(id)) {
      Swal.fire({
        icon: "info",
        title: "El producto ya está en tu lista de deseos",
      });
      return;
    }

    const newWishList = [...wishList, id];
    setWishList(newWishList);

    try {
      await addOneToWishList(user.id, newWishList);
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

  const removeFromWishList = async () => {
    if (!user.id) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión para modificar tu lista de deseos",
      });
      return;
    }

    const updatedWishList = wishList.filter((item) => item !== id);
    setWishList(updatedWishList);

    try {
      await deleteProductFromWishList(user.id, id);
      Swal.fire({
        icon: "success",
        title: "Producto eliminado de la lista de deseos",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al eliminar de la lista de deseos",
        text: error.message,
      });
    }
  };

  const handleAddToShoppingCart = async () => {
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
    }

    try {
      await addOneToShoppingCart(user.id, id);
      Swal.fire({
        icon: "success",
        title: "Producto agregado al carrito",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al agregar al carrito de compras",
        text: error.message,
      });
    }
  };

  const getProduct = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/${id}`
      );
      const data = await response.json();
      setProduct(data.data);
      setLogo(data.data.createdBy.profilePicture);
      setPrice(data.data.price);
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

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (amount > 0 && quantity > 0 && user.id) {
        const paymentData = {
          amount,
          items: [{ id: id, quantity: quantity }],
          userId: user.id,
          userEmail,
        };

        try {
          const data = await newPaymentIntent(paymentData);
          if (data) {
            setPaymentIntent(data.paymentIntentId);
          }
        } catch (error) {
          console.error("Error fetching payment intent:", error);
        }
      }
    };

    fetchPaymentIntent();
  }, [amount, quantity, id, user.id, userEmail]);

  const handleBuyNow = () => {
    if (!user.role) {
      Swal.fire({
        icon: "warning",
        title: "Debes crear una cuenta para poder comprar",
      });
    } else if (user.role === "marca" || user.role === "bazar") {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión como cliente",
      });
    } else if (user.role === "cliente") {
      if (amount > 0) {
        router.push(
          `/payment?paymentIntentId=${paymentIntent}&productId=${id}`
        );
      } else {
        console.error("Amount must be a positive number");
      }
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="flex items-center lg:max-w-screen-xl mx-auto overflow-auto">
      <div className="flex flex-col md:flex-row">
        <div className="flex flex-col justify-center w-full md:w-8/12 items-center md:inline-block relative p-6 md:pl-10 pt-10 pb-2 md:pb-8">
          <ProductoConEstrella
            imageUrl={product.productImage}
            altText={product.text}
            addToWishList={addToWishList}
            removeFromWishList={removeFromWishList}
            alreadyOnWishList={wishList.includes(id)} // Asegúrate de pasar el estado correcto
          />
          <div className="flex gap-1 justify-evenly pt-4">
            <Button
              href=""
              text="Agregar al carrito"
              variant="raw-sienna-50"
              className="text-xs lg:text-lg"
              onClick={handleAddToShoppingCart}
            />
            <Button
              href=""
              text="Comprar Ahora"
              variant="raw-sienna-50"
              className="text-xs lg:text-lg"
              onClick={handleBuyNow}
            />
          </div>
        </div>
        <div className="md:pt-10 pr-10 w-full pl-6">
          <h3 className="text-3xl font-semibold">{product.title}</h3>
          <MarcaSmallView
            className="pt-4 cursor-pointer text-raw-sienna-500"
            createdBy={product.createdBy}
            profilePicture={logo}
          />
          <div className="flex flex-col my-4 w-16">
            <h4 className="italic">Cantidad</h4>
            <select
              id="quantity"
              value={quantity}
              onChange={(e) => handleDropdown(e.target.value)}
              className="h-8 pl-1 bg-raw-sienna-200 text-raw-sienna-900"
            >
              {options.map((option) => (
                <option value={option} key={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <h4 className="text-2xl pb-4 md:pb-8">{`$${product.price}`}</h4>
          <h4 className="italic">Acerca de este artículo</h4>
          <p className="pt-2 text-justify pb-10 text-xl text-gray-700">
            {product.description}
          </p>
        </div>
      </div>
    </div>
  );
}
