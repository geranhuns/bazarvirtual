import { React, useState } from "react";
import { FaRegEdit } from "react-icons/fa";

function CardEventDetail({ events, fecha, setDataDate, setIdDate, dateID, openEdDate, setOpenEdDate, editButtonsActive }) {
    //  console.log(`ID del la fecha ${fecha}: ${dateID}`)
    // console.log(events)
    const obtenerFechaFormateada = (fechaCompleta) => {
        // Extrae la parte de la fecha 'yyyy-MM-dd' de la cadena 'yyyy-MM-ddTHH:mm:ss.sssZ'
        if (!fechaCompleta) return "";

        const fecha = new Date(fechaCompleta);
        const dia = fecha.getDate();
        const mes = fecha.toLocaleString("es-ES", { month: "short" });

        return `${dia}-${mes}`;
    };

    return (
        <>
            <span className="flex flex-row w-3/12  bg-raw-sienna-200 items-center justify-around cursor-pointer  rounded-lg p-1"
                // onClick={()=>console.log(dateID)}
                onClick={() => { setDataDate(events), setIdDate(dateID) }}
            >
                <h5 className="text-lg font-medium">{obtenerFechaFormateada(fecha)}</h5>
                {editButtonsActive &&
                    <button className="w-3/12 h-5/6 rounded-2xl text-base font-medium" onClick={() => { setIdDate(dateID), setOpenEdDate(!openEdDate) }} >
                        <FaRegEdit className="w-full h-full " />
                    </button>
                }
            </span>
        </>
    )
}

export default CardEventDetail;