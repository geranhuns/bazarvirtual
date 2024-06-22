import React from "react";

function CardEventDetail(){
    return(
        <>
        <span className="flex flex-row w-3/12 h-3/6 bg-raw-sienna-200 items-center justify-around ml-2 rounded-xl ">
                <h5>05-jul</h5>
                <button className="bg-raw-sienna-500 w-3/12 h-4/6 rounded-xl flex items-center justify-center text-lg font-medium"><FaRegEdit className="w-5/6 h-5/6" /></button>
        </span>
        </>
    )
}

export default CardEventDetail;