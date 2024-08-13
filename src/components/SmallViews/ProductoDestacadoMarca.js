"use client";
require("dotenv").config();

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import MarcaSmallView from "./MarcaSmallView";
import Link from "next/link";

export default function ProductoDestacadoMarca({
  id,
  profilePicture,
  brand,
  className,
}) {
  const router = useRouter();

  const [brandProducts, setBrandProducts] = useState();
  const [loading, setLoading] = useState(true);

  const getProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/products/brand/${id}`
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
      // onClick={() => {
      //   router.push(`marcas/${id}`);
      // }}
      className={`flex flex-col  self-start bg-raw-sienna-50  py-5  rounded-md    h-[60vh] md:h-96 ${className}`}
    >
      <Link
        className="flex flex-col gap-4 items-center cursor-pointer w-full"
        href={`/marcas/${id}`}
      >
        <div className="h-full w-full">
          <MarcaSmallView
            className={"h-3/12 flex-col"}
            brandId={id}
            profilePicture={profilePicture}
            brand={brand}
          />
          {/* este es de 4 imagenes */}
          <div className="h-9/12 w-full grid grid-cols-2  ">
            {brandProducts &&
              brandProducts.slice(0, 4).map((product) => {
                return (
                  <div key={product._id}>
                    <img
                      className="w-full h-[20vh] md:h-32  object-cover overflow-hidden"
                      src={product.productImage}
                      width="200px"
                      heigth="200px"
                      alt={product.title}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </Link>
    </div>
  );
}
