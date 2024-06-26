import React from "react";
import Link from "next/link";

function Section1Landing() {
    return (
        <>
            <section className="relative bg-landing1 bg-cover bg-center min-h-screen  w-full -z-50 ">
                <div className="  absolute inset-0 bg-fill-landing1 flex flex-col items-center justify-center max-sm:justify-start">
                    <div className=" w-9/12 h-64 max-sm:text-center max-sm:flex max-sm:flex-col max-sm:items-center max-sm:mt-20 ">
                        <h1 className="w-9/12  text-6xl max-sm:text-4xl font-semibold leading-custom tracking-wide text-raw-sienna-50">Sí, somos el punto de encuentro</h1>
                        <h3 className="w-9/12  text-5xl max-sm:text-3xl font-semibold leading-custom tracking-wide text-raw-sienna-50 ">para emprendedores mexicanos</h3>


                        <button className="bg-raw-sienna-500 rounded-3xl h-16 w-4/12 mt-4 text-raw-sienna-50 text-base font-semibold leading-custom2 tracking-wide hover:bg-white transition duration-500 hover:text-color-btnUnete max-sm:w-8/12 max-sm:h-16 ">
                            <Link href={"/home"}>Explorar más</Link>
                        </button>

                    </div>
                </div>
            </section>
        </>
    )
}

export default Section1Landing;