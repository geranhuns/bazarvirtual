import React from "react";
import Link from "next/link";
import Button from "../Button/Button";

function Section1Landing({ id }) {
    return (
        <>
            <section id={id} className="relative bg-landing1 bg-cover bg-center min-h-screen  w-full h-full">
                <div className="  mx-auto absolute inset-0 bg-fill-landing1 flex flex-col items-center pt-32 md:pt-52 lg:justify-center ">
                    <div className=" w-9/12   md:text-start flex flex-col  mt-24 md:mt-20   max-sm:gap-5 ">
                        <h1 className="w-9/12  text-6xl max-sm:text-3xl  font-semibold leading-10 md:leading-custom tracking-wide text-raw-sienna-50">Sí, somos el punto de encuentro</h1>
                        <h3 className="w-9/12  text-5xl max-sm:text-2xl max-sm:w-10/12  font-semibold  tracking-wide text-raw-sienna-50 leading-10 md:leading-custom ">para emprendedores mexicanos</h3>


                        <button className="bg-raw-sienna-500 rounded-md  h-full py-4   md:h-14 w-4/12 mt-4 text-raw-sienna-50 text-base font-semibold tracking-wide hover:bg-white transition duration-500 hover:text-color-btnUnete max-sm:w-8/12  ">
                            <Link href={"/home"} >Explorar más</Link>
                        </button>

                        {/* <Button href={"/home"} variant={"raw-sienna-500"} text={"Explorar más"} className={"bg-raw-sienna-500 rounded-md  h-full py-4   md:h-14 w-4/12 mt-4 text-raw-sienna-50 text-base font-semibold tracking-wide hover:bg-white transition duration-500 hover:text-color-btnUnete max-sm:w-8/12 z-50"} /> */}

                    </div>
                </div>
            </section>
        </>
    )
}

export default Section1Landing;