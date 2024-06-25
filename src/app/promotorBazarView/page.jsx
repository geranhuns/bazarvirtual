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

function PromotorVista(){

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

  


    
    return(
        <>
        
        <main className="relative bg-raw-sienna-200 w-full min-h-screen flex flex-col ">
        {open && <FormNewDate open={open} setOpen={setOpen} />}
        {/* {open && <FormNewDate dataHere={dataFormulario} open={open} setOpen={setOpen} />} */}
            <section className="w-full h-95vh  flex justify-center items-center mt-16   ">
                <div className="bg-raw-sienna-500  w-10/12 h-5/6 flex flex-row items-center justify-center max-md:w-full max-sm:flex-col  ">

                    <div className=" w-4/12 h-full flex justify-start  max-md:w-4/12 max-md:h-4/6  max-sm:w-10/12 max-sm:justify-center max-sm:h-2/6   ">
                        <div className="w-full h-5/6 bg-customGreen rounded-b-custom2 flex justify-center items-center max-md:h-5/6 max-md:w-12/12  max-sm:h-full max-sm:w-6/12">
                        <img className="w-12/12 h-5/6 rounded-custom2 max-md:h-4/6 max-md:w-11/12  " src="https://cdn.leonardo.ai/users/be6f4fcf-f918-450f-a54b-b46b96cd9cd4/generations/c77dc036-fe62-4dde-89a4-9d78dd29bf30/Default_bazaar_sea_logo_2.jpg?w=512" alt="" />
                        </div>
                        
                    </div> 

                    <div className=" text-Eggshell w-7/12 h-5/6 flex flex-col justify-between items-center max-md:justify-around max-sm:w-11/12">
                        
                        <div className="bg-customGreen rounded-3xl w-9/12 h-4/6 flex flex-col justify-center items-center gap-y-14 max-md:w-11/12  max-md:gap-y-10 max-sm:w-12/12">
                            <h2 className="  w-4/6 h-1/6 text-4xl font-medium  text-center ">Sea Bazaar</h2>
                            <div className=" w-11/12 h-1/6 text-xl font-medium flex justify-between max-md:text-lg max-md:flex-col max-md:items-center max-md:gap-y-2 max-custom:flex-col max-custom:items-center max-custom:gap-y-2 ">
                                <span>www.SeaBazar_413.com</span>
                                <span>613-174-8973</span>
                            </div>
                            <div className=" w-3/6 h-1/6 flex justify-center gap-x-4">
                            <FaFacebook className="w-10 h-11 rounded-custom2 text-facebook bg-white" />
                            <FaInstagramSquare className="w-10 h-11 rounded-custom2  bg-instagram-gradient" />
                            <AiFillTikTok className="w-10 h-11 rounded-custom2 text-black bg-tiktok-gradient" />
                            
                            </div>
                        </div>

                        <div className="bg-KombuGreen rounded-3xl w-full h-1/6 flex  items-center text-black gap-2 max-md:h-1/6 ">
                        <CardEventDetail />
                        <CardEventDetail />
                        <CardEventDetail />
                        {/* {allFormData.map((event, index) => (
                            
                                <CardEventDetail data={event} />
                           
                        ))} */}
                            <button className="bg-raw-sienna-500 w-9 h-10 rounded-xl ml-4 max-md:w-8 max-md:h-9 " onClick={() => setOpen(!open)} ><CiSquarePlus className="w-full h-full text-white" /></button>
                        </div>
                    </div>
                </div>

            </section>
            <Carrucel></Carrucel>
            <EventBazar/>
            
        </main>

        </>
    )
}

export default PromotorVista;