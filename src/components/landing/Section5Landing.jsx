import React from "react";

function Section5Landing() {
    return (
        <>
            <section className="w-full lg:max-w-screen-xl mx-auto  px-8 py-20  flex justify-center items-center">
                <div className=" w-9/12 rounded-3xl h-custom1 bg-safePlatform bg-cover bg-center flex justify-start items-center max-sm:items-start ">
                    <div className=" w-6/12 h-3/6  text-customGreen flex flex-col gap-10 max-sm:gap-5">
                        <h2 className="text-custom1 text-center font-semibold leading-custom3 mt-4 max-sm:text-3xl max-sm:text-start">¡Plataforma segura con soporte continuo!</h2>
                        <p className="text-2xl font-normal leading-9 text-center max-sm:text-xl ">
                            Una experiencia fenomenal para todos los usuarios.
                        </p>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Section5Landing;