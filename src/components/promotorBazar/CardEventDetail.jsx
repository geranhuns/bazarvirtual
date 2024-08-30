import { React, useState } from "react";
import { MdEdit } from "react-icons/md";
import { usePathname, useSearchParams } from "next/navigation";

function CardEventDetail({ events, fecha, setDataDate, setIdDate, dateID, idDate, openEdDate, setOpenEdDate, editButtonsActive, place, time, marcasCurso }) {
    const pathname = usePathname()
    const searchParams = useSearchParams();

    const obtenerFechaFormateada = (fechaCompleta) => {
        if (!fechaCompleta) return "";

        const fecha = new Date(fechaCompleta);
        const dia = fecha.getUTCDate(); // Obtener el día en UTC
        const mes = fecha.toLocaleString("es-ES", { month: "short", timeZone: "UTC" }); // Obtener el mes en UTC

        return `${dia}-${mes}`;
    };

    return (
        <>
            <div className="flex flex-col w-full md:w-3/12 px-1 justify-center">

                <span
                    key={dateID}
                    className={`flex flex-row  ${idDate === dateID
                        ? "bg-raw-sienna-500 text-raw-sienna-50 justify-center"
                        : "bg-raw-sienna-200"
                        } w-full items-start justify-center cursor-pointer rounded-lg max-sm:items-center p-2 text-patina-900`}
                    onClick={() => {
                        // setIsParticipant(false)
                        setDataDate({ events, place, time, marcasCurso });
                        setIdDate(dateID);
                        if (pathname) {
                            const newSearchParams = new URLSearchParams(searchParams);
                            newSearchParams.set('date', dateID);
                            const newUrl = `${pathname}?${newSearchParams.toString()}`;
                            window.history.pushState({}, '', newUrl);
                        } else {
                            console.error("pathname is not available");
                        }
                    }}
                >
                    <h5 className="text-base font-medium w-full">
                        {obtenerFechaFormateada(fecha)}
                    </h5>
                    {editButtonsActive && (
                        <button
                            className=" h-5/6 rounded-2xl text-base font-medium "
                            onClick={() => {
                                setIdDate(dateID);
                                setOpenEdDate(!openEdDate);
                            }}
                        >
                            <MdEdit className="w-6 h-6" />
                        </button>
                    )}
                </span>



            </div>
        </>
    )
}

export default CardEventDetail;