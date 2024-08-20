"use client";
import React, { useEffect, useState } from "react";
import { createNewPurchase } from "@/api/orders/routes";
import { getProductById } from "@/api/marcas/products/routes";
import { useUserContext } from "@/components/UserContext/UserContext";
import { deleteShoppingCart } from "@/api/users/productLists/routes";
import { getPaymentIntent } from "@/api/orders/routes";

export default function PaymentSuccess({ searchParams }) {
  const { amount, payment_intent } = searchParams;
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // Nuevo estado para controlar la llamada
  const [productsWithBrands, setProductsWithBrands] = useState([]);
  const { user } = useUserContext();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        const data = await getPaymentIntent(payment_intent);
        setMetadata(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching payment intent metadata:", error);
        setError("Failed to fetch payment intent data");
        setLoading(false);
      }
    };

    fetchMetadata();
  }, [payment_intent]);

  useEffect(() => {
    if (metadata && metadata.items) {
      const productStrings = metadata.items.split(",");

      const productDetails = productStrings.map((productString) => {
        const [productId, quantity] = productString.split(":");
        return { productId, quantity: parseInt(quantity, 10) };
      });

      const fetchProductsWithBrands = async () => {
        try {
          const productPromises = productDetails.map(async (item) => {
            const product = await getProductById(item.productId);
            return {
              productId: item.productId,
              quantity: item.quantity,
              brandId: product.data.createdBy._id, // Suponiendo que getProductById devuelve el brandId
            };
          });

          const products = await Promise.all(productPromises);
          setProductsWithBrands(products);
        } catch (error) {
          console.error("Error fetching product details:", error);
          setError("Failed to fetch product details");
        }
      };

      fetchProductsWithBrands();
    }
  }, [metadata]);

  useEffect(() => {
    if (productsWithBrands.length > 0 && user && user.id && !success) {
      const purchaseId = payment_intent;
      const clientId = user.id;
      const purchaseDate = metadata.purchase_date;

      createNewPurchase({
        purchaseId,
        purchaseDate,
        products: productsWithBrands,
        clientId,
      })
        .then(() => setSuccess(true))
        .catch((error) => {
          console.error("Error adding to purchase history:", error);
        });
    }
    if (productsWithBrands.length > 0 && user && user.id && !success) {
      deleteShoppingCart(user.id);
    }
  }, [productsWithBrands, user, payment_intent, success]);

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-raw-sienna-400 w-full md:w-1/2">
      <div className="">
        <h1 className="text-4xl font-extrabold mb-2">Gracias por tu compra!</h1>
        <h2 className="text-2xl">
          Espera el contacto de la marca para hacerte llegar tu pedido.
        </h2>
        <div
          className="bg-white p-2 rounded-md text-raw-sienna-900 mt-5 text-4xl font-bold"
          aria-label={`Amount sent: $${amount}`}
        >
          ${amount}
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <h4>Puedes ver tu historial de compras en: Mis Pedidos</h4>
      </div>
    </main>
  );
}
