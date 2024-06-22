"use client"
import React from "react";
import { useForm } from "react-hook-form"
import InputNewEvent from "./InputsNewEvent";
import { MdClose } from "react-icons/md";
import { useState } from "react";

function FormNewDate(props){
    const{setOpen, open} = props;
    const { register, handleSubmit,  reset} = useForm();
    const onSubmit = data => {
        console.log(data); 
        reset(); 
      };

    const [showExtraEvent, setShowExtraEvent] = useState(false);
    const toggleExtraEvent = () => {
        setShowExtraEvent(!showExtraEvent);
      };

     
  
    return(
        <>
    <div className="fixed inset-0 z-50 bg-gray-600/80 w-full h-dvh backdrop-blur-md flex- flex-col mt-16">    
        
        <div className="bg-customGreen fixed w-7/12 h-5/6 flex flex-col items-center justify-center left-20  ">
        <button className=" w-10 h-10 flex justify-center items-center rounded-2xl" onClick={() => setOpen(!open)} ><MdClose className="w-full h-full" /></button>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-form-newDate-green w-11/12 h-5/6 flex flex-col items-center text-customGreen text-2xl ">
                <label htmlFor="">Lugar</label>
                <input type="text" {...register("Lugar")} />

                <label htmlFor="">fecha</label>
                <input  type="text" {...register("Fecha")} />

                <label htmlFor="">Horario</label>
                <input type="text" {...register("Horario")} />

                <h2>Eventos especiales?</h2>

                <div className=" w-full flex justify-around  bg-red-500 ">

                    <div className="flex flex-col justify-center w-3/12 text-center ">
                        <label htmlFor="">Evento</label>
                        <input type="text" {...register("event")} />
                    </div>


                    <div className="flex flex-col w-5/12 text-center">
                        <label htmlFor="">Descripcion</label>
                        <input type="text" {...register("description")} />
                    </div>

                    <div className="flex flex-col w-3/12 text-center">
                        <label htmlFor="">Horario</label>
                        <input type="text" {...register("horarioEvent")} />
                    </div>

                </div>

                {showExtraEvent && (
                    <InputNewEvent 
                    register={register}
                    event1="EventoExtra"
                    description1="DescripcionExtra"
                    horarioEvent1="HorarioEventoExtra"
                    />
                )}
                    <div className=" w-full flex justify-start">
                        <button className="bg-red-500 rounded-lg text-sm"  onClick={toggleExtraEvent}>{showExtraEvent ? 'Ocultar' : 'Extra event'}</button>
                    </div>
                   
                    
                

                <input className="bg-KombuGreen rounded-xl" type="submit" value="Enviar"   />
            </form>
        </div>
    </div>
        </>
    )
}

export default FormNewDate;