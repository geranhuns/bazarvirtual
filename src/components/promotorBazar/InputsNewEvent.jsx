import React from "react";
import { useForm } from "react-hook-form"

function InputNewEvent(props){
    const{register, event1, description1, horarioEvent1} = props;
 

    return(
        <>
        <div className=" w-full flex justify-around   ">

            <div className="flex flex-col justify-center w-3/12 text-center ">
                <label htmlFor="">Evento</label>
                <input type="text rounded-lg" {...register(event1)} />
            </div>


            <div className="flex flex-col w-5/12 text-center">
                <label htmlFor="">Descripcion</label>
                <input type="text rounded-lg" {...register(description1)} />
            </div>

            <div className="flex flex-col w-3/12 text-center">
                <label htmlFor="">Horario</label>
                <input type="text rounded-lg" {...register(horarioEvent1)} />
            </div>

        </div>
        </>
    )
}

export default InputNewEvent;