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
      <section className="w-full pb-6 bg-patina-200 flex flex-col lg:max-w-screen-xl  mx-auto  text-center lg:rounded-xl">
        <h2 className="font-medium text-3xl text-patina-900 pt-5">Marcas participantes</h2>
        <div className=" relative slider-container flex justify-center w-11/12 h-5/6 mx-auto  ">
          <Slider {...settings} className="  w-11/12 h-full flex justify-center items-center mx-auto  ">
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