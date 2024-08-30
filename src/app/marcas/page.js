"use client";
require("dotenv").config();

import ProductoDestacadoMarca2 from "@/components/SmallViews/ProductoDestacadoMarca";
import { useState, useEffect } from "react";
import { getAllProducts } from "@/api/marcas/products/routes";

export default function Marcas() {
  const [marcas, setMarcas] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newMarcasCurso, setNewMarcasCurso] = useState([]);
  const [products, setProducts] = useState([]);

  const getMarcas = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/marca/usersMarca`
      );
      const data = await response.json();
      setMarcas(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/marca/usersMarca`
        );
        const data = await response.json();
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
      const updatedMarcasCurso = marcas.map((marca) => {
        const productsMarca = products
          .filter((producto) => producto.createdBy === marca.marcaID)
          .slice(0, 4)
          .map((producto) => ({
            image: producto.productImage,
            id: producto._id,
          }));

        return {
          ...marca,
          productos: productsMarca,
        };
      });

      setNewMarcasCurso(updatedMarcasCurso);
    }
  }, [marcas, products]);

  useEffect(() => {
    if (marcas && products.length > 0) {
      setLoading(false);
    }
  }, [marcas, products]);

  if (loading) {
    return <div>Cargando...</div>;
  }
  if (marcas !== null) {
    return (
      <>
        <div className="flex flex-col    lg:max-w-screen-xl mx-auto overflow-auto ">
          <div className="flex flex-col w-full md:w-10/12  lg:max-w-7xl items-center  mx-auto ">
            <h3 className="pt-14 pb-6 text-4xl font-semibold text-zinc-700">
              Conoce nuestras marcas afiliadas
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6  py-5 w-full ml-8 md:ml-0">
              {newMarcasCurso.map((marca, index) => {
                return (
                  <ProductoDestacadoMarca2
                    key={index}
                    profile={marca.profile}
                    nameMarca={marca.nameMarca}
                    imageProductos={marca.productos}
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
