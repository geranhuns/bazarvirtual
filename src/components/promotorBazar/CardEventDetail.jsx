import { React, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

function CardEventDetail({ events, fecha, setDataDate, setIdDate, dateID, idDate, openEdDate, setOpenEdDate, editButtonsActive, place, time, marcasCurso}) {
    console.log(fecha)

    const obtenerFechaFormateada = (fechaCompleta) => {
    if (!fechaCompleta) return "";

    const fecha = new Date(fechaCompleta);
    const dia = fecha.getUTCDate(); // Obtener el día en UTC
    const mes = fecha.toLocaleString("es-ES", { month: "short", timeZone: "UTC" }); // Obtener el mes en UTC

    return `${dia}-${mes}`;
};

    return (
        <>
            <div className="flex flex-col w-4/12 px-1 ">

                <span
                    key={dateID}
                    className={`flex flex-row  ${idDate === dateID
                        ? "bg-raw-sienna-400 text-raw-sienna-50"
                        : "bg-raw-sienna-200"
                        } w-full items-start justify-around cursor-pointer rounded-lg p-1 border max-sm:flex-col max-sm:items-center`}
                    onClick={() => {
                        // setIsParticipant(false)
                        setDataDate({events, place, time, marcasCurso});
                        setIdDate(dateID);

                    }}
                >
                    <h5 className="text-base font-medium">
                        {obtenerFechaFormateada(fecha)}
                    </h5>
                    {editButtonsActive && (
                        <button
                            className="w-3/12 h-5/6 rounded-2xl text-base font-medium"
                            onClick={() => {
                                setIdDate(dateID);
                                setOpenEdDate(!openEdDate);
                            }}
                        >
                            <FaRegEdit className="w-full h-full" />
                        </button>
                    )}
                </span>



            </div>
        </>
    )
}

export default CardEventDetail;