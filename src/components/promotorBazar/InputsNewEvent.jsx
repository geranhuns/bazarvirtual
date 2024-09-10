import React from "react";
import { FaTrash } from "react-icons/fa6";

const InputNewEvent = ({ eventName, description, timeEvent, errors, openEdDate,openAddEspEvent, index, onChange, removeExtraEvent }) => {
    return (
        <div className="flex  gap-2 mb-4 w-full justify-between">
            <div className="flex flex-col w-4/12">
                {/* <label className="text-lg text-white">Evento</label> */}

                <input
                    className="p-1 rounded-sm text-center "
                    placeholder="Nombre del evento"
                    type="text"
                    name="eventName"
                    value={eventName}
                    onChange={(e) => onChange(e, index)}
                />
            </div>
            <div className="flex flex-col w-4/12">
                {/* <label className="text-lg text-white">Descripción</label> */}

                <input
                    className="p-1 rounded-sm text-center "
                    placeholder="Descripción del evento"
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => onChange(e, index)}
                />
            </div>
            <div className="flex flex-col w-3/12">
                {/* <label className="text-lg text-white">Horario</label> */}

                <input
                    className="p-1 rounded-sm text-center "
                    placeholder="Hora del evento"
                    type="time"
                    name="timeEvent"
                    value={timeEvent}
                    onChange={(e) => onChange(e, index)}
                />
            </div>
            {errors && <label className="text-red-700 text-xs">Este campo es requerido</label>}
            {openEdDate || openAddEspEvent && (
                <button
                    type="button"
                    className=" text-white  rounded-full flex items-end pb-3 w-1/12 hover:text-red-500"
                    onClick={() => removeExtraEvent(index)}
                >
                    <FaTrash />
                </button>
            )}
        </div>
    );
};

export default InputNewEvent;
