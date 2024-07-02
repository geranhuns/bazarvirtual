"use client"
import React from "react";
import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CardMarcas from "@/components/promotorBazar/CardMarcas";
import ProductoDestacadoMarca from "../SmallViews/ProductoDestacadoMarca";
import Button from "../Button/Button";

function Carrucel() {

  const [verMarcas, setVerMarcas] = useState(true)
  const [buttonMsg, setButtonMsg] = useState("Ver todas")

  const buttonClickHandler = () => {
    setVerMarcas(!verMarcas)
    setButtonMsg(prevButtonMsg => prevButtonMsg === "Ver todas" ? "Ver menos" : "Ver todas");

  }

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
          slidesToScroll: 2,
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
        <h2 className="font-medium text-3xl text-white py-2 md:pt-5">Marcas presentes</h2>

        {verMarcas && (

          <div className=" relative slider-container flex justify-start w-10/12 h-5/6   ">
            <Slider {...settings} className="  w-full h-full flex justify-between items-center   ">
              <ProductoDestacadoMarca />
              <ProductoDestacadoMarca />
              <ProductoDestacadoMarca />
              <ProductoDestacadoMarca />

            </Slider>
          </div>
        )}
        {!verMarcas && (



          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-y-2 items-center justify-center md:w-11/12">
            <ProductoDestacadoMarca />
            <ProductoDestacadoMarca />
            <ProductoDestacadoMarca />
            <ProductoDestacadoMarca />
            <ProductoDestacadoMarca />
            <ProductoDestacadoMarca />

          </div>

        )}

        <button onClick={() => { buttonClickHandler() }} className="flex items-center justify-center p-1 rounded-lg text-lg  font-medium h-9 bg-raw-sienna-900 text-raw-sienna-50 mt-5">{buttonMsg}</button>


      </section>
    </>

  )
}

export default Carrucel;