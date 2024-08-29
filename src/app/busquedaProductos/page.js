"use client";
require("dotenv").config();

import ProductSmallView from "@/components/SmallViews/ProductSmallView";
import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function BusquedaProductos() {
  const params = useSearchParams();
  const search = params.get("search") || "";
  const category = params.get("category") || "Todo";

  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true); // Set loading to true when starting to fetch data
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`
        );
        const data = await res.json();

        const results = data.data.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        );

        const filteredByCategory =
          category === "Todo"
            ? results
            : results.filter((product) =>
                product.category.toLowerCase().includes(category.toLowerCase())
              );

        setFilteredProducts(filteredByCategory);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false); // Set loading to false once fetching is done
      }
    };

    fetchProducts();
  }, [search, category]); // Depend on search and category

  return (
    <div className="flex flex-col mx-auto  lg:max-w-screen-xl overflow-auto px-4">
      <div className="flex flex-col items-center">
        <h2 className=" text-2xl lg:text-4xl pb-8 pt-16 text-gray-700 self-start">
          Resultados de la búsqueda para
          {search && <span>{` "${search}" en `}</span>}
          <span> la categoría:</span>
          <span>{` "${category}"`}</span>
        </h2>

        <h4 className="text-xl self-start md:pl-0 text-gray-700">
          Consulta la página de detalle del producto para ver otras opciones de
          compra.
        </h4>
        {isLoading ? (
          <div>Cargando...</div>
        ) : filteredProducts.length === 0 ? (
          <h2 className="pt-6 text-xl w-full">
            {`No se encontraron productos con ese nombre`}
          </h2>
        ) : (
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 py-5">
            {filteredProducts.map((item) => (
              <ProductSmallView key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
