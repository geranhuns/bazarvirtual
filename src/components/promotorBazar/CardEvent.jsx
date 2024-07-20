
import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { deleteEspecialEvent } from "@/api/bazar/routes";

function CardEvent({ eventName, description, timeEvent, idDate, eventID, setDataDate, fetchDataDates }) {

    const handleDelete = async () => {
        try {
            await deleteEspecialEvent(idDate, eventID);
            fetchDataDates();  // Actualizar fechas después de eliminar el evento
            setDataDate([]);   // Limpiar los eventos mostrados
        } catch (error) {
            console.error('Error al eliminar evento especial:', error);
        }
    };

    return (
        <div className="bg-raw-sienna-500 w-5/12 h-3/6 rounded-lg flex items-center justify-around max-md:h-2/6 max-md:w-7/12 max-sm:w-11/12 max-sm:flex-col">
            <div className="w-2/12 h-full flex justify-center">
                <button className="bg-red-500 rounded-lg p-2 hover:p-4 hover:border-red-600" onClick={handleDelete}>
                    Delete
                </button>
            </div>
            <div className="w-8/12 h-full flex flex-col items-center justify-around text-center max-sm:w-9/12">
                <span className="text-2xl font-semibold flex justify-around items-center max-md:text-lg">{eventName}</span>
                <span className="text-xl font-medium max-md:text-sm">{description}</span>
                <span className="text-xl font-medium flex justify-around items-center max-md:text-sm">{timeEvent}</span>
            </div>
        </div>
    );
}

export default CardEvent;
