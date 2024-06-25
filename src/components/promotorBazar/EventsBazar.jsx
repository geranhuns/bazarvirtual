import React from "react";
import CardEvent from "./CardEvent";

function EventBazar(){
    return(
        <>
        <section className="w-full h-65vh  flex justify-center items-center  ">

            <div className="bg-customBlue rounded-3xl w-10/12 h-5/6 flex flex-row items-center justify-around max-md:w-11/12 max-md:flex-col">
                <CardEvent/>
                <CardEvent/>
                
            </div>

        </section>
        </>
    )
}

export default EventBazar;