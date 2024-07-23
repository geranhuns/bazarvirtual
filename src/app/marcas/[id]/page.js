"use client";
import MarcaHeaderInfo from "@/components/Marcas/MarcaHeaderInfo";
import ProductSmallView from "@/components/SmallViews/ProductSmallView";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import { jwtDecode } from "jwt-decode";

export default function VistaMarca() {
  const [token, setToken] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  const params = useParams();
  const id = params.id;

  const [brandProducts, setBrandProducts] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        setToken(storedToken);
      }
    }
  }, [token]);

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
  const decodeToken = (token) => {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };
  useEffect(() => {
    if (token) {
      const decoded = decodeToken(token);
      setDecodedToken(decoded);
    }
  }, [token]);
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
        <div className="flex items-center justify-center">
          <h3 className="text-3xl mr-4">Catálogo de productos</h3>
          {decodedToken._id === id && (
            <a href={`/miCatalogo/${id}`}>
              <MdEdit className="text-lg" />
            </a>
          )}
        </div>

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
