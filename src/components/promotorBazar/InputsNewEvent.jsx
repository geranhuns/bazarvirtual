import React from "react";
import { useForm } from "react-hook-form"

function InputNewEvent(props){
    const{register, event1, description1, horarioEvent1} = props;
 

    return(
        <>
        <div className=" w-full flex justify-around  bg-red-500 ">

            <div className="flex flex-col justify-center w-3/12 text-center ">
                <label htmlFor="">Evento</label>
                <input type="text" {...register(event1)} />
            </div>


            <div className="flex flex-col w-5/12 text-center">
                <label htmlFor="">Descripcion</label>
                <input type="text" {...register(description1)} />
            </div>

            <div className="flex flex-col w-3/12 text-center">
                <label htmlFor="">Horario</label>
                <input type="text" {...register(horarioEvent1)} />
            </div>

        </div>
        </>
    )
}

export default InputNewEvent;