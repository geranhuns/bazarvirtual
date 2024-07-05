import React from "react";
import CardEvent from "./CardEvent";

function EventBazar() {
    return (
        <>
            <section className="w-full py-2  flex justify-center items-center  ">

                <div className="bg-patina-900 rounded-md pb-10 px-5 w-10/12 h-5/6 flex flex-col items-center justify-around md:flex-row">
                    <CardEvent />
                    <CardEvent />

                </div>

            </section>
        </>
    )
}

export default EventBazar;