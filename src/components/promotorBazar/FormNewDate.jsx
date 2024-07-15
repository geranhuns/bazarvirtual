"use client"
import React from "react";
import { useForm } from "react-hook-form"
import InputNewEvent from "./InputsNewEvent";
import { MdClose } from "react-icons/md";
import { useState, useEffect } from "react";

function FormNewDate(props) {
    const [currentDate, setCurrentDate] = useState('');


    const { register, handleSubmit, reset } = useForm();

    const { setOpen, open } = props;
    


    const onSubmit = data => {
        console.log(data);
        // setFormData(data);
        reset();
    };

    const [showExtraEvent, setShowExtraEvent] = useState(false);

    const toggleExtraEvent = () => {
        setShowExtraEvent(!showExtraEvent);
    };

    const isFormDataEmpty = () => {
        return Object.keys(formData).length === 0;
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
       
        <div className="bg-customGreen fixed w-7/12 h-5/6 flex flex-col  justify-center left-20 max-sm:w-11/12 max-sm:left-1 ">
        <button className="bg-raw-sienna-500 w-10 h-10 flex justify-center items-center rounded-2xl" onClick={() => setOpen(!open)} ><MdClose className="w-full h-full" /></button>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-form-newDate-green w-11/12 h-5/6 mx-auto rounded-lg flex flex-col items-center text-customGreen px-2 ">
                <div className=" border flex flex-col items-center w-2/3 max-sm:w-10/12 px-2">
                    <label className="text-lg text-white  " htmlFor="">Lugar</label>
                    <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="text" 
                    />
                </div>
                <div className=" border w-full flex px-2">
                    <div className=" border flex flex-col items-center w-1/2 mx-auto max-sm:w-10/12">
                        <label className="text-lg text-white  " htmlFor="">Fecha</label>
                        <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="date" 
                        min={currentDate}
                        />
                    </div>
                    <div className=" border flex flex-col items-center w-1/2 max-sm:w-10/12 mx-auto px-2">
                        <label className="text-lg text-white  " htmlFor="">Hora</label>
                        <input className="w-11/12 p-1 rounded-xl text-center max-sm:w-full" type="time" 
                        />
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
                        <div className=" w-full flex ml-10 mt-5">
                            <button className="bg-raw-sienna-500 rounded-lg text-sm w-2/12 h-10" onClick={toggleExtraEvent}>{showExtraEvent ? 'Ocultar' : 'Extra event'}</button>
                        </div>




                        <input className="bg-raw-sienna-500 rounded-xl text-xl w-2/12 h-10" type="submit" value="Enviar" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default FormNewDate;