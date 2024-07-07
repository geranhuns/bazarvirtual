"use client";
import MarcaHeaderInfo from "@/components/Marcas/MarcaHeaderInfo";
import ProductSmallView from "@/components/SmallViews/ProductSmallView";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function VistaMarca() {
  const params = useParams();
  const id = params.id;
  console.log(id);

  const [brandProducts, setBrandProducts] = useState();
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/products/brand/${id}`
      );

      const data = await response.json();
      setBrandProducts(data.data);
      console.log(brandProducts);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
    console.log(brandProducts);
  }, []);
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className=" flex flex-col w-10/12 items-center  mx-auto  lg:max-w-7xl overflow-auto ">
        {console.log(id)}
        <MarcaHeaderInfo id={id} />
        <h3>Catálogo de productos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 ">
          {!brandProducts && <h3>Esta marca no tiene productos</h3>}
          {brandProducts &&
            brandProducts.map((product) => {
              return <ProductSmallView key={product._id} item={product} />;
            })}
        </div>
      </div>
    </>
  );
}
