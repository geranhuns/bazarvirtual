import React from "react";
import { SiPinboard } from "react-icons/si";
import { IoIosTime } from "react-icons/io";
import { BsStars } from "react-icons/bs";

function CardEvent() {
    return (
        <>
            <div className="bg-raw-sienna-500 w-5/12 h-3/6 rounded-lg flex items-center justify-center max-md:h-2/6 max-md:w-7/12 max-sm:w-11/12  mt-10">
                <div className=" w-3/12  flex justify-center">
                    <SiPinboard className="  text-white text-4xl" />
                </div>
                <div className=" w-8/12 h-full flex flex-col items-center justify-around text-center   max-sm:w-9/12">
                    <span className="text-2xl font-semibold flex justify-around items-center max-md:text-lg"><BsStars className="text-white" />Música en vivo</span>
                    <span className="text-xl font-medium max-md:text-sm">Enjoy performances by top artists.</span>
                    <span className="text-xl font-medium flex justify-around items-center max-md:text-sm"><IoIosTime className="text-white" />11:00 AM </span>


                </div>
                <div className=" w-3/12 h-full">
                </div>
            </div>
        </>
    )
}

export default CardEvent;