import React from "react";
import { SiPinboard } from "react-icons/si";
import { IoIosTime } from "react-icons/io";
import { BsStars } from "react-icons/bs";

function CardEvent(){
    return(
        <>
        <div className="bg-raw-sienna-500 w-5/12 h-3/6 rounded-3xl flex items-center justify-center ">
                        <div className=" w-3/12 h-full flex justify-center">
                            <SiPinboard className="  text-white w-20 h-24"/>
                        </div>
                        <div className=" w-6/12 h-full flex flex-col items-center justify-around text-center">
                            <span className="text-xl font-semibold flex justify-around items-center"><BsStars className="text-white"/>Musica en vivo</span>
                            <span className="text-base font-medium">Enjoy performances by top artists.</span>
                            <span className="text-base font-medium flex justify-around items-center"><IoIosTime className="text-white" />11:00 AM </span>


                        </div>
                        <div className=" w-3/12 h-full">
                        </div>
                    </div>
        </>
    )
}

export default CardEvent;