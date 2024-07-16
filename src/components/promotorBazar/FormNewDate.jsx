"use client"
import React from "react";
import { useForm } from "react-hook-form"
import InputNewEvent from "./InputsNewEvent";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { createDateFetch } from "@/api/bazar/routes";

function FormNewDate(props) {
    const [currentDate, setCurrentDate] = useState(''); //state para precedente de tiempo


    const { register, handleSubmit, reset } = useForm();
    const { setOpen, open , _idUser, fetchDataDates} = props;
    const [showExtraEvent, setShowExtraEvent] = useState(false); //state para monitorear si extra event es true o false

    const toggleExtraEvent = () => {
        setShowExtraEvent(!showExtraEvent);
    };


    const onSubmit = (data) => {
        console.log(`datos sin corte ${JSON.stringify(data)}`);

        const events = [
            { eventName: data.event, description:data.description,  timeEvent:data.timeEvent },
        ];
        if (data.eventExtra) {
            events.push({
                eventName: data.eventExtra,
                description: data.descriptionExtraEvent,
                timeEvent: data.timeEventExtra
            });
        }

        const dataAdjust = {  //se crea un objeto con los datos del formulario para enviarlos a la peticion fetch para actualizar usuario
            createdBy: _idUser,
            place: data.place,
            date:data.date,
            time:data.time,
            events:events,
            };
            console.log(`datos con corte ${JSON.stringify(dataAdjust)}`)
            createDateFetch(dataAdjust)
            fetchDataDates()

        reset();
    };

    

   

    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed.
        const dd = String(today.getDate()).padStart(2, '0');
    
        setCurrentDate(`${yyyy}-${mm}-${dd}`);
      }, []);





    return (
        <>
    <div className="fixed inset-0 z-50 bg-gray-600/80 w-full h-dvh backdrop-blur-md flex flex-col lg:max-w-screen-xl overflow-auto mx-auto mt-16">    
       
        <div className="bg-customGreen w-7/12 h-5/6 flex flex-col  justify-center mx-auto   max-sm:w-full">
        <button className="bg-raw-sienna-500 w-10 h-10 flex justify-center items-center rounded-2xl" onClick={() => setOpen(!open)} ><MdClose className="w-full h-full" /></button>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-form-newDate-green w-11/12 h-5/6 mx-auto rounded-lg flex flex-col items-center text-customGreen px-2 ">
                <div className=" border flex flex-col items-center w-2/3 max-sm:w-10/12 px-2">
                    <label className="text-lg text-white  " htmlFor="">Lugar</label>
                    <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="text" 
                    {...register("place")}
                    />
                </div>
                <div className=" border w-full flex px-2">
                    <div className=" border flex flex-col items-center w-1/2 mx-auto max-sm:w-10/12">
                        <label className="text-lg text-white  " htmlFor="">Fecha</label>
                        <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="date" 
                        min={currentDate}
                        {...register("date")}
                        />
                    </div>
                    <div className=" border flex flex-col items-center w-1/2 mx-auto max-sm:w-10/12 ">
                        <label className="text-lg text-white  " htmlFor="">Hora</label>
                        <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="time" 
                        {...register("time")}
                        />
                    </div>
                </div>
                <h3 className="text-2xl text-white p-1">Eventos especiales</h3>
                <div className=" border w-full flex justify-around mt-2  ">

                    <div className="flex flex-col w-3/12 text-center ">
                        <label className="text-lg text-white">Evento</label>
                        <input className="p-1 rounded-xl text-center" 
                        {...register("event")}
                         />
                        
                    </div>


                    <div className="flex flex-col w-5/12 text-center">
                        <label className="text-lg text-white">Descripcion</label>
                        <input className="p-1 rounded-xl text-center" 
                        {...register("description")}
                         />
                        
                    </div>

                    <div className="flex flex-col w-3/12 text-center">
                        <label className="text-lg text-white">Horario</label>
                        <input className="p-1 rounded-xl text-center" type="time"
                        {...register("timeEvent")}
                         />
                        
                    </div>

                </div>
                

                        {showExtraEvent && (
                            <InputNewEvent
                                register={register}
                                // event1="EventoExtra"
                                // description1="DescripcionExtra"
                                // horarioEvent1="HorarioEventoExtra"
                            />
                        )}
                        <div className=" w-full flex ml-10 mt-5">
                            <button type="button" className="bg-raw-sienna-500 rounded-lg text-sm w-2/12 h-10" onClick={toggleExtraEvent}>{showExtraEvent ? 'Ocultar' : 'Extra event'}</button>
                        </div>

                        <input className="bg-raw-sienna-500 rounded-xl text-xl w-2/12 h-10" type="submit" value="Enviar" />
            </form>
                </div>
            </div>
        </>
    )
}

export default FormNewDate;