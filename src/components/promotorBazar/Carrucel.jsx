import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardMarcas from "@/components/promotorBazar/CardMarcas";

function Carrucel(){
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3
      };

    return(
        <>
        <section className="w-full h-65vh bg-customBlue flex flex-col items-center ">
                <h2 className="font-medium text-4xl text-white">Marcas en curso</h2>
                <div className=" relative slider-container flex justify-center w-11/12 h-5/6">
                    <Slider {...settings} className="  w-11/12 h-full flex justify-center items-center  ">
                        <CardMarcas/>
                        <CardMarcas/>
                        <CardMarcas/>
        
                    </Slider>
            </div>

            </section>
        </>
    )
}

export default Carrucel;