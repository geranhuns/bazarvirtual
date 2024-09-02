"use client";
require("dotenv").config();

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import MarcaSmallView from "./MarcaSmallView";
import ProductoDestacadoMarca2 from "@/components/SmallViews/ProductoDestacadoMarca2"; // Importa el componente correcto

export default function ProductoDestacadoMarca({
  id,
  profilePicture,
  brand,
  className,
}) {
  const router = useRouter();
  const [brandProducts, setBrandProducts] = useState([]);
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
  }, [id]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <div
      className={`flex flex-col self-start bg-raw-sienna-50 py-5 rounded-md h-[60vh] md:h-96 ${className}`}
    >
      <Link
        className="flex flex-col gap-4 items-center cursor-pointer w-full"
        href={`/marcas/${id}`}
      >
        <MarcaSmallView
          className={"h-3/12 flex-col"}
          brandId={id}
          profilePicture={profilePicture}
          brand={brand}
        />
        <ProductoDestacadoMarca2
          profile={profilePicture}
          nameMarca={brand}
          imageProductos={brandProducts.slice(0, 4)} // Asegúrate de pasar solo hasta 4 imágenes
        />
      </Link>
    </div>
  );
}
