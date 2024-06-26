import React from "react";
import { FaRegEdit } from "react-icons/fa";

function CardEventDetail({ data }) {
    // const {Horario} = data;
    return (
        <>
            <span className="flex flex-row w-3/12 h-3/6 bg-raw-sienna-200 items-center justify-around  rounded-sm p-2 text-xs text-center  ">
                <h5>26-jun</h5>
                {/* <h5>{Horario}</h5> */}
                <button className="w-3/12 h-4/6 rounded-xl flex items-center justify-center text-lg font-medium max-custom:text-sm "><FaRegEdit className="w-5 h-full" /></button>
            </span>
        </>
    )
}

export default CardEventDetail;