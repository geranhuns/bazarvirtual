import ProductSmallView from "@/components/SmallViews/ProductSmallView";
export default function BusquedaProductos() {
  return (
    <main className="flex flex-col    mx-auto  lg:max-w-7xl overflow-auto ">
      <div className="flex flex-col w-10/12 mx-auto  lg:max-w-7xl items-center">
        <h2 className="pt-6 text-xl self-start pl-20">
          Resultados de la búsqueda
        </h2>
        <h4 className=" text-sm self-start pl-20">
          Consulta la página de detalle del producto para ver otras opciones de
          compra.
        </h4>
        <div className=" pt-4 grid grid-cols-4 gap-4 pb-5 px-20">
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />

          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
          <ProductSmallView />
        </div>
      </div>
    </main>
  );
}
