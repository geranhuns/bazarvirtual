import ShoppingCartItem from "@/components/ShoppingCartItem/ShoppingCartItem";
import Button from "@/components/Button/Button";
export default function CarritoDeCompras() {
  return (
    <>
      <div className="flex flex-col  items-center  mx-auto  lg:max-w-7xl overflow-auto ">
        <div className=" pt-4 md:pt-10 pb-8 w-10/12">
          <h3 className="text-lg">Carrito de Compras</h3>
          <p>
            Consulta la página de detalle del producto para ver otras opciones
            de compra.
          </p>
          <hr className="h-0.5 bg-raw-sienna-800" />
          <ShoppingCartItem />
          <ShoppingCartItem />
          <ShoppingCartItem />
          <ShoppingCartItem />
        </div>
        <div className="flex self-end gap-10 text-2xl pb-8 pr-10 md:pr-32">
          <Button
            text="Proceder al pago"
            href="/stripeWindow"
            className={"text-xs md:text-xl"}
            variant={"raw-sienna-900"}
          />
          <div className="flex gap-4 text-base md:text-xl items-center">
            <h3>Total:</h3>
            <h3>$5,000.00</h3>
          </div>
        </div>
      </div>
    </>
  );
}
