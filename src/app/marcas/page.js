"use client";
import ProductoDestacadoMarca from "@/components/SmallViews/ProductoDestacadoMarca";

export default function Marcas() {
  return (
    <>
      <div className="flex flex-col    lg:max-w-screen-xl mx-auto overflow-auto">
        <div className="flex flex-col w-full md:w-10/12 mx-auto lg:max-w-7xl items-center">
          <h3 className="pt-8">Conoce nuestras marcas afiliadas</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 py-5 w-full">
            <ProductoDestacadoMarca />
            <ProductoDestacadoMarca />
            <ProductoDestacadoMarca />
            <ProductoDestacadoMarca />
            <ProductoDestacadoMarca />
          </div>
        </div>
      </div>
    </>
  );
}
