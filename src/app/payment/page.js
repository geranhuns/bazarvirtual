"use client";

import CheckoutPage from "@/components/CheckoutPage/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PedidoCliente from "@/components/pedidosActivos/PedidoCliente";
import { useUserContext } from "@/components/UserContext/UserContext";
import { getProductById } from "@/api/marcas/products/routes";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Payment() {
  const searchParams = useSearchParams();
  const [parsedAmount, setParsedAmount] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productId, setProductId] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const { user, shoppingCartDetails } = useUserContext();

  const [purchasedItems, setPurchasedItems] = useState([]);
  const [singleProduct, setSingleProduct] = useState();
  useEffect(() => {
    const fetchProduct = async () => {
      if (productId)
        try {
          const detailedProductObj = await getProductById(productId);
          const detailedProduct = detailedProductObj.data;
          setSingleProduct(detailedProduct);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
    };
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    const amountParams = searchParams.get("amount");
    const productIdParams = searchParams.get("productId");
    const quantityParams = searchParams.get("quantity");
    if (quantityParams) {
      setQuantity(quantityParams);
    }
    if (productIdParams) {
      setProductId(productIdParams);
    }
    if (amountParams) {
      const numAmount = parseFloat(amountParams);
      if (!isNaN(numAmount) && numAmount > 0) {
        setParsedAmount(numAmount);
      } else {
        console.error("Invalid amount");
      }
    } else {
      console.error("Amount parameter not found");
    }

    // Asegúrate de que setLoading(false) se llame después de procesar
    setLoading(false);
  }, [searchParams]);

  useEffect(() => {}, [loading, parsedAmount]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (parsedAmount === null) {
    return <p>Amount is not valid or not found</p>;
  }

  return (
    <div className="flex flex-col lg:max-w-screen-xl mx-auto overflow-auto ">
      <section className=" mx-auto p-10 text-white text-center border m-10 rounded-md bg-raw-sienna-400 w-full">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">
            ¿La cuenta y un policía?
          </h1>
          <h2 className="text-2xl">
            Total de compra:
            <span className="font-bold"> ${parsedAmount}</span>
          </h2>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(parsedAmount),
            currency: "mxn",
            locale: "es",
          }}
        >
          <CheckoutPage amount={parsedAmount} />
        </Elements>
      </section>
      {productId && singleProduct && (
        <PedidoCliente
          key={singleProduct._id}
          showButton={false}
          singleProduct={singleProduct}
          quantity={quantity}
        />
      )}
      {!singleProduct &&
        shoppingCartDetails.map((product) => {
          console.log(product);
          return (
            <PedidoCliente
              key={product._id}
              showButton={false}
              singleProduct={product}
              quantity={product.quantity}
            />
          );
        })}
    </div>
  );
}
