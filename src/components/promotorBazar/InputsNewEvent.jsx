import React from "react";
import { useForm } from "react-hook-form"

function InputNewEvent(props){
    const{register, eventName, description, timeEvent} = props;
 

    return(
        <>
        <div className=" border w-full flex justify-around mt-2  ">

                <div className="flex flex-col w-3/12 text-center ">
                    <label className="text-lg text-white">Evento</label>
                    <input className="p-1 rounded-xl text-center" 
                    defaultValue={eventName? eventName : ''}
                     {...register("eventExtra")}
                     />
                   
                </div>


                <div className="flex flex-col w-5/12 text-center">
                    <label className="text-lg text-white">Descripcion</label>
                    <input className="p-1 rounded-xl text-center"
                    defaultValue={description? description : ''}
                     {...register("descriptionExtraEvent")}
                      />
                </div>

                <div className="flex flex-col w-3/12 text-center">
                    <label className="text-lg text-white">Horario</label>
                    <input className="p-1 rounded-xl text-center" type="time" 
                    defaultValue={timeEvent? timeEvent : ''}
                     {...register("timeEventExtra")}
                    />
                </div>

        </div>

        </>
    )
}

export default InputNewEvent;