"use client";
import BazarMediumView from "@/components/bazares/bazaresMediumVie";
import CreaTuBazarBanner from "@/components/CreaTuBazarBanner/CreaTuBazarBanner";
import { useEffect, useState } from "react";

export default function ProximosBazares() {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/events")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEventos(data.data);
      });
  }, []);
  return (
    <>
      <div className="    mx-auto  lg:max-w-screen-xl overflow-auto">
        <div className="flex flex-col  w-10/12 mx-auto items-center justify-center">
          <h2 className="self-center pt-4">Próximas Fechas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-14 py-5 ">
            {eventos.map((item) => {
              return <BazarMediumView key={item._id} item={item} />;
            })}
          </div>
          <CreaTuBazarBanner />
        </div>
      </div>
    </>
  );
}
