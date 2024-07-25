"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MarcaSmallView from "./MarcaSmallView";
import Link from "next/link";
export default function ProductoDestacadoMarca({ id, profilePicture, brand }) {
  const router = useRouter();

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
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      onClick={() => {
        router.push(`marcas/${id}`);
      }}
      className="flex flex-col items-center justify-center bg-raw-sienna-50 py-5 rounded-md w-11/12"
    >
      <Link
        className="flex flex-col gap-4 items-center cursor-pointer w-full"
        href={`/marcas/${id}`}
      >
        <MarcaSmallView
          className={" flex-col"}
          brandId={id}
          profilePicture={profilePicture}
          brand={brand}
        />
        <div className="grid grid-cols-2 md:w-full ">
          {brandProducts &&
            brandProducts.slice(0, 4).map((product) => {
              return (
                <img
                  key={product._id}
                  className=" "
                  src={product.productImage}
                  width="200px"
                  heigth="200px"
                  alt={product.title}
                />
              );
            })}
        </div>
      </Link>
    </div>
  );
}
