"use client";
require("dotenv").config();

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import Swal from "sweetalert2";
import { fetchClientSecret } from "@/api/orders/routes";

const CheckoutPage = ({
  fromCart,
  clientSecret,
  amount,
  singleProduct,
  singleQuantity,
  shoppingCartDetails,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    if (singleQuantity && singleProduct) {
      const productWithQuantity = {
        ...singleProduct,
        quantity: singleQuantity,
      };
      setItems([productWithQuantity]);
    }
  }, [singleProduct, singleQuantity]);

  useEffect(() => {
    if (shoppingCartDetails.length > 0) {
      setItems(shoppingCartDetails);
    }
  }, [singleProduct, shoppingCartDetails]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements || !clientSecret) {
      setErrorMessage("Stripe.js has not loaded yet.");
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Stripe.js has not loaded yet.",
      });
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: submitError.message,
      });
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success?amount=${amount}&fromCart=${fromCart}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: error.message,
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Payment Successful",
        text: "Your payment was successful.",
      }).then(() => {
        window.location.href = `${window.location.origin}/payment-success?amount=${amount}&fromCart=${fromCart}`;
      });
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md w-full">
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
