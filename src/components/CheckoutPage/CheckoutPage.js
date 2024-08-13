"use client";
require("dotenv").config();

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";

const CheckoutPage = ({
  amount,
  userId,
  singleProduct,
  singleQuantity,
  shoppingCartDetails,
  userEmail,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (singleQuantity) {
      const productWithQuantity = {
        ...singleProduct,
        quantity: singleQuantity,
      };
      setItems([productWithQuantity]);
    } else if (!singleProduct) {
      setItems(shoppingCartDetails);
    }

    if (amount && items.length > 0 && userId) {
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: convertToSubcurrency(amount),
          metadata: { items: JSON.stringify(items) },
          receipt_email: userEmail,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `Network response was not ok: ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((data) => {
          if (data.clientSecret) {
            setClientSecret(data.clientSecret);
          } else {
            console.error("Client secret is missing from response:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching client secret:", error);
        });
    }
  }, [amount, singleProduct, shoppingCartDetails, userId, userEmail]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/payment-success?amount=${amount}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md w-full">
      {/* <PaymentElement id="payment-element" /> */}

      {clientSecret && <PaymentElement id="payment-element" />}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="text-raw-sienna-900 w-1/3 p-5 bg-yellow-bazar mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pagar $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
