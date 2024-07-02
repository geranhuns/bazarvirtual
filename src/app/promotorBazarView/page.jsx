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

            <section className="relative bg-raw-sienna-200  min-h-screen flex flex-col lg:max-w-screen-xl overflow-auto mx-auto ">
                {open && <FormNewDate open={open} setOpen={setOpen} />}
                {/* {open && <FormNewDate dataHere={dataFormulario} open={open} setOpen={setOpen} />} */}
               
                    <div className="bg-raw-sienna-500  w-10/12 flex  items-center justify-around  p-10 mx-auto max-md:flex-col max-sm:w-11/12 ">

                        <div className=" w-4/12 mb-1 h-full flex justify-center   max-md:w-5/12 max-sm:w-6/12 ">
                            
                                <img className=" rounded-custom2 w-full h-full" src="https://cdn.leonardo.ai/users/be6f4fcf-f918-450f-a54b-b46b96cd9cd4/generations/c77dc036-fe62-4dde-89a4-9d78dd29bf30/Default_bazaar_sea_logo_2.jpg?w=512" alt="" />
                            

                        </div>

                        <div className=" text-Eggshell w-7/12 h-5/6  flex flex-col justify-between items-center max-md:w-11/12 max-sm:w-full">

                            <div className="bg-patina-900 rounded-xl w-9/12 h-4/6 flex flex-col justify-center items-center  mb-10 max-md:w-11/12 max-sm:w-full">
                                <h2 className=" text-xl md:text-4xl pt-4 font-medium  text-center ">Sea Bazaar</h2>
                                <div className="text-sm font-medium flex flex-col justify-center items-center ">
                                    <span>www.SeaBazar_413.com</span>
                                    <span>613-174-8973</span>
                                </div>
                                <div className="  flex justify-center gap-x-4 mb-5">
                                    <FaFacebook className="w-10 h-11 rounded-custom2 text-facebook bg-white max-sm:w-auto" />
                                    <FaInstagramSquare className="w-10 h-11 rounded-custom2  bg-instagram-gradient max-sm:w-auto" />
                                    <AiFillTikTok className="w-10 h-11 rounded-custom2 text-black bg-tiktok-gradient max-sm:w-auto " />

                                </div>
                            </div>

                            <div className="bg-avocado-500 rounded-md w-full flex text-center items-center text-black gap-2 max-md:h-1/6 p-3">
                                <CardEventDetail />
                                <CardEventDetail />
                                <CardEventDetail />
                                    {/* {allFormData.map((event, index) => (
                            
                                        <CardEventDetail data={event} />
                           
                                    ))} */}
                                <button className="bg-raw-sienna-500 w-1/12 h-3/6 rounded-sm flex items-center justify-center text-base font-medium " onClick={() => setOpen(!open)} ><CiSquarePlus className="text-white w-full h-full" /></button>
                            </div>
                        </div>
                    </div>

                

                <Carrucel></Carrucel>
                
                <EventBazar />

            </section>

        </>
    )
}

export default PromotorVista;