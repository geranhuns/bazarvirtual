// /api/get-payment-intent.js

import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function GET(request) {
  try {
    // Obtener el payment_intent de la query string
    const url = new URL(request.url);
    const paymentIntentId = url.searchParams.get("payment_intent");

    if (!paymentIntentId) {
      throw new Error("Missing payment_intent");
    }

    // Consultar el Payment Intent usando el ID
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);

    console.log("Payment Intent retrieved:", paymentIntent);

    // Devolver la metadata en la respuesta
    return NextResponse.json({ metadata: paymentIntent.metadata });
  } catch (error) {
    console.error("Internal Error:", error.message);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
