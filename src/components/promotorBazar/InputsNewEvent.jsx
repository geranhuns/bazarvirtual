import React from "react";
import { useForm } from "react-hook-form"

function InputNewEvent(props){
    const{register, eventName, description, timeEvent, errors, openEdDate} = props;
 

    return(
        <>
        <div className="  w-full flex justify-around mt-2  ">

                <div className="flex flex-col w-3/12 text-center ">
                    <label className="text-lg text-white">Evento</label>
                    <input className="p-1 rounded-xl text-center" 
                    defaultValue={eventName? eventName : ''}
                     {...register("eventExtra", {
                        required: openEdDate === false ? "Este campo es requerido" : false
                    })}
                     />
                     {errors.eventExtra && (
                        <label className="text-red-700  text-xs">
                            {errors.eventExtra.message}
                        </label>
                    )}
                </div>


                <div className="flex flex-col w-5/12 text-center">
                    <label className="text-lg text-white">Descripcion</label>
                    <input className="p-1 rounded-xl text-center"
                    defaultValue={description? description : ''}
                     {...register("descriptionExtraEvent", {
                        required: openEdDate === false ? "Este campo es requerido" : false
                    })}
                      />
                      {errors.descriptionExtraEvent && (
                        <label className="text-red-700  text-xs">
                            {errors.descriptionExtraEvent.message}
                        </label>
                    )}

                </div>

                <div className="flex flex-col w-3/12 text-center">
                    <label className="text-lg text-white">Horario</label>
                    <input className="p-1 rounded-xl text-center" type="time" 
                    defaultValue={timeEvent? timeEvent : ''}
                     {...register("timeEventExtra", {
                        required: openEdDate === false ? "Este campo es requerido" : false
                    })}
                    />
                    {errors.timeEventExtra && (
                        <label className="text-red-700  text-xs">
                            {errors.timeEventExtra.message}
                        </label>
                    )}
                    
                </div>

        </div>

        </>
    )
}

export default InputNewEvent;