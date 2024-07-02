import React from "react";
import CardEvent from "./CardEvent";

function EventBazar() {
    return (
        <>
            <section className="flex w-11/12 my-auto  py-8 lg:max-w-screen-xl overflow-auto mx-auto  ">

                <div className="bg-patina-900 gap-2 rounded-md py-10 mx-auto  w-10/12 h-5/6 flex flex-row items-center justify-around  max-md:w-11/12 max-md:flex-col max-sm:w-11/12">
                    <CardEvent />
                    <CardEvent />

                </div>

            </section>
        </>
    )
}

export default EventBazar;