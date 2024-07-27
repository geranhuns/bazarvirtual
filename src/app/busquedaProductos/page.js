"use client";
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
        const res = await fetch("http://localhost:3001/products");
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
    <div className="flex flex-col mx-auto lg:max-w-screen-xl overflow-auto">
      <div className="flex flex-col w-full md:mx-auto lg:max-w-screen-xl">
        <div className="flex">
          <h2 className="pt-6 text-xl self-start md:pl-0">
            Resultados de la búsqueda para
          </h2>
          {search && (
            <h2 className="ml-1 pt-6 text-xl self-start md:pl-0">{`"${search}" en`}</h2>
          )}
          <h2 className="ml-1 pt-6 text-xl self-start md:pl-0">
            la categoría:
          </h2>
          <h2 className="ml-1 pt-6 text-xl self-start md:pl-0">{`"${category}"`}</h2>
        </div>

        <h4 className="text-sm self-start md:pl-0">
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
          <div className="pt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
            {filteredProducts.map((item) => (
              <ProductSmallView key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
