import ShoppingCartItem from "@/components/ShoppingCartItem/ShoppingCartItem";

export default function ListaDeDeseos() {
  return (
    <>
      <main className="flex flex-col  items-center  mx-auto  lg:max-w-7xl overflow-auto ">
        <div className=" pt-10 pb-8 w-10/12">
          <h3 className="text-lg">Lista de Deseos</h3>
          <p>
            Consulta la página de detalle del producto para ver otras opciones
            de compra.
          </p>
          <hr className="h-0.5 bg-raw-sienna-800" />
          <ShoppingCartItem />

          <ShoppingCartItem />
        </div>
      </main>
    </>
  );
}
