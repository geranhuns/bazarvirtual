import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardMarcas from "@/components/promotorBazar/CardMarcas";

function Carrucel() {
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

  return (
    <>
      <section className="w-full pb-6 bg-patina-500 flex flex-col items-center justify-center text-center ">
        <h2 className="font-medium text-3xl text-white pt-5">Marcas en curso</h2>
        <div className=" relative slider-container flex justify-start w-10/12 h-5/6   ">
          <Slider {...settings} className="  w-full h-full flex justify-center items-center  ">
            <CardMarcas />
            <CardMarcas />
            <CardMarcas />

          </Slider>
        </div>

      </section>
    </>
  )
}

export default Carrucel;