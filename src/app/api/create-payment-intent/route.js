import { NextResponse } from "next/server";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    // Verificar que STRIPE_SECRET_KEY esté definido
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key is not defined");
    }

    // Parsear el cuerpo de la solicitud
    const { amount, metadata, receipt_email } = await request.json();

    // Verificar que amount sea un número y mayor que 0
    if (isNaN(amount) || amount <= 0) {
      throw new Error("Invalid amount");
    }
    if (typeof metadata.items !== "string") {
      throw new Error("Invalid items format");
    }

    // Parsear items desde la cadena JSON
    const items = JSON.parse(metadata.items);

    if (!Array.isArray(items)) {
      throw new Error("Parsed items are not an array");
    }
    const purchaseDate = new Date().toISOString();

    const compactItems = items
      .map((item) => `${item._id}:${item.quantity}`)
      .join(",");

    // Crear el Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "mxn",
      automatic_payment_methods: { enabled: true },
      receipt_email: receipt_email,
      metadata: {
        items: compactItems,
        purchase_date: purchaseDate,
      },
    });

    // Devolver el client_secret en la respuesta
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id, // Devuelve el ID del Payment Intent
    });
  } catch (error) {
    console.error("Internal Error:", error.message);
    // Manejar otros errores (e.g., problemas de red, errores de análisis)
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  }
}
