"use client";
require("dotenv").config();

import FormMarca from "@/components/FormMarca/FormMarca";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
// import Section1Landing from "@/components/landing/Section1Land";

export default function EditarMarcaPage() {
  const [marcaInfo, setMarcaInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  const getMarcaInfo = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/marca/${id}`
      );
      const data = await response.json();
      setMarcaInfo(data.data);
      setIsLoading(false);

      // Section1Landing(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMarcaInfo();
  }, []);
  if (isLoading) {
    return <div>Cargando...</div>;
  }
  return (
    <div className="flex flex-col w-5/12 items-center h-screen lg:max-w-screen-xl mx-auto mb-28 ">
      <h1 className="text-3xl font-semibold text-center text-raw-sienna-500 p-5 ">
        Editar Marca
      </h1>
      <FormMarca marcaInfo={marcaInfo} />
    </div>
  );
}
