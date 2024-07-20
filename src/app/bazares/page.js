"use client";
import BazarMediumView from "@/components/bazares/bazaresMediumVie";
import CreaTuBazarBanner from "@/components/CreaTuBazarBanner/CreaTuBazarBanner";
import { useEffect, useState } from "react";

export default function Bazares() {
  const [bazares, setBazares] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/users/bazares")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setBazares(data.data);
      });
  }, []);
  return (
    <>
      <div className="    mx-auto  lg:max-w-screen-xl overflow-auto">
        <div className="flex flex-col  w-10/12 mx-auto items-center justify-center">
          <h2 className="self-center pt-4">Bazares Afiliados</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-14 py-5 ">
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
