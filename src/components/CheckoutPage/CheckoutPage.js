"use client";
require("dotenv").config();
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { newPaymentIntent } from "@/api/orders/routes";

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

  useEffect(() => {
    const fetchClientSecret = async () => {
      const paymentData = {
        amount,
        items,
        userId,
        userEmail,
      };

      const data = await newPaymentIntent(paymentData);

      if (data?.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    };

    if (amount && items.length > 0 && userId) {
      fetchClientSecret();
    }
  }, [amount, items, userId, userEmail]);

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
        return_url: `${window.location.origin}/payment-success?amount=${amount}`,
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
