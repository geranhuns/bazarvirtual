export default function PaymentSuccess({ searchParams }) {
  const { amount } = searchParams;

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
      </div>
    </main>
  );
}
