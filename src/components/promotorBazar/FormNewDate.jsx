"use client"
import React from "react";
import { useForm } from "react-hook-form"
import InputNewEvent from "./InputsNewEvent";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";
import { createDateFetch } from "@/api/bazar/routes";
import { updateDateFetch } from "@/api/bazar/routes";
import { dateById } from "@/api/bazar/routes";

import Swal from 'sweetalert2'

function FormNewDate(props) {
    const {setOpen, open , _idUser, fetchDataDates, datesBazar, openEdDate, setOpenEdDate, idDate,updateSelectDate} = props;
    const [currentDate, setCurrentDate] = useState(''); //state para precedente de tiempo
    const [showExtraEvent, setShowExtraEvent] = useState(false); //state para monitorear si extra event es true o false
    const [dateCount, setDateCount]= useState(0) //estado que almacena el numero de fechas que hay en curso
    const[dataDate, setDataDate]=useState({}) //estado qu almacena los datos de la fecha  editar, se llena cuando se hace el fetch
    const [isLoading, setIsLoading] = useState(true);
    const {register, handleSubmit, reset } = useForm();
    
    const toggleExtraEvent = () => {
        setShowExtraEvent(!showExtraEvent);
    };

    const dataFecha = async (id) => {
        try {
          const dateData = await dateById(id);
          setDataDate(dateData.data);
         
        } catch (error) {
          console.error('Error al obtener datos de la fecha:', error);
        }finally {
            setIsLoading(false);
          }
      };

      const obtenerFechaFormateada = (fechaCompleta) => {
        // Extrae la parte de la fecha 'yyyy-MM-dd' de la cadena 'yyyy-MM-ddTHH:mm:ss.sssZ'
        return fechaCompleta ? fechaCompleta.split('T')[0] : '';
      };
    
    useEffect(() => {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed.
        const dd = String(today.getDate()).padStart(2, '0');
    
        setCurrentDate(`${yyyy}-${mm}-${dd}`);
        setDateCount(datesBazar.length)
        console.log(`fechas posteadas al cargar el form:${datesBazar.length} `)
        
        openEdDate? dataFecha(idDate) : console.log("no se detecto el ID de la fecha"); //si el form se abrio con boton editar se hace el fetch para traer los datos de la fecha
        
        }, []);

        console.log(dateCount)
    
    

        useEffect(() => {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
    
            setCurrentDate(`${yyyy}-${mm}-${dd}`);
            setDataDate(datesBazar.length); // Actualiza dataDate con la longitud de datesBazar
            console.log(`Fechas posteadas al cargar el formulario: ${datesBazar.length}`);
    
            if (openEdDate) {
                dataFecha(idDate);
            } else {
                console.log("No se detectó el ID de la fecha");
            }
        }, [datesBazar, openEdDate, idDate]);
    
        useEffect(() => {
            setDateCount(datesBazar.length); // Actualiza dateCount con la longitud de datesBazar
        }, [datesBazar]);
    
        const onSubmit = async (data) => {
            console.log(data)
            const events = [
                { eventName: data.event, description: data.description, timeEvent: data.timeEvent },
            ];
    
            if (data.eventExtra) {
                events.push({
                    eventName: data.eventExtra,
                    description: data.descriptionExtraEvent,
                    timeEvent: data.timeEventExtra
                });
            }
    
            const dataAdjust = {
                createdBy: _idUser,
                place: data.place,
                date: data.date,
                time: data.time,
                events: events,
            };
            console.log(dataAdjust)
    
            if (!openEdDate && dateCount < 3) {
                try {
                    await createDateFetch(dataAdjust);
                    await fetchDataDates();
                    setDateCount(dateCount + 1); // Incrementa dateCount después de crear la fecha con éxito
                } catch (error) {
                    console.error("Error al crear fecha:", error);
                }
            } else if (!openEdDate && dateCount >= 3) {
                Swal.fire({
                    title: "Alcanzaste el número máximo de fechas!",
                    text: "Espera a que culmine la fecha más próxima o elimina alguna.",
                    icon: "warning",
                });
            }else if (openEdDate) {
                console.log("Data para editar:", dataAdjust);
                console.log("ID de la fecha:", idDate);
               await updateDateFetch(idDate,dataAdjust)
                await dataFecha(idDate)
               await fetchDataDates();
               updateSelectDate([])
            }
    
            reset();
        };


       if(openEdDate) {
        if (isLoading) {
   
            return <div>Loading...</div>;
            //colocar alert
          }
       }
        
    

    return (
        <>
    <div className="fixed inset-0 z-50 bg-gray-600/80 w-full h-dvh backdrop-blur-md flex flex-col lg:max-w-screen-xl overflow-auto mx-auto mt-16">    
       
        <div className="bg-customGreen w-7/12 h-5/6 flex flex-col  justify-center mx-auto   max-sm:w-full">
        <button className="bg-raw-sienna-500 w-10 h-10 flex justify-center items-center rounded-2xl" onClick={() =>{ setOpen(false) , setOpenEdDate(false)}} ><MdClose className="w-full h-full" /></button>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-form-newDate-green w-11/12 h-5/6 mx-auto rounded-lg flex flex-col items-center text-customGreen px-2 ">
                <div className=" border flex flex-col items-center w-2/3 max-sm:w-10/12 px-2">
                    <label className="text-lg text-white  " htmlFor="">Lugar</label>
                    <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="text" 
                    defaultValue={dataDate? dataDate.place : ''}
                    {...register("place")}
                    />
                </div>
                <div className=" border w-full flex px-2">
                    <div className=" border flex flex-col items-center w-1/2 mx-auto max-sm:w-10/12">
                        <label className="text-lg text-white  " htmlFor="">Fecha</label>
                        <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="date" 
                        min={currentDate}
                        defaultValue={dataDate? obtenerFechaFormateada(dataDate.date)  : ''}
                        {...register("date")}
                        />
                    </div>
                    <div className=" border flex flex-col items-center w-1/2 mx-auto max-sm:w-10/12 ">
                        <label className="text-lg text-white  " htmlFor="">Hora</label>
                        <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="time" 
                        defaultValue={dataDate? dataDate.time : ''}
                        {...register("time")}
                        />
                    </div>
                </div>
        
                <h3 className="text-2xl text-white p-1">Eventos especiales</h3>
                <div className=" border w-full flex justify-around mt-2  ">
       
                    <div className="flex flex-col w-3/12 text-center ">
                        <label className="text-lg text-white">Evento</label>
                        <input className="p-1 rounded-xl text-center" 
                        defaultValue={dataDate.events? dataDate.events[0].eventName : ''}
                        {...register("event")}
                         />
                        
                    </div>


                    <div className="flex flex-col w-5/12 text-center">
                        <label className="text-lg text-white">Descripcion</label>
                        <input className="p-1 rounded-xl text-center" 
                        defaultValue={dataDate.events? dataDate.events[0].description : ''}
                        {...register("description")}
                         />
                        
                    </div>

                    <div className="flex flex-col w-3/12 text-center">
                        <label className="text-lg text-white">Horario</label>
                        <input className="p-1 rounded-xl text-center" type="time"
                        defaultValue={dataDate.events? dataDate.events[0].timeEvent : ''}
                        {...register("timeEvent")}
                         />
                        
                    </div>
                    

                </div>

             
           
                {dataDate.events && dataDate.events.length >= 2 && (
                    <InputNewEvent register={register}
                     eventName={dataDate.events[1].eventName}
                     description={dataDate.events[1].description}
                     timeEvent={dataDate.events[1].timeEvent}
                    />
                )}

                {showExtraEvent && (
                    <InputNewEvent register={register}/>
                )}
                        <div className=" w-full flex ml-10 mt-5" >
                            <button hidden={openEdDate} type="button" className="bg-raw-sienna-500 rounded-lg text-sm w-2/12 h-10" onClick={toggleExtraEvent}>{showExtraEvent ? 'Ocultar' : 'Extra event'}</button>
                        </div>

                        <input className="bg-raw-sienna-500 rounded-xl text-xl w-2/12 h-10" type="submit" value="Enviar" />
            </form>
                </div>
            </div>
        </>
    )
}

export default FormNewDate;