import {React, useState} from "react";
import { FaRegEdit } from "react-icons/fa";

function CardEventDetail({ events,fecha, setDataDate,setIdDate, dateID } ) {
     console.log(events)
    //  console.log(`ID del la fecha ${fecha}: ${dateID}`)
    console.log(events)
    let fechaCorta = fecha.substring(5, 10); //basicamente  extrae los caracteres del indice 5 hasta el 10, que equivalen a mes y dia

    
    return (
        <>
            <span className="flex flex-row w-3/12  bg-raw-sienna-200 items-center justify-around cursor-pointer  rounded-lg p-1" 
            // onClick={()=>console.log(dateID)}
            onClick={()=>{setDataDate(events ), setIdDate(dateID)}} 
            >
                <h5 className="text-lg font-medium">{fechaCorta}</h5>
                
                {/* <button className="w-3/12 h-5/6 rounded-2xl text-base font-medium" >
                <FaRegEdit className="w-full h-full " />
                </button> */}
            </span>
        </>
    )
}

export default CardEventDetail;