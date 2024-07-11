"use client";
import SocialMedia from "@/components/SocialMedia/SocialMedia";
import { Asul } from "next/font/google";
import { useEffect, useState } from "react";
import Section1Landing from "../landing/Section1Land";
export default function MarcaHeaderInfo({ id }) {
  console.log(id);
  const [brandInfo, setBrandInfo] = useState({});
  const [loading, setLoading] = useState(true);

  const getMarca = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/marcas/${id}`);
      const data = await response.json();
      setBrandInfo(data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMarca();
  }, []);

  if (loading) {
    <div>Cargando...</div>;
  }

  if (brandInfo) {
    return (
      <>
        <div className="flex flex-col  md:flex-row justify-center gap-10 py-10">
          <img
            src={brandInfo.profilePicture}
            alt={brandInfo.username}
            width="200px"
            height="200px"
            className="h-48 w-48 rounded-full self-center"
          />
          <div id="infoMarca" className="flex flex-col justify-center pl-10 ">
            <h2>{brandInfo.username}</h2>
            <h3 className="pt-2">{brandInfo.slogan}</h3>
            <p className="pt-6 w-2/3">{brandInfo.description}</p>
          </div>
          <SocialMedia />
        </div>
      </>
    );
  }
}
