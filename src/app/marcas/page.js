"use client";
require("dotenv").config();

import ProductoDestacadoMarca from "@/components/SmallViews/ProductoDestacadoMarca";
import { useState, useEffect } from "react";

export default function Marcas() {
  const [marcas, setMarcas] = useState(null);
  const [loading, setLoading] = useState(true);

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
    getMarcas();
  }, []);
  if (loading) {
    return <div>Cargando...</div>;
  }
  if (marcas !== null) {
    return (
      <>
        <div className="flex flex-col    lg:max-w-screen-xl mx-auto overflow-auto ">
          <div className="flex flex-col w-full md:w-10/12  lg:max-w-7xl items-center  mx-auto ">
            <h3 className="pt-8 text-2xl">Conoce nuestras marcas afiliadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6  py-5 w-full ml-8 md:ml-0">
              {marcas.map((marca) => {
                return (
                  <ProductoDestacadoMarca
                    key={marca._id}
                    id={marca._id}
                    profilePicture={marca.profilePicture}
                    brand={marca.username}
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
