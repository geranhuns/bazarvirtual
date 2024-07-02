import ShoppingCartItem from "@/components/ShoppingCartItem/ShoppingCartItem";
import PaymentTotalButton from "@/components/paymentTotalButton/PaymentTotalButton";
export default function CarritoDeCompras() {
  const carritoExample = [
    {
      id: 1,
      image: "https://picsum.photos/200/200",
      title: "Camiseta Deportiva",
      description: "Camiseta de alta calidad, ideal para hacer deporte.",
      price: 19.99,
      brand: "SportBrand",
    },
    {
      id: 2,
      image: "https://picsum.photos/200/200",
      title: "Zapatillas de Running",
      description:
        "Zapatillas ligeras y cómodas para correr largas distancias.",
      price: 49.99,
      brand: "RunFast",
    },
    {
      id: 3,
      image: "https://picsum.photos/200/200",
      title: "Auriculares Inalámbricos padrísimos",
      description:
        "Auriculares con cancelación de ruido y batería de larga duración.",
      price: 89.99,
      brand: "SoundMagic",
    },
    {
      id: 4,
      image: "https://picsum.photos/200/200",
      title: "Mochila para Laptop",
      description: "Mochila resistente al agua con múltiples compartimentos.",
      price: 39.99,
      brand: "UrbanGear",
    },
    {
      id: 5,
      image: "https://picsum.photos/200/200",
      title: "Reloj Inteligente",
      description:
        "Reloj con monitor de actividad física y notificaciones inteligentes.",
      price: 99.99,
      brand: "TechTime",
    },
  ];

  const totalPrice = carritoExample.reduce(
    (total, product) => total + product.price,
    0
  );
  return (
    <div className="flex flex-col  items-center    lg:max-w-screen-xl mx-auto overflow-auto ">
      <div className=" flex flex-col pt-4 md:pt-10 pb-8 ">
        <h3 className="text-lg">Carrito de Compras</h3>
        <p className="pb-8">
          Consulta la página de detalle del producto para ver otras opciones de
          compra.
        </p>
        <PaymentTotalButton total={totalPrice} className="self-end " />

        <hr className="h-0.5 bg-raw-sienna-800" />
        {carritoExample.map((item) => {
          return <ShoppingCartItem key={item.id} item={item} />;
        })}
        <PaymentTotalButton total={totalPrice} className={"pt-8"} />
      </div>
    </div>
  );
}
