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
      // onClick={() => {
      //   router.push(`marcas/${id}`);
      // }}
      className="flex flex-col self-start bg-raw-sienna-50  py-5  rounded-md    h-[60vh] md:h-96 "
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
                  <div>
                    <img
                      key={product._id}
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
