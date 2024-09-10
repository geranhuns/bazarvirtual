import React, {useState} from "react";
import { MdClose } from "react-icons/md";
import InputNewEvent from "./InputsNewEvent";
import { useForm } from "react-hook-form";
import { updateEventsFetch } from "@/api/bazar/routes";

function AddEspecialEvents({openAddEspEvent, setOpenAddEspEvent,idDate, fetchDataDates}){
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [extraEvents, setExtraEvents] = useState([]);
    console.log(extraEvents)
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

    const onSubmit = async (data) => {
        const eventos = [
            { eventName: data.event, description: data.description, timeEvent: data.timeEvent },
            ...extraEvents
        ].filter(event => 
            event.eventName && event.description && event.timeEvent
        );
    
       await updateEventsFetch(idDate, eventos)
       fetchDataDates()
       reset()
   
        setOpenAddEspEvent(!openAddEspEvent)
        

     }

    return(
        <div className="fixed inset-0 z-50 bg-gray-600/80 w-full h-dvh backdrop-blur-md flex flex-col lg:max-w-screen-xl overflow-auto mx-auto mt-16">
            
            <div className="bg-customGreen w-7/12 mt-8 flex flex-col mx-auto max-sm:w-full rounded-sm">
                <button className="bg-raw-sienna-50 flex justify-center self-end rounded-full mr-2 mt-2" onClick={() => { setOpenAddEspEvent(!openAddEspEvent)}}>
                    <MdClose className="text-sm w-6 h-6 text-customGreen " />
                </button>
                <form onSubmit={handleSubmit(onSubmit)} className="w-11/12 h-5/6 mx-auto rounded-sm flex flex-col text-customGreen px-2 pb-10">
                    
                    <h3 className="text-2xl text-center text-raw-sienna-50 p-1 mt-10  ">Eventos especiales</h3>

                    {extraEvents.map((event, index) => (
                        <InputNewEvent
                            key={index}
                            eventName={event.eventName}
                            description={event.description}
                            timeEvent={event.timeEvent}
                            errors={errors.events?.[index]}
                            openAddEspEvent={openAddEspEvent}
                            index={index}
                            onChange={(e) => handleEventChange(e, index)}
                            removeExtraEvent={removeExtraEvent}
                        />
                    ))}
                    
                 
                        <button
                            className="bg-raw-sienna-500 text-raw-sienna-900 mt-2 p-1 px-3 rounded-md mx-auto"
                            type="button"
                            onClick={addEvent}
                            >
                        Agregar evento
                        </button>
                 
                    
                    
                        {extraEvents.length > 0 &&(
                                <div className="mt-10 flex justify-around w-full gap-4">
                                    <button className="bg-raw-sienna-500 text-raw-sienna-50 text-lg rounded-md p-1 px-3" type="submit">
                                        Guardar
                                    </button>
                                </div>  
                        )}
                    
                </form>
          


            </div>
        </div>
    )
}

export default AddEspecialEvents;