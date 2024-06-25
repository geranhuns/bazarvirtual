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
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                  infinite: true,
                  dots: true
                }
              },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
            {
              breakpoint: 640,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                infinite: true,
                dots: false
              }
            },
          
             
          ]
      };

    return(
        <>
        <section className="w-full h-65vh bg-customBlue flex flex-col items-center max-sm:text-center ">
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