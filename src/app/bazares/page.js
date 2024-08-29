"use client";
require("dotenv").config();

import BazarMediumView from "@/components/bazares/BazaresMediumVie";
import CreaTuBazarBanner from "@/components/CreaTuBazarBanner/CreaTuBazarBanner";
import { useEffect, useState } from "react";

export default function Bazares() {
  const [bazares, setBazares] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bazar/usersBazar`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBazares(data.data);
        setLoading(false);
      });
  }, []);
  if (loading) return <div>Cargando...</div>;
  return (
    <>
      <div className="mx-auto  lg:max-w-screen-xl px-4">
        <div className="flex flex-col   mx-auto items-center justify-center">
          <h2 className="self-center pt-14 pb-6 text-4xl font-semibold text-patina-900">
            Bazares Afiliados
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 py-5 ">
            {bazares.map((item) => {
              return <BazarMediumView key={item._id} item={item} />;
            })}
          </div>
          <CreaTuBazarBanner />
        </div>
      </div>
    </>
  );
}
