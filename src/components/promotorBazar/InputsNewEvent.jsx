import React from "react";
import { useForm } from "react-hook-form";

function InputNewEvent({
    register,
    eventName,
    description,
    timeEvent,
    errors,
    openEdDate,
    index,
    onChange
}) {

    return (
        <div className="w-11/12 flex justify-around mt-2">
            <div className="flex flex-col w-3/12 text-center">
                <label className="text-lg text-white">Evento</label>
                <input
                    className="p-1 rounded-sm text-center"
                    name={`eventName_${index}`}
                    value={eventName}
                    {...register(`eventExtra_${index}`, {
                        required: !openEdDate && "Este campo es requerido",
                    })}
                    onChange={(e) => onChange(e, index)}
                />
                {errors[`eventExtra_${index}`] && (
                    <label className="text-red-700 text-xs">
                        {errors[`eventExtra_${index}`]?.message}
                    </label>
                )}
            </div>

            <div className="flex flex-col w-5/12 text-center">
                <label className="text-lg text-white">Descripción</label>
                <input
                    className="p-1 rounded-sm text-center"
                    name={`description_${index}`}
                    value={description}
                    {...register(`descriptionExtraEvent_${index}`, {
                        required: !openEdDate && "Este campo es requerido",
                    })}
                    onChange={(e) => onChange(e, index)}
                />
                {errors[`descriptionExtraEvent_${index}`] && (
                    <label className="text-red-700 text-xs">
                        {errors[`descriptionExtraEvent_${index}`]?.message}
                    </label>
                )}
            </div>

            <div className="flex flex-col w-3/12 text-center">
                <label className="text-lg text-white">Horario</label>
                <input
                    className="p-1 rounded-sm text-center"
                    type="time"
                    name={`timeEvent_${index}`}
                    value={timeEvent}
                    {...register(`timeEventExtra_${index}`, {
                        required: !openEdDate && "Este campo es requerido",
                    })}
                    onChange={(e) => onChange(e, index)}
                />
                {errors[`timeEventExtra_${index}`] && (
                    <label className="text-red-700 text-xs">
                        {errors[`timeEventExtra_${index}`]?.message}
                    </label>
                )}
            </div>
        </div>
    );
}

export default InputNewEvent;
