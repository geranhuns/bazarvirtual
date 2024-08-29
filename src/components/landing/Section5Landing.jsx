import React from "react";

function Section5Landing({ id }) {
    return (
        <>
            <section id={id} className="lg:max-w-screen-xl mx-auto flex justify-center items-center mt-80 md:mt-10">

                <div className="rounded-xl md:bg-custom1 bg-left-bottom lg:bg-center bg-safePlatform bg-cover  flex justify-start items-center  my-20">
                    <div className="backdrop-blur md:backdrop-blur-none p-8">

                        <div className=" text-patina-900 flex flex-col gap-6 max-sm:gap-5  md:w-1/2 backdrop-blur-sm md:backdrop-blur-none">
                            <h2 className="text-3xl lg:text-5xl font-semibold  w-full ">¡Disfruta de una experiencia de compra segura y sin preocupaciones!</h2>
                            <p className="text-2xl max-sm:text-xl mt-4 ">
                                Utilizamos tecnología de encriptación SSL para proteger tus datos personales y financieros en cada transacción.
                            </p>
                            <p className="text-2xl max-sm:text-xl mt-4 ">
                                En Bazar Virtual ¡Tu información está protegida!

                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>

    )
}

export default Section5Landing;