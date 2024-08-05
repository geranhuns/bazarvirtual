"use client";
import { useEffect, useState } from "react";
import BazarSmallView from "../SmallViews/BazarSmallView";
import Button from "../Button/Button";

export default function ProximosBazares({ className }) {
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
    <section className={className}>
      <div className="flex flex-col   top-0 left-0  w-full  px-8  items-center justify-center rounded-xl  bg-patina-900 mt-2 text-raw-sienna-50 py-8">
        <h2 className="text-center text-lg pb-4">Próximos Bazares</h2>
        <div className="flex flex-col items-center justify-center ">
          <div className=" flex w-full py-4 gap-8 flex-wrap  lg:flex-nowrap justify-center ">
            {eventos
              .filter((evento) => {
                const eventStartDate = new Date(evento.date);
                const eventStartDateMinusThreeDays = new Date(eventStartDate);
                eventStartDateMinusThreeDays.setDate(
                  eventStartDate.getDate() - 3
                );
                const today = new Date();
                today.setHours(0, 0, 0, 0); // Eliminar la parte de la hora para comparar solo las fechas

                return eventStartDateMinusThreeDays >= today;
              })
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .slice(0, 4)
              .map((item) => {
                return (
                  <article key={item._id}>
                    <BazarSmallView item={item} />
                  </article>
                );
              })}
          </div>
          <Button
            text={"Ver todos"}
            href={"/proximosBazares"}
            variant={"patina-500"}
            className={" w-full md:w-1/2 lg:1/3 text-lg"}
          />
        </div>
        {/* <div className="bg-yellow-bazar py-2 px-4 mt-10">
          <p>
            ¡<a href="/register">Registra</a> tu bazar e invítanos a comprar con
            tus marcas invitadas!
          </p>
        </div> */}
      </div>
    </section>
  );
}
