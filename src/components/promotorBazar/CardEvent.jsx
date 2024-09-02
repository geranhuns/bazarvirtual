
import React from "react";
import { FaTrash } from "react-icons/fa6";


import { deleteEspecialEvent } from "@/api/bazar/routes";

function CardEvent({ eventName, description, timeEvent, idDate, eventID, setDataDate, fetchDataDates, showBin, editButtonsActive, eventCount }) {
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
        <div className="bg-patina-500 w-full h-full rounded-lg flex   justify-around items-center my-1 mx-auto   ">

            <div className="  w-9/12 h-10/12 flex flex-col text-white items-center justify-around text-center max-sm:w-9/12 ">
                <span className="text-2xl font-semibold flex justify-around items-center max-md:text-lg">{eventName}</span>
                <span className="text-xl font-medium max-md:text-sm">{description}</span>
                <span className="text-xl font-medium flex justify-around items-center max-md:text-sm">{timeEvent}</span>
            </div>

            {showBin && <div className="  w-2/12 h-full flex justify-center items-center text-gray-300 hover:text-red-400  p-1">
                <button
                    className=" rounded-lg p-2"
                    onClick={handleDelete}
                >
                    <FaTrash className=" w-11  h-7 hover:w-11 hover:h-8 p-1" />


                </button>


            </div>}
        </div>
    );
}

export default CardEvent;
