import React from "react";

function Section5Landing({ id }) {
    return (
        <>
            <section id={id} className="w-full h-full lg:max-w-screen-xl mx-auto  px-8 pt-20  flex justify-center items-center mt-96 md:mt-0">
                <div className=" w-full rounded-xl h-96 md:bg-custom1 bg-safePlatform bg-cover bg-center flex justify-start items-center  ">
                    <div className=" w-6/12   text-customGreen flex flex-col gap-6 max-sm:gap-5 pl-6 ">
                        <h2 className="text-40px  font-semibold leading-9 md:leading-custom3 mt-4 md:mt-0 max-sm:text-2xl max-sm:text-start">¡Plataforma segura con soporte continuo!</h2>
                        <p className="text-2xl font-normal leading-7  max-sm:text-xl mt-4">
                            Una experiencia fenomenal para todos los usuarios.
                        </p>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Section5Landing;