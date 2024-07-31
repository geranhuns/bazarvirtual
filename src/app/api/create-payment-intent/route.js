import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Verificar que STRIPE_SECRET_KEY esté definido
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key is not defined");
    }

    // Parsear el cuerpo de la solicitud
    const { amount } = await request.json();

    // Verificar que amount sea un número y mayor que 0
    if (isNaN(amount) || amount <= 0) {
      throw new Error("Invalid amount");
    }

    // Crear el Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "mxn",
      automatic_payment_methods: { enabled: true },
    });

    console.log("Payment Intent created:", paymentIntent);

    // Devolver el client_secret en la respuesta
    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error.message);
    // Manejar otros errores (e.g., problemas de red, errores de análisis)
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
