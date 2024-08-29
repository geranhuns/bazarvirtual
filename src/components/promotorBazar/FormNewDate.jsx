"use client"
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";

import Swal from 'sweetalert2';
import { createDateFetch, updateDateFetch, dateById, cancelDate } from "@/api/bazar/routes";

function FormNewDate(props) {
    const { setOpen, open, _idUser, fetchDataDates, datesBazar, openEdDate, setOpenEdDate, idDate, updateSelectDate } = props;
    const [currentDate, setCurrentDate] = useState('');
    const [dateCount, setDateCount] = useState(0);
    const [dataDate, setDataDate] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [extraEvents, setExtraEvents] = useState([]);

    const addEvent = () => setExtraEvents([...extraEvents, { eventName: "", description: "", timeEvent: "" }]);

    const removeExtraEvent = (index) => {
        const updatedEvents = extraEvents.filter((_, i) => i !== index);
        setExtraEvents(updatedEvents);
    };

    const handleEventChange = (e, index) => {
        const { name, value } = e.target;
        const updatedEvents = [...extraEvents];
        updatedEvents[index][name] = value;
        setExtraEvents(updatedEvents);
    };

    const dataFecha = async (id) => {
        try {
            const dateData = await dateById(id);
            setDataDate(dateData.data);
        } catch (error) {
            console.error('Error al obtener datos de la fecha:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const obtenerFechaFormateada = (fechaCompleta) => {
        return fechaCompleta ? fechaCompleta.split('T')[0] : '';
    };

    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setCurrentDate(today);
        setDateCount(datesBazar.length);

        if (openEdDate) {
            dataFecha(idDate);
        }
    }, [datesBazar, openEdDate, idDate]);

    const onSubmit = async (data) => {
        const events = [
            { eventName: data.event, description: data.description, timeEvent: data.timeEvent },
            ...extraEvents
        ];

        const dataAdjust = {
            createdBy: _idUser,
            place: data.place.trim(),
            date: data.date,
            time: data.time,
            events: events.filter(event => event.eventName || event.description || event.timeEvent),
        };

        try {
            if (openEdDate) {
                await updateDateFetch(idDate, dataAdjust);
                await fetchDataDates();
                updateSelectDate([]);
            } else if (dateCount < 3) {
                await createDateFetch(dataAdjust);
                await fetchDataDates();
                setDateCount(dateCount + 1);
            } else {
                Swal.fire({
                    title: "¡Alcanzaste el número máximo de fechas!",
                    text: "Espera a que culmine la fecha más próxima o elimina alguna.",
                    icon: "warning",
                });
            }
            reset();
            setOpenEdDate(false);
            setOpen(false);
        } catch (error) {
            console.error("Error al gestionar la fecha:", error);
        }
    };

    const handleDeleteDate = async () => {
        await cancelDate(idDate);
        fetchDataDates();
        setOpenEdDate(false);
    };

    if (openEdDate && isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="fixed inset-0 z-50 bg-gray-600/80 w-full h-dvh backdrop-blur-md flex flex-col lg:max-w-screen-xl overflow-auto mx-auto mt-16">
            <div className="bg-customGreen w-7/12 mt-8 flex flex-col mx-auto max-sm:w-full rounded-sm">
                <button className="bg-raw-sienna-500 flex justify-center self-start rounded-full mt-2 ml-2" onClick={() => { setOpen(false); setOpenEdDate(false); }}>
                    <MdClose className="text-2xl w-8 h-8" />
                </button>
                <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 h-5/6 mx-auto rounded-sm flex flex-col items-center text-customGreen px-2 pb-10">
                    <div className="flex flex-col items-center w-2/3 max-sm:w-10/12 px-2">
                        <h3 className="text-2xl text-white p-1">{openEdDate ? "Editar fecha de bazar" : "Nueva fecha de bazar"}</h3>
                        <label className="text-lg text-white">Lugar</label>
                        <input
                            className="w-11/12 p-1 rounded-sm text-center max-sm:w-full"
                            type="text"
                            defaultValue={dataDate.place || ''}
                            {...register("place", { required: "Este campo es requerido" })}
                        />
                        {errors.place && <label className="text-red-700 text-xs">{errors.place.message}</label>}
                    </div>

                    <div className="w-full flex px-2">
                        <div className="flex flex-col items-center w-1/2 mx-auto max-sm:w-10/12">
                            <label className="text-lg text-white">Fecha</label>
                            <input
                                className="w-11/12 p-1 rounded-sm text-center max-sm:w-full"
                                type="date"
                                min={currentDate}
                                defaultValue={obtenerFechaFormateada(dataDate.date)}
                                {...register("date", { required: "Este campo es requerido" })}
                            />
                            {errors.date && <label className="text-red-700 text-xs">{errors.date.message}</label>}
                        </div>
                        <div className="flex flex-col items-center w-1/2 mx-auto max-sm:w-10/12">
                            <label className="text-lg text-white">Hora</label>
                            <input
                                className="w-11/12 p-1 rounded-sm text-center max-sm:w-full"
                                type="time"
                                defaultValue={dataDate.time || ''}
                                {...register("time", { required: "Este campo es requerido" })}
                            />
                            {errors.time && <label className="text-red-700 text-xs">{errors.time.message}</label>}
                        </div>
                    </div>

                    <h3 className="text-2xl text-white p-1 mt-10">Eventos especiales</h3>
                    {openEdDate && dataDate.events && dataDate.events.map((event, index) => (
                        <div key={index} className="w-11/12 flex mr-auto justify-around mt-2">
                            <div className="flex flex-col w-3/12 text-center">
                                <label className="text-lg text-white">Evento</label>
                                <input
                                    className="p-1 rounded-sm text-center"
                                    defaultValue={event.eventName}
                                    {...register(`events[${index}].eventName`, { required: "Este campo es requerido" })}
                                />
                                {errors.events?.[index]?.eventName && <label className="text-red-700 text-xs">{errors.events[index].eventName.message}</label>}
                            </div>

                            <div className="flex flex-col w-5/12 text-center">
                                <label className="text-lg text-white">Descripción</label>
                                <input
                                    className="p-1 rounded-sm text-center"
                                    defaultValue={event.description}
                                    {...register(`events[${index}].description`, { required: "Este campo es requerido" })}
                                />
                                {errors.events?.[index]?.description && <label className="text-red-700 text-xs">{errors.events[index].description.message}</label>}
                            </div>

                            <div className="flex flex-col w-3/12 text-center">
                                <label className="text-lg text-white">Horario</label>
                                <input
                                    className="p-1 rounded-sm text-center"
                                    type="time"
                                    defaultValue={event.timeEvent}
                                    {...register(`events[${index}].timeEvent`, { required: "Este campo es requerido" })}
                                />
                                {errors.events?.[index]?.timeEvent && <label className="text-red-700 text-xs">{errors.events[index].timeEvent.message}</label>}
                            </div>
                        </div>
                    ))}

                    {extraEvents.map((event, index) => (
                        <div key={index} className="w-11/12 flex mr-auto justify-around mt-2">
                            <div className="flex flex-col w-3/12 text-center">
                                <label className="text-lg text-white">Evento</label>
                                <input
                                    className="p-1 rounded-sm text-center"
                                    name="eventName"
                                    value={event.eventName}
                                    onChange={(e) => handleEventChange(e, index)}
                                />
                            </div>

                            <div className="flex flex-col w-5/12 text-center">
                                <label className="text-lg text-white">Descripción</label>
                                <input
                                    className="p-1 rounded-sm text-center"
                                    name="description"
                                    value={event.description}
                                    onChange={(e) => handleEventChange(e, index)}
                                />
                            </div>

                            <div className="flex flex-col w-3/12 text-center">
                                <label className="text-lg text-white">Horario</label>
                                <input
                                    className="p-1 rounded-sm text-center"
                                    type="time"
                                    name="timeEvent"
                                    value={event.timeEvent}
                                    onChange={(e) => handleEventChange(e, index)}
                                />
                            </div>

                            <button
                                className=" text-2xl rounded-full self-center"
                                onClick={() => removeExtraEvent(index)}
                            >
                                <FaTrash />
                            </button>
                        </div>
                    ))}

                    <button
                        className="bg-raw-sienna-500 text-white mt-2 p-1 rounded-md w-3/12 mx-auto"
                        type="button"
                        onClick={addEvent}
                    >
                        Agregar evento
                    </button>

                    <div className="mt-10 flex justify-around w-full">
                        <button className="bg-raw-sienna-500 text-white text-lg rounded-md p-1 w-3/12" type="submit">
                            {openEdDate ? "Guardar cambios" : "Guardar fecha"}
                        </button>
                        {openEdDate && (
                            <button className="bg-raw-sienna-500 text-white text-lg rounded-md p-1 w-3/12" type="button" onClick={handleDeleteDate}>
                                Cancelar evento
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FormNewDate;
