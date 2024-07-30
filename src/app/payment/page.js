"use client";

import CheckoutPage from "@/components/CheckoutPage/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const amount = 49.99;

  return (
    <section className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-raw-sienna-400 w-full md:w-1/2">
      <div className="mb-10">
        <h1 className="text-4xl font-extrabold mb-2">
          ¿La cuenta y un policía?
        </h1>
        <h2 className="text-2xl">
          Total de compra:
          <span className="font-bold"> ${amount}</span>
        </h2>
      </div>

      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "mxn",
          locale: "es",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </section>
  );
}
