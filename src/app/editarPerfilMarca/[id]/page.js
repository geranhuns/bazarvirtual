"use client";
import FormMarca from "@/components/FormMarca/FormMarca";
import { useParams } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
// import Section1Landing from "@/components/landing/Section1Land";

export default function EditarMarcaPage() {
  const [marcaInfo, setMarcaInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();
  const id = params.id;

  const getMarcaInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3001/marca/${id}`);
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
    <div className="flex flex-col items-center h-screen lg:max-w-screen-xl mx-auto">
      <h1 className="text-3xl font-semibold text-center text-raw-sienna-500 p-5 ">
        Editar Marca
      </h1>
      <FormMarca marcaInfo={marcaInfo} />
    </div>
  );
}
