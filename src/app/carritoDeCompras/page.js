import ShoppingCartItem from "@/components/ShoppingCartItem/ShoppingCartItem";
import PaymentTotalButton from "@/components/paymentTotalButton/PaymentTotalButton";
export default function CarritoDeCompras() {
  return (
    <div className="flex flex-col  items-center    lg:max-w-screen-xl mx-auto overflow-auto ">
      <div className=" flex flex-col pt-4 md:pt-10 pb-8 ">
        <h3 className="text-lg">Carrito de Compras</h3>
        <p className="pb-8">
          Consulta la página de detalle del producto para ver otras opciones de
          compra.
        </p>
        <PaymentTotalButton className="self-end " />

        <hr className="h-0.5 bg-raw-sienna-800" />
        <ShoppingCartItem />
        <ShoppingCartItem />
        <ShoppingCartItem />
        <ShoppingCartItem />
      </div>
      <PaymentTotalButton />
    </div>
  );
}
