import React from "react";

function CardMarcas({profile, nameMarca}) {

    return (
        <>
            {/* <div className=" bg-raw-sienna-custom rounded-2xl w-80 h-80  flex flex-col items-center justify-center   mx-auto px-1"> */}
            <div className=" bg-raw-sienna-custom rounded-2xl w-72 h-72  flex flex-col items-center justify-center my-4 mx-auto px-1">
                {/* <img className="w-1/2 h-1/2 rounded-3xl" src={profile} alt="" /> */}
                <img className="w-1/2 h-1/2 rounded-3xl" src={profile} alt="" />
                <h3 className="text-2xl font-medium text-white">{nameMarca}</h3>
            </div>
        </>
    )
}

export default CardMarcas;