"use client";
import ProductoDestacadoMarca from "@/components/SmallViews/ProductoDestacadoMarca";
import { useState, useEffect } from "react";

export default function Marcas() {
  const [marcas, setMarcas] = useState(null);
  const [loading, setLoading] = useState(true);
  // useEffect(async () => {
  //   const response = await fetch("http://localhost:3001/users/marcas");
  //   const data = await response.json();
  //   setMarcas(data.data);
  //   setLoading(false);
  // }, []);

  // useEffect(() => {
  //   const fetchMarcas = async () => {
  //     try {
  //       const res = await fetch("http://localhost:3001/users/marcas");
  //       const data = await res.json();
  //       console.log(data);
  //       setMarcas(data.data);
  //       console.log(marcas);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching marcas:", error);
  //       setLoading(false); // Ensures loading state is updated even if there is an error
  //     }
  //   };

  //   fetchMarcas();
  // }, []);

  const getMarcas = async () => {
    try {
      const response = await fetch("http://localhost:3001/users/marcas");
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
        <div className="flex flex-col    lg:max-w-screen-xl mx-auto overflow-auto">
          <div className="flex flex-col w-full md:w-10/12 mx-auto lg:max-w-7xl items-center">
            <h3 className="pt-8">Conoce nuestras marcas afiliadas</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 py-5 w-full">
              {marcas.map((marca) => {
                const marcaId = marca._id;
                return <ProductoDestacadoMarca key={marcaId} id={marcaId} />;
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}
