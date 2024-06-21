'use client';
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaFacebook } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import { CiSquarePlus } from "react-icons/ci";
import CardMarcas from "@/components/promotorBazar/CardMarcas";
import CardEvent from "@/components/promotorBazar/CardEvent";

function PromotorVista(){
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };

    return(
        <>
        <main className="bg-raw-sienna-200 w-full min-h-screen flex flex-col ">
            <section className="w-full h-95vh border-2 border-red-200 flex justify-center items-center ">
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
                            <span className="flex flex-row w-3/12 h-3/6 bg-raw-sienna-200 items-center justify-around ml-2 rounded-xl ">
                                <h5>05-jul</h5>
                                <button className="bg-raw-sienna-500 w-3/12 h-4/6 rounded-xl flex items-center justify-center text-lg font-medium"><FaRegEdit className="w-5/6 h-5/6" /></button>
                            </span>
                            <button className="bg-raw-sienna-500 w-9 h-10 rounded-xl"><CiSquarePlus className="w-full h-full text-white" /></button>
                        </div>
                    </div>
                </div>


            </section>
            <section className="w-full h-65vh bg-customBlue flex flex-col items-center ">
                <h2 className="font-medium text-4xl text-white">Marcas en curso</h2>
                <div className=" relative slider-container flex justify-center w-11/12 h-5/6">
                    <Slider {...settings} className=" absolute w-11/12 h-full flex justify-center items-center  ">
                        <CardMarcas/>
                        <CardMarcas/>
                        <CardMarcas/>
        
                    </Slider>
            </div>

            </section>

            <section className="w-full h-65vh  flex justify-center items-center  ">

                <div className="bg-customBlue rounded-3xl w-10/12 h-5/6 flex flex-row items-center justify-around">
                    <CardEvent/>
                    <CardEvent/>
                    
                </div>

            </section>
        </main>

        </>
    )
}

export default PromotorVista;