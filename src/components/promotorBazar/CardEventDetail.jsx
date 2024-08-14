import { React, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

function CardEventDetail({ events, fecha, setDataDate, setIdDate, dateID, idDate, openEdDate, setOpenEdDate, editButtonsActive, place, time, marcasCurso }) {

    const obtenerFechaFormateada = (fechaCompleta) => {
        if (!fechaCompleta) return "";

        const fecha = new Date(fechaCompleta);
        const dia = fecha.getUTCDate(); // Obtener el día en UTC
        const mes = fecha.toLocaleString("es-ES", { month: "short", timeZone: "UTC" }); // Obtener el mes en UTC

        return `${dia}-${mes}`;
    };

    return (
        <>
            <div className="flex flex-col w-4/12 px-1 justify-center">

                <span
                    key={dateID}
                    className={`flex flex-row  ${idDate === dateID
                        ? "bg-raw-sienna-400 text-raw-sienna-50 justify-center"
                        : "bg-raw-sienna-200"
                        } w-full items-start justify-center cursor-pointer rounded-lg p-1 border max-sm:flex-col max-sm:items-center pl-2`}
                    onClick={() => {
                        // setIsParticipant(false)
                        setDataDate({ events, place, time, marcasCurso });
                        setIdDate(dateID);

                    }}
                >
                    <h5 className="text-base font-medium">
                        {obtenerFechaFormateada(fecha)}
                    </h5>
                    {editButtonsActive && (
                        <button
                            className="w-3/12 h-5/6 rounded-2xl text-base font-medium pl-7"
                            onClick={() => {
                                setIdDate(dateID);
                                setOpenEdDate(!openEdDate);
                            }}
                        >
                            <FaRegEdit className="w-6 h-6" />
                        </button>
                    )}
                </span>



            </div>
        </>
    )
}

export default CardEventDetail;