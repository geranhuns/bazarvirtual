"use client";
import MarcaHeaderInfo from "@/components/Marcas/MarcaHeaderInfo";
import ProductSmallView from "@/components/SmallViews/ProductSmallView";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { CiSquarePlus } from "react-icons/ci";

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
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <div className=" flex flex-col w-10/12 items-center  mx-auto  lg:max-w-7xl overflow-auto mb-28">
        <MarcaHeaderInfo id={id} />
        <h3 className="text-3xl mr-4">Catálogo de productos</h3>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5 ">
          {!brandProducts && <h3>Esta marca no tiene productos</h3>}
          {brandProducts &&
            brandProducts.map((product) => {
              return <ProductSmallView key={product._id} item={product} />;
            })}
        </div>
        <div className="flex flex-col items-center bg-raw-sienna-50 py-5 px-2 rounded-md w-44 h-48">
          <div className="h-24 w-24 bg-raw-sienna-300 text-center rounded-md my-auto">
            <CiSquarePlus className="h-full w-full text-raw-sienna-800" />
          </div>
        </div>
      </div>
    </>
  );
}
