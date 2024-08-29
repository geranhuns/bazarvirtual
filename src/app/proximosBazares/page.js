"use client";
require("dotenv").config();

import BazarMediumView from "@/components/bazares/BazaresMediumVie";
import CreaTuBazarBanner from "@/components/CreaTuBazarBanner/CreaTuBazarBanner";
import { useEffect, useState } from "react";

export default function ProximosBazares() {
  const [eventos, setEventos] = useState([]);
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/bazar/bazarDates`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setEventos(data.data);
      });
  }, []);
  return (
    <>
      <div className="mx-auto  lg:max-w-screen-xl  px-4">
        <div className="flex flex-col">
          <h2 className="self-center pt-14 pb-6 text-3xl font-semibold text-patina-900">
            Próximas Fechas
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-8 py-5  ">
            {eventos
              .filter((evento) => {
                const eventStartDate = new Date(evento.date);
                const eventStartDateMinusThreeDays = new Date(eventStartDate);
                eventStartDateMinusThreeDays.setDate(
                  eventStartDate.getDate() + 3
                );
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Eliminar la parte de la hora para comparar solo las fechas

                return eventStartDateMinusThreeDays >= today;
              })
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
        </div>
        <CreaTuBazarBanner />
      </div>
    </>
  );
}
