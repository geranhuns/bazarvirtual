'use client';
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { CiSquarePlus } from "react-icons/ci";
import Carrucel from "@/components/promotorBazar/Carrucel";
import EventBazar from "@/components/promotorBazar/EventsBazar";
import FormNewDate from "@/components/promotorBazar/FormNewDate";
import CardEventDetail from "@/components/promotorBazar/CardEventDetail";
import { useState, useEffect } from "react";

function PromotorVista() {

    const [open, setOpen] = useState(false)

    // const [allFormData, setAllFormData] = useState([]);


    // const dataFormulario = (data) => {
    //     setAllFormData(prevData => [...prevData, data]);
    //     console.log('Datos acumulados:', allFormData);
    //   };

    // useEffect(() => {
    //     // Este efecto se ejecuta cada vez que formData cambia
    //     // console.log('formData ha cambiado:', allFormData);

    //     const filteredData = allFormData.filter(data =>
    //         Object.keys(data).length > 0 && Object.values(data).every(value => value.trim() !== '')
    //       );

    //       if (filteredData.length !== allFormData.length) {
    //         setAllFormData(filteredData);
    //       }

    //       console.log('formData ha cambiado:', allFormData);

    //   }, [allFormData]);





    return (
        <>

            <main className="flex flex-col    mx-auto  lg:max-w-7xl overflow-auto  ">
                {open && <FormNewDate open={open} setOpen={setOpen} />}
                {/* {open && <FormNewDate dataHere={dataFormulario} open={open} setOpen={setOpen} />} */}
                <section className="w-full   flex justify-around items-center  my-2 ">
                    <div className="bg-raw-sienna-400  w-10/12 flex flex-row items-center justify-around max-md:w-full max-sm:flex-col  p-10 ">

                        <div className=" w-4/12 h-full flex justify-start  max-md:w-4/12 max-md:h-4/6  max-sm:w-10/12 max-sm:justify-center max-sm:h-2/6   ">
                            <div className="w-full   rounded-b-custom2 flex justify-center items-center max-md:h-5/6 max-md:w-12/12  max-sm:h-full max-sm:w-6/12">
                                <img className=" rounded-custom2 mb-5 md:mb-0 max-md:h-4/6 max-md:w-11/12  " src="https://cdn.leonardo.ai/users/be6f4fcf-f918-450f-a54b-b46b96cd9cd4/generations/c77dc036-fe62-4dde-89a4-9d78dd29bf30/Default_bazaar_sea_logo_2.jpg?w=512" alt="" />
                            </div>

                        </div>

                        <div className=" text-Eggshell w-7/12 h-5/6 flex flex-col justify-between items-center max-md:justify-around max-sm:w-11/12">

                            <div className="bg-patina-900 rounded-xl w-9/12 h-4/6 flex flex-col justify-center items-center  mb-10">
                                <h2 className=" text-xl md:text-4xl pt-4 font-medium  text-center ">Sea Bazaar</h2>
                                <div className="text-sm font-medium flex flex-col justify-center items-center ">
                                    <span>www.SeaBazar_413.com</span>
                                    <span>613-174-8973</span>
                                </div>
                                <div className="  flex justify-center gap-x-4 mb-5">
                                    <FaFacebook className="w-10 h-11 rounded-custom2 text-facebook bg-white" />
                                    <FaInstagramSquare className="w-10 h-11 rounded-custom2  bg-instagram-gradient" />
                                    <AiFillTikTok className="w-10 h-11 rounded-custom2 text-black bg-tiktok-gradient" />

                                </div>
                            </div>

                            <div className="bg-avocado-500 rounded-md w-full flex text-center items-center justify-between text-black gap-2 max-md:h-1/6 p-4">
                                <CardEventDetail />
                                <CardEventDetail />
                                <CardEventDetail />
                                {/* {allFormData.map((event, index) => (
                            
                                <CardEventDetail data={event} />
                           
                        ))} */}
                                <button className="bg-raw-sienna-500 w-auto h-full rounded-sm  " onClick={() => setOpen(!open)} ><CiSquarePlus className="w-8 h-full text-white" /></button>
                            </div>
                        </div>
                    </div>

                </section>
                <Carrucel></Carrucel>
                <EventBazar />

            </main>

        </>
    )
}

export default PromotorVista;