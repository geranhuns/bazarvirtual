"use client";
import React, { useEffect, useState } from "react";

export default function PaymentSuccess({ searchParams }) {
  const { amount, payment_intent } = searchParams;
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (payment_intent) {
      fetch(`/api/get-payment-intent?payment_intent=${payment_intent}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.metadata) {
            setMetadata(data.metadata);
          } else {
            setError("No metadata found");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching metadata:", error);
          setError("Failed to fetch metadata");
          setLoading(false);
        });
    } else {
      setError("No payment_intent found in query");
      setLoading(false);
    }
  }, [payment_intent]);

  return (
    <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-raw-sienna-400 w-full md:w-1/2">
      <div className="mb-10">
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
        {metadata && (
          <div className="mt-5">
            <h3 className="text-2xl font-bold">Detalles de tu pedido:</h3>
            <pre className="bg-white p-4 rounded-md text-raw-sienna-900 mt-2">
              {JSON.stringify(metadata, null, 2)}
            </pre>
            <p className="mt-2">
              <strong>Fecha de compra:</strong> {metadata.purchase_date}
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
