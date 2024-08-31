"use client";
require("dotenv").config();

import ProductoDestacadoMarca2 from "@/components/SmallViews/ProductoDestacadoMarca2";
import { useState, useEffect } from "react";
import { getAllProducts } from "@/api/marcas/products/routes";

export default function Marcas() {
  const [marcas, setMarcas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMarcasCurso, setNewMarcasCurso] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/marca/usersMarca`
        );
        const data = await response.json();
        console.log("Marcas data:", data); // Verifica el formato y contenido de la respuesta
        setMarcas(data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (marcas) {
      const fetchProducts = async () => {
        try {
          const products = await getAllProducts();
          console.log("Fetched products:", products); // Agrega este log
          setProducts(products.data);
        } catch (error) {
          console.log(error);
        }
      };

      fetchProducts();
    }
  }, [marcas]);

  useEffect(() => {
    if (Array.isArray(marcas) && products.length > 0) {
      const updatedMarcasCurso = marcas
        .map((marca) => {
          // Filtra los productos que pertenecen a la marca actual
          const productsMarca = products
            .filter(
              (producto) =>
                producto.createdBy &&
                marca._id &&
                producto.createdBy.toString() === marca._id.toString()
            )
            .slice(0, 4)
            .map((producto) => ({
              image: producto.productImage,
              id: producto._id,
            }));

          // Solo incluye marcas que tienen productos
          if (productsMarca.length > 0) {
            return {
              ...marca,
              productos: productsMarca,
            };
          }

          // Devuelve `null` o `undefined` para marcas sin productos
          return null;
        })
        .filter((marca) => marca !== null); // Filtra marcas que son `null`

      setNewMarcasCurso(updatedMarcasCurso);
    }
  }, [marcas, products]);

  useEffect(() => {
    if (marcas && products.length > 0) {
      console.log("Products state:", products); // Agrega este log
      setLoading(false);
    }
  }, [marcas, products]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (marcas !== null) {
    return (
      <>
        <div className="flex flex-col lg:max-w-screen-xl mx-auto overflow-auto">
          <div className="flex flex-col w-full  lg:max-w-7xl items-center mx-auto px-4">
            <h3 className="pt-14 pb-6 text-4xl font-semibold text-zinc-700">
              Conoce nuestras marcas afiliadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 py-5 w-full  md:ml-0">
              {newMarcasCurso.map((marca, index) => {
                return (
                  <ProductoDestacadoMarca2
                    key={index}
                    profile={marca.profilePicture}
                    nameMarca={marca.username}
                    imageProductos={marca.productos} // Aquí pasamos las imágenes correctas
                  />
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
