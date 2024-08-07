"use client";
import BazarMediumView from "@/components/bazares/BazaresMediumVie";
import CreaTuBazarBanner from "@/components/CreaTuBazarBanner/CreaTuBazarBanner";
import { useEffect, useState } from "react";

export default function ProximosBazares() {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    fetch("http://localhost:3001/bazar/bazarDates")
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
          <h2 className="self-center pt-4 text-3xl">Próximas Fechas</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-14 py-5 ">
            {eventos
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((item) => {
                return (
                  <BazarMediumView
                    key={item._id}
                    item={item}
                    createdBy={item.createdBy}
                  />
                );
              })}
          </div>
          <CreaTuBazarBanner />
        </div>
      </div>
    </>
  );
}
