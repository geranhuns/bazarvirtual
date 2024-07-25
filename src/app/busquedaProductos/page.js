"use client";
import ProductSmallView from "@/components/SmallViews/ProductSmallView";
import { useParams, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
export default function BusquedaProductos() {
  const params = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);

  const search = params.get("search");
  const category = params.get("category");

  const [filteredProducts, setFilteredProducts] = useState([]);

  // const location = useLocation();
  // const { state } = location;

  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const results = data.data.filter((product) =>
          product.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(results);
        if (category !== "Todo") {
          const resCategory = results.filter((product) =>
            product.category.toLowerCase().includes(category.toLowerCase())
          );
          setFilteredProducts(resCategory);
        }
      });
    setIsLoading(false);
  }, []);

  return (
    <div className="flex flex-col    mx-auto  lg:max-w-screen-xl overflow-auto   ">
      <div className="flex flex-col w-full md:mx-auto  lg:max-w-screen-xl ">
        <div className="flex ">
          <h2 className="pt-6 text-xl self-start  md:pl-0">
            Resultados de la búsqueda para
          </h2>
          {search && (
            <h2 className="ml-1 pt-6 text-xl self-start  md:pl-0">{`"${search}" en`}</h2>
          )}
          <h2 className="ml-1 pt-6 text-xl self-start  md:pl-0">
            la categoría:
          </h2>
          <h2 className="ml-1 pt-6 text-xl self-start  md:pl-0">{`"${category}"`}</h2>
        </div>

        <h4 className=" text-sm self-start md:pl-0">
          Consulta la página de detalle del producto para ver otras opciones de
          compra.
        </h4>
        {isLoading ? (
          <div>Cargando...</div>
        ) : !filteredProducts || filteredProducts.length === 0 ? (
          <h2 className="pt-6 text-xl w-full">
            {`No tenemos productos de "${search}" en esta categoría`}
          </h2>
        ) : null}
        <div className=" pt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 ">
          {filteredProducts &&
            filteredProducts.map((item) => {
              return <ProductSmallView key={item.id} item={item} />;
            })}
        </div>
      </div>
    </div>
  );
}
