'use client';
import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import CardEvent from "@/components/promotorBazar/CardEvent";
import FormNewDate from "@/components/promotorBazar/FormNewDate";
import CardEventDetail from "@/components/promotorBazar/CardEventDetail";
import { useState } from 'react'

function PromotorVista(){

    const [open, setOpen] = useState(false)

    
    return(
        <>
        
        <main className="relative bg-raw-sienna-200 w-full min-h-screen flex flex-col ">
        {open && <FormNewDate open={open} setOpen={setOpen} />}
            <section className="w-full h-95vh  flex justify-center items-center mt-16 ">
                <div className="bg-raw-sienna-500  w-10/12 h-5/6 flex flex-row items-center justify-center">

                    <div className=" w-4/12 h-full flex justify-start ">
                        <div className="w-full h-5/6 bg-customGreen rounded-b-custom2 flex justify-center items-center">
                        <img className="w-12/12 h-5/6 rounded-custom2" src="https://cdn.leonardo.ai/users/be6f4fcf-f918-450f-a54b-b46b96cd9cd4/generations/c77dc036-fe62-4dde-89a4-9d78dd29bf30/Default_bazaar_sea_logo_2.jpg?w=512" alt="" />
                        </div>
                        
                    </div>

                    <div className=" text-Eggshell w-7/12 h-5/6 flex flex-col justify-between items-center">
                        
                        <div className="bg-customGreen rounded-3xl w-9/12 h-4/6 flex flex-col justify-center items-center gap-y-14">
                            <h2 className="  w-4/6 h-1/6 text-4xl font-medium  text-center ">Sea Bazaar</h2>
                            <div className=" w-11/12 h-1/6 text-xl font-medium flex justify-between">
                                <span>www.SeaBazar_413.com</span>
                                <span>613-174-8973</span>
                            </div>
                            <div className=" w-3/6 h-1/6 flex justify-center gap-x-4">
                            <FaFacebook className="w-10 h-11 rounded-custom2 text-facebook bg-white" />
                            <FaInstagramSquare className="w-10 h-11 rounded-custom2  bg-instagram-gradient" />
                            <AiFillTikTok className="w-10 h-11 rounded-custom2 text-black bg-tiktok-gradient" />
                            
                            </div>
                        </div>

                        <div className="bg-KombuGreen rounded-3xl w-full h-1/6 flex  items-center text-black gap-2">
                            {/* <CardEventDetail/> */}
                            <button className="bg-raw-sienna-500 w-9 h-10 rounded-xl ml-4 " onClick={() => setOpen(!open)} ><CiSquarePlus className="w-full h-full text-white" /></button>
                        </div>
                    </div>
                </div>


            </section>
            {/* <Carrucel></Carrucel>
            <EventBazar/> */}
            
        </main>

        </>
    )
}

export default PromotorVista;