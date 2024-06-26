"use client";
import ProductoDestacadoMarca from "@/components/SmallViews/ProductoDestacadoMarca";

export default function Marcas() {
  return (
    <>
      <div className="flex flex-col    mx-auto  lg:max-w-7xl overflow-auto">
        <div className="flex flex-col w-10/12 mx-auto lg:max-w-7xl items-center">
          <h3 className="pt-8">Conoce nuestras marcas afiliadas</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
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
