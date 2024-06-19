import ShoppingCartItem from "@/components/ShoppingCartItem/ShoppingCartItem";

export default function CarritoDeCompras() {
  return (
    <>
      <main className="flex flex-col    mx-auto  lg:max-w-7xl overflow-auto ">
        <div className=" ">
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
      </main>
    </>
  );
}
