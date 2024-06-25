import React from "react";
import { FaRegEdit } from "react-icons/fa";

function CardEventDetail({data}){
    // const {Horario} = data;
    return(
        <>
        <span className="flex flex-row w-3/12 h-3/6 bg-raw-sienna-200 items-center justify-around ml-2 rounded-xl max-md:text-sm max-md:h-2/6  ">
                <h5>09:30 am</h5>
                {/* <h5>{Horario}</h5> */}
                <button className="bg-raw-sienna-500 w-3/12 h-4/6 rounded-xl flex items-center justify-center text-lg font-medium max-custom:text-sm "><FaRegEdit className="w-5/6 h-5/6" /></button>
        </span>
        </>
    )
}

export default CardEventDetail;