import ProductSmallView from "@/components/SmallViews/ProductSmallView";
export default function BusquedaProductos() {
  return (
    <div className="flex flex-col    mx-auto  lg:max-w-screen-xl overflow-auto mx-auto justify-center items-center ">
      <div className="flex flex-col w-10/12 md:mx-auto  lg:max-w-screen-xl ">
        <h2 className="pt-6 text-xl self-start  md:pl-0">
          Resultados de la búsqueda
        </h2>
        <h4 className=" text-sm self-start md:pl-0">
          Consulta la página de detalle del producto para ver otras opciones de
          compra.
        </h4>
        <div className=" pt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 ">
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
    </div>
  );
}
