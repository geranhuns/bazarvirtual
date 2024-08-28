import React from "react";
import Link from "next/link";
import Button from "../Button/Button";

function Section1Landing({ id }) {
    return (
        <>
            <section id={id} className="relative bg-landing1 bg-cover bg-center min-h-screen  w-full h-full">
                <div className="  mx-auto absolute inset-0 bg-fill-landing1 flex flex-col items-center pt-32 md:pt-52 lg:justify-center ">
                    <div className=" lg:max-w-screen-xl mx-4   md:text-start flex flex-col  mt-24 md:mt-20 space-y-10   ">
                        <h1 className=" text-4xl md:text-6xl  font-bold md:font-extrabold md:leading-[4.5rem] tracking-wide text-raw-sienna-50">Sí, somos el punto de encuentro <span>para emprendedores mexicanos</span></h1>
                        {/* <h3 className="w-9/12  text-5xl max-sm:text-2xl max-sm:w-10/12  font-semibold  tracking-wide text-raw-sienna-50 leading-10 md:leading-custom ">para emprendedores mexicanos</h3> */}


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